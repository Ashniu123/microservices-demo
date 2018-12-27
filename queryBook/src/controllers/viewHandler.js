const { createBook, updateBook, deleteBook } = require("./api");
const _ = require("lodash");
const commandHelper = _.invert(require("./commandHelper"));
module.exports = async event =>
  new Promise(async resolve => {
    try {
      if (commandHelper[event.eventType] === "CREATED_BOOK") {
        await createBook(event);
      } else if (commandHelper[event.eventType] === "UPDATED_BOOK") {
        await updateBook(event);
      } else if (commandHelper[event.eventType] === "DELETED_BOOK") {
        await deleteBook(event);
      }
      resolve();
    } catch (error) {
      console.log(`Unable to execute event ${event._id}`);
      resolve();
    }
  });
