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
  1: optional list<BookId> bookIds,
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

struct GetBookRequest {
  1: optional BookFilter filter,
  2: optional Timestamp stateAt,
  3: optional bool current
  4: optional int skip = 0,
  5: optional int limit = 20,
  6: optional SortBy sortBy = SortBy.CREATED_AT,
  7: optional SortOrder sort = SortOrder.DESC,
}

# === Responses ===
struct ResponseStatus {
  1: required bool success,
  2: optional string message,
  3: required SuccessCode code,
}

struct GetBookResponse {
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
  GetBookResponse getBook(1: required GetBookRequest request) throws (1: StoreException ex1, 2: BookException ex2),
}
