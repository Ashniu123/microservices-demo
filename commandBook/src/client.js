var thrift = require("thrift");
const assert = require("assert");

var BookService = require("./gen-nodejs/BookService"),
  ttypes = require("./gen-nodejs/books_types");

const thriftOptions = {
  protocol: thrift.TCompactProtocol,
  transport: thrift.TFramedTransport
};

const connection = thrift.createConnection("localhost", 3001, thriftOptions);

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

const CreateBookRequest = new ttypes.CreateBookRequest({
  name: "The Godfather",
  author: "Mario Puzo",
  cost: 240,
  description: `Tyrant, blackmailer, racketeer, murder, his influence reaches every level of American society. Meet Don Corleone, a friendly man, a just man, a reasonable man. The deadliest lord of the Cosa Nostra. The Godfather.

    A modern masterpiece, The Godfather is the epic story of organised crime in the 1940s. It is also the intimate story of the Corleone family, at once drawn together and ripped apart by its unique position at the core of the American Mafia. Still shocking more than a quarter-century after it was first published, this compelling tale of blackmail, murder and family values is a true classic.`
});

// for (let i = 0; i < 10; i++) {
//   client.createBook(CreateBookRequest, (err, response) => {
//     if (err) {
//       console.log(err);
//     } else {
//       if (response.book.createdAt) {
//         response.book.createdAt = parseInt(response.book.createdAt);
//       }
//       if (response.book.updatedAt) {
//         response.book.updatedAt = parseInt(response.book.updatedAt);
//       }

//       console.log(response);
//     }
//   });
// }
const UpdateBookRequest = new ttypes.UpdateBookRequest({
  bookId: "5c249fce085eea411226a2f0",
  cost: 234
});
const UpdateBookRequest1 = new ttypes.UpdateBookRequest({
  bookId: "5c249fce085eea411226a2e8",
  cost: 350
});
for (let i = 0; i < 10; i++) {
  client.updateBook(
    i % 3 == 0 ? UpdateBookRequest : UpdateBookRequest1,
    (err, response) => {
      if (err) {
        console.log(err);
      } else {
        console.log(response);
      }
    }
  );
}
// const BookFilter = new ttypes.BookFilter({
//     // bookd: 1,
//     lteCost: 400,
//     gteCost: 300,
//   description: "IN"
//   //   lteUpdatedAt: Date.now().toString()
// });

// client.getBook(BookFilter, (err, response) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(response);
//   }
// });

// const listBookRequest = new ttypes.ListBookRequest({
//   filter: BookFilter,
//   skip: 0,
//   limit: 5,
//   sortBy: ttypes.SortBy.CREATED_AT,
//   sort: ttypes.SortOrder.ASC
// });
// client.listBook(listBookRequest, (err, response) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(response);
//   }
// });

// client.deleteBook("5c20da349ee63e2f279bbd97", (err, response) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(response);
//   }
// });
// client.deleteBook("5c20da349ee63e2f279bbd9f", (err, response) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(response);
//   }
// });
// client.deleteBook("5c20da349ee63e2f279bbd93", (err, response) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(response);
//   }
// });
