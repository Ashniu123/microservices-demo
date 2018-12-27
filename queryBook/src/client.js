var thrift = require("thrift");
const assert = require("assert");

var BookService = require("./gen-nodejs/BookService"),
  ttypes = require("./gen-nodejs/books_types");

const thriftOptions = {
  protocol: thrift.TCompactProtocol,
  transport: thrift.TFramedTransport
};

const connection = thrift.createConnection("localhost", 3002, thriftOptions);

connection.on("error", err => {
  console.log(err);
});

// Create a Calculator client with the connection
const client = thrift.createClient(BookService, connection);
client.ping((err, response) => {
  if (err) {
    console.log(err);
  } else {
    console.log(response);
  }
});

const BookFilter = new ttypes.BookFilter({
  bookIds: ["5c249fce085eea411226a2e8","5c249fce085eea411226a2f0"],
  lteCost: 400,
  // gteCost: 300,
  description: "IN"
  //   lteUpdatedAt: Date.now().toString()
});

const getBookRequest = new ttypes.GetBookRequest({
  filter: BookFilter,
  current: false,
  // stateAt: "1545904138000"
  stateAt: "1545904137000"
  // stateAt: "1545904137900"
  // stateAt: Date.now().toString()
});
client.getBook(getBookRequest, (err, response) => {
  if (err) {
    console.log(err);
  } else {
    console.log(response);
  }
});
