namespace js Book

# === Data Objects ===
typedef i32 int
typedef string BookId
typedef string UserId
typedef i32 Timestamp
typedef i32 Version

struct Book {
  1: optional BookId id,
  2: optional string name,
  3: optional UserId description,
  4: optional string author,
  5: optional int cost,
  6: optional list<PromoCode> promoCodes
  31: optional Timestamp createdAt,
  32: optional Timestamp updatedAt,
  33: optional Version __v,
}

struct PromoCode {
  1: optional string code,
  2: optional UserId userId,
  3: optional int discount,
  4: optional Timestamp expiryDate,
  7: optional bool consumed
}

# TODO: pagination strategy for comments
struct BookFilter {
  1: optional BookId bookId,
  2: optional string name, # Will be a regex
  3: optional string description,
  4: optional string author,
  5: optional int lteCost,
  6: optional int gteCost,
  31: optional Timestamp lteCreatedAt,
  32: optional Timestamp gteCreatedAt,
  33: optional Timestamp lteUpdatedAt,
  34: optional Timestamp gteUpdatedAt,
}

enum SortOrder {
  ASC = 1,
  DESC = -1, # Default
}

enum SortBy {
  CREATED_AT = 1, # Default
  NAME = 2,
  COST = 3
  AUTHOR = 4
  UPDATED_AT = 5,
  ANY = 6,
}

enum SuccessCode {
  SUCCESS = 1, # For Get or List
  BOOK_CREATED = 2,
  BOOK_UPDATED = 3,
  BOOK_DELETED = 4,
  COMMENT_CREATED = 5,
  COMMENT_UPDATED = 6,
  COMMENT_DELETED = 7,
}

enum ErrorCode {
  SOMETHING_WRONG = 1 # Generic
  UNAUTHORISED = 2,
  NOT_FOUND = 3,
  INVALID_DATA = 4,
}

# === Requests ===
struct CreateBook {
  1: optional string name,
  3: optional UserId description,
  4: optional string author,
  5: optional int cost
}

struct GetBookRequest {
  1: required BookFilter filter,
}

struct ListBookRequest {
  1: optional BookFilter filter,
  2: optional int skip = 0,
  3: optional int limit = 20,
  4: optional SortBy sortBy = SortBy.CREATED_AT,
  5: optional SortOrder sort = SortOrder.DESC,
}

struct UpdateBookRequest {
  1: optional BookId BookId,
  2: optional string name,
  3: optional string description,
  6: optional string author,
  7: optional list<UserId> assignees,
}

struct CreatePromoCode {
  1: required BookId BookId,
  2: required UserId userId,
  3: optional int discount,
  4: optional Timestamp expiryDate
}

struct CommentRequest {
  1: optional BookId BookId,
  2: optional CommentId commentId,
  3: optional UserId commentBy,
  4: optional string message,
}

# === Responses ===
struct ResponseStatus {
  1: required bool success,
  2: optional string message,
  3: required SuccessCode code,
}

struct CreateBookResponse {
  1: required ResponseStatus responseStatus,
  2: optional Book book
}

struct GetBookResponse {
  1: required ResponseStatus responseStatus,
  2: required Book Book,
}

struct ListBookResponse {
  1: required ResponseStatus responseStatus,
  2: required list<Book> Books,
  3: required int total
}

# === Exceptions ===
# Any exception regarding storage as in a Database or Redis
exception StoreException {
  1: required ErrorCode code,
  2: optional string message,
}

# Any exception where the data received is incorrect
exception BookException {
  1: required ErrorCode code,
  2: optional string message,
}

service BookService {
  string ping(), # Just to check if server is up or not. Should return "ping"
  CreateBookResponse createBook(1: required CreateBookRequest request) throws (1: StoreException ex1, 2: BookException ex2),
  GetBookResponse getBook(1: required GetBookRequest request) throws (1: StoreException ex1, 2: BookException ex2),
  ListBookResponse listBook(1: required ListBookRequest request) throws (1: StoreException ex1, 2: BookException ex2),
  ResponseStatus updateBook(1: required UpdateBookRequest request) throws (1: StoreException ex1, 2: BookException ex2),
  ResponseStatus deleteBook(1: required BookId BookId) throws (1: StoreException ex1, 2: BookException ex2),
  CreateCommentResponse createComment(1: required CommentRequest request) throws (1: StoreException ex1, 2: BookException ex2),
  ResponseStatus updateComment(1: required CommentRequest request) throws (1: StoreException ex1, 2: BookException ex2),
  ResponseStatus deleteComment(1: required CommentRequest request) throws (1: StoreException ex1, 2: BookException ex2),
}
