const mongoose = require("mongoose");
const BookSchema = require("../models/books");
const ttypes = require("../gen-nodejs/books_types");

module.exports = async (request, result) => {
  try {
    const res = await BookSchema.findOne(filter(request));
    if (res) {
      const responseStatus = new ttypes.ResponseStatus({
        success: true,
        message: "Get Book Successful",
        code: ttypes.SuccessCode.SUCCESS
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
      const getBookResponse = new ttypes.GetBookResponse({
        responseStatus: responseStatus,
        book: book
      });
      result(null, getBookResponse);
      console.log(`GetBook: ${JSON.stringify(responseStatus)}`);
    } else {
      const err = new ttypes.StoreException({
        code: ttypes.ErrorCode.NOT_FOUND,
        message: "No such book"
      });
      result(err, null);
    }
  } catch (e) {
    const err = new ttypes.BookException({
      code: ttypes.ErrorCode.INVALID_DATA,
      message: e.message
    });
    result(err, null);
  }
};

const filter = request => {
  const query = {};
  if (request) {
    if (request.bookId) {
      query._id = mongoose.Types.ObjectId(request.bookId);
    }
    if (request.name) {
      query.name = { $regex: request.name, $options: "i" };
    }
    if (request.description) {
      query.description = { $regex: request.description, $options: "i" };
    }
    if (request.author) {
      query.author = { $regex: request.author, $options: "i" };
    }
    if (request.lteCost) {
      query.cost = {
        $lte: request.lteCost
      };
    }
    if (request.gteCost) {
      query.cost = {
        ...query.cost,
        $gte: request.gteCost
      };
    }
    if (request.lteCreatedAt) {
      query.createdAt = {
        $lte: new Date(parseInt(request.lteCreatedAt))
      };
    }
    if (request.gteCreatedAt) {
      query.createdAt = {
        ...query.createdAt,
        $gte: new Date(parseInt(request.gteCreatedAt))
      };
    }
    if (request.lteUpdatedAt) {
      query.updatedAt = {
        $lte: new Date(parseInt(request.lteUpdatedAt))
      };
    }
    if (request.gteUpdatedAt) {
      query.updatedAt = {
        ...query.updatedAt,
        $gte: new Date(parseInt(request.gteUpdatedAt))
      };
    }
  }
  return query;
};
