namespace js Book

# === Data Objects ===
typedef i32 int
typedef string BookId
typedef string UserId
typedef string Timestamp
typedef i32 Version

struct Book {
  1: optional BookId id,
  2: optional string name,
  3: optional string description,
  4: optional string author,
  5: optional int cost,
  31: optional Timestamp createdAt,
  32: optional Timestamp updatedAt,
  33: optional Version __v,
}

struct BookFilter {
  1: optional BookId bookId,
  2: optional string name, # Will be a regex
  3: optional string description, # Will be a regex
  4: optional string author, # Will be a regex
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
}

enum ErrorCode {
  SOMETHING_WRONG = 1 # Generic
  UNAUTHORISED = 2,
  NOT_FOUND = 3,
  INVALID_DATA = 4,
}

# === Requests ===
struct CreateBookRequest {
  1: optional string name,
  3: optional string author,
  4: optional string description,
  5: optional int cost
}


struct ListBookRequest {
  1: optional BookFilter filter,
  2: optional int skip = 0,
  3: optional int limit = 20,
  4: optional SortBy sortBy = SortBy.CREATED_AT,
  5: optional SortOrder sort = SortOrder.DESC,
}

struct UpdateBookRequest {
  1: optional BookId bookId,
  2: optional string name,
  3: optional string description,
  6: optional int cost,
  7: optional string author,
}


struct DeleteBookRequest {
  1: optional BookId bookId,
}

# === Responses ===
struct ResponseStatus {
  1: required bool success,
  2: optional string message,
  3: required SuccessCode code,
}

struct CreateBookResponse {
  1: required ResponseStatus responseStatus,
  2: optional Book book,
}

struct GetBookResponse {
  1: required ResponseStatus responseStatus,
  2: required Book book,
}

struct ListBookResponse {
  1: required ResponseStatus responseStatus,
  2: required list<Book> books,
  3: required int total,
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
  GetBookResponse getBook(1: required BookFilter request) throws (1: StoreException ex1, 2: BookException ex2),
  ListBookResponse listBook(1: required ListBookRequest request) throws (1: StoreException ex1, 2: BookException ex2),
  ResponseStatus updateBook(1: required UpdateBookRequest request) throws (1: StoreException ex1, 2: BookException ex2),
  ResponseStatus deleteBook(1: required BookId BookId) throws (1: StoreException ex1, 2: BookException ex2),
}
