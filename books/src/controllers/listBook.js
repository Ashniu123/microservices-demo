const mongoose = require("mongoose");
const BookSchema = require("../models/books");
const ttypes = require("../gen-nodejs/books_types");

module.exports = async (request, result) => {
  let s = "";
  if (request.sortBy != 6) {
    switch (request.sortBy) {
      case 1:
        s = "createdAt";
        break;
      case 2:
        s = "name";
        break;
      case 3:
        s = "cost";
        break;
      case 4:
        s = "author";
        break;
      case 5:
        s = "updatedAt";
        break;
      default:
        s = "";
    }
  }
  const sortBy =
    request.sortBy != 6 ? { [s || "createdAt"]: request.sort } : {};
  try {
    const res = await BookSchema.aggregate([
      {
        $facet: {
          data: [
            { $match: filter(request.filter) },
            {
              $sort: sortBy
            },
            {
              $project: {
                document: "$$ROOT"
              }
            },
            {
              $limit: request.limit + request.skip
            },
            {
              $skip: request.skip
            }
          ],
          total: [{ $match: filter(request) }, { $count: "Records" }]
        }
      }
    ]).exec();
    const responseStatus = new ttypes.ResponseStatus({
      success: true,
      message: "List Book Successful",
      code: ttypes.SuccessCode.SUCCESS
    });
    if (res[0].data.length > 0) {
      const books = res[0].data.map(element => {
        return new ttypes.Book({
          id: element._id.toString(),
          name: element.document.name,
          description: element.document.description,
          author: element.document.author,
          cost: element.document.cost,
          createdAt: "" + new Date(element.document.createdAt).getTime(),
          updatedAt: "" + new Date(element.document.updatedAt).getTime(),
          __v: element.document.__v
        });
      });
      const getBookResponse = new ttypes.ListBookResponse({
        responseStatus: responseStatus,
        books: books,
        total: res[0].total[0].Records
      });
      result(null, getBookResponse);
      console.log(`ListBook: ${JSON.stringify(responseStatus)}`);
    } else {
      const err = new ttypes.StoreException({
        code: ttypes.ErrorCode.NOT_FOUND,
        message: "No such books"
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
