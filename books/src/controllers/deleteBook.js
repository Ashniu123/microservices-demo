const mongoose = require("mongoose");
const BookSchema = require("../models/books");
const ttypes = require("../gen-nodejs/books_types");

module.exports = async (request, result) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(request)) {
      const err = new ttypes.StoreException({
        code: ttypes.ErrorCode.INVALID_DATA,
        message: "bookId should be valid mongo id"
      });
      console.log(err);
      result(err, null);
      return;
    }
    const res = await BookSchema.findByIdAndDelete(request);
    if (res) {
      const responseStatus = new ttypes.ResponseStatus({
        success: true,
        message: "Successfully Deleted",
        code: ttypes.SuccessCode.BOOK_DELETED
      });
      result(null, responseStatus);
      console.log(`DeleteBook: ${JSON.stringify(responseStatus)}`);
    } else {
      const err = new ttypes.StoreException({
        code: ttypes.ErrorCode.NOT_FOUND,
        message: "No such book"
      });
      result(err, null);
    }
  } catch (error) {
    const err = new ttypes.StoreException({
      code: ttypes.ErrorCode.INVALID_DATA,
      message: error.message
    });
    result(err, null);
  }
};
