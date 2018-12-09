const BookSchema = require("../models/books");
const ttypes = require("../gen-nodejs/books_types");

module.exports = async (request, result) => {
  try {
    const res = await BookSchema.create(request);
    const responseStatus = new ttypes.ResponseStatus({
      success: true,
      message: "Successfully Created",
      code: ttypes.SuccessCode.BOOK_CREATED
    });
    const book = new ttypes.Book({
      id: res._id.toString(),
      name: res.name,
      description: res.description,
      author: res.author,
      cost: res.cost,
      createdAt: "" + new Date(res.createdAt).getTime(),
      updatedAt: "" + new Date(res.updatedAt).getTime(),
      __v: res.__v
    });
    const createBookResponse = new ttypes.CreateBookResponse({
      responseStatus: responseStatus,
      book: book
    });
    result(null, createBookResponse);
    console.log(`CreateBook: ${JSON.stringify(responseStatus)}`);
  } catch (error) {
    console.log(error);
    const err = new ttypes.StoreException({
      code: ttypes.ErrorCode.INVALID_DATA,
      message: error.message
    });
    result(err, null);
  }
};
