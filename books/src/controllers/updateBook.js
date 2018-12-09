const mongoose = require("mongoose");
const BookSchema = require("../models/books");
const ttypes = require("../gen-nodejs/books_types");

module.exports = async (request, result) => {
  if (!("bookId" in request)) {
    const err = new ttypes.BookException({
      code: ttypes.ErrorCode.INVALID_DATA,
      message: "bookId required!"
    });
    result(err, null);
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(request.bookId)) {
    console.log(1);
    const err = new ttypes.StoreException({
      code: ttypes.ErrorCode.INVALID_DATA,
      message: "bookId should be valid mongo id"
    });
    console.log(err);
    result(err, null);
    return;
  }
  const query = { _id: mongoose.Types.ObjectId(request.bookId) };
  const update = {};
  if (request.name) update.name = request.name;
  if (request.author) update.author = request.author;
  if (request.description) update.description = request.description;
  if (request.cost) update.cost = request.cost;
  if (Object.keys(update).length) {
    try {
      const updatedDoc = await BookSchema.findOneAndUpdate(
        query,
        { $set: update, $inc: { __v: 1 } },
        {
          new: true,
          useFindAndModify: false
        }
      );
      if (!updatedDoc) {
        const err = new ttypes.BookException({
          code: ttypes.ErrorCode.NOT_FOUND,
          message: "No book with bookId"
        });
        result(err, null);
      } else {
        const responseStatus = new ttypes.ResponseStatus({
          success: true,
          message: "Successfully updated",
          code: ttypes.SuccessCode.BOOK_UPDATED
        });
        result(null, responseStatus);
        console.log(`UpdateBook: ${JSON.stringify(responseStatus)}`);
      }
    } catch (e) {
      const err = new ttypes.StoreException({
        code: ttypes.ErrorCode.INVALID_DATA,
        message: e.message
      });
      result(err, null);
    }
  } else {
    const err = new ttypes.StoreException({
      code: ttypes.ErrorCode.INVALID_DATA,
      message: "No fields to update"
    });
    result(err, null);
  }
};
