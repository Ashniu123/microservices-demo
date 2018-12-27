namespace js Todo

# === Data Objects ===
typedef i32 int
typedef string TodoId
typedef string UserId
typedef string Timestamp
typedef i32 Version

struct Todo {
  1: optional TodoId id,
  2: optional string name,
  3: optional UserId userId,
  4: optional TodoType type,
  5: optional bool completed,
  6: optional Timestamp deadline,
  31: optional Timestamp createdAt,
  32: optional Timestamp updatedAt,
  33: optional Version __v,
}

struct TodoFilter {
  1: optional TodoId bookId,
  2: optional string name, # Will be a regex
  3: optional UserId userId,
  3: optional list<TodoType> types,
  4: optional Timestamp lteDeadline,
  5: optional Timestamp gteDeadline,
  6: optional bool completed,
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
  DEADLINE = 3
  USER_ID = 4
  UPDATED_AT = 5,
  ANY = 6,
}

enum SuccessCode {
  SUCCESS = 1, # For Get or List
  TODO_CREATED = 2,
  TODO_UPDATED = 3,
  TODO_DELETED = 4,
}

enum ErrorCode {
  SOMETHING_WRONG = 1 # Generic
  UNAUTHORISED = 2,
  NOT_FOUND = 3,
  INVALID_DATA = 4,
}

# === Requests ===
struct CreateTodoRequest {
  1: optional string name,
  3: optional UserId userId,
  4: optional string author,
  5: optional int cost
}


struct ListTodoRequest {
  1: optional TodoFilter filter,
  2: optional int skip = 0,
  3: optional int limit = 20,
  4: optional SortBy sortBy = SortBy.CREATED_AT,
  5: optional SortOrder sort = SortOrder.DESC,
}

struct UpdateTodoRequest {
  1: optional TodoId TodoId,
  2: optional string name,
  3: optional string description,
  6: optional int cost,
  7: optional string author,
}


struct DeleteTodoRequest {
  1: optional TodoId TodoId,
}

# === Responses ===
struct ResponseStatus {
  1: required bool success,
  2: optional string message,
  3: required SuccessCode code,
}

struct CreateTodoResponse {
  1: required ResponseStatus responseStatus,
  2: optional Todo Todo,
}

struct GetTodoResponse {
  1: required ResponseStatus responseStatus,
  2: required Todo Todo,
}

struct ListTodoResponse {
  1: required ResponseStatus responseStatus,
  2: required list<Todo> Todos,
  3: required int total,
}

# === Exceptions ===
# Any exception regarding storage as in a Database or Redis
exception StoreException {
  1: required ErrorCode code,
  2: optional string message,
}

# Any exception where the data received is incorrect
exception TodoException {
  1: required ErrorCode code,
  2: optional string message,
}

service TodoService {
  string ping(), # Just to check if server is up or not. Should return "ping"
  CreateTodoResponse createTodo(1: required CreateTodoRequest request) throws (1: StoreException ex1, 2: TodoException ex2),
  GetTodoResponse getTodo(1: required TodoFilter request) throws (1: StoreException ex1, 2: TodoException ex2),
  ListTodoResponse listTodo(1: required ListTodoRequest request) throws (1: StoreException ex1, 2: TodoException ex2),
  ResponseStatus updateTodo(1: required UpdateTodoRequest request) throws (1: StoreException ex1, 2: TodoException ex2),
  ResponseStatus deleteTodo(1: required TodoId TodoId) throws (1: StoreException ex1, 2: TodoException ex2),
}
