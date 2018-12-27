const mongoose = require("mongoose");
const BookSchema = require("../models/books");
const ttypes = require("../gen-nodejs/books_types");
const EventSchema = require("../models/event");
const commandHelper = require("./commandHelper");
const mongoUtil = require("../utils/nativeClient");

/**
 *
 * @param {*} request The thrift request passed to the controller
 * @param {*} result The thrift callback passed
 */
module.exports = async (request, result) => {
  try {
    if (!validate(request, result)) {
      return;
    }
    query = filter(request.filter);
    if (!request.current) {
      prepareAggregate(request, query.eventQuery, result);
    } else {
      queryDB(request, query.bookQuery, result);
    }
  } catch (e) {
    console.log(e);
  }
};

const timeSort = (x, y) => {
  if (x.difference < y.difference) {
    return -1;
  }
  if (x.difference > y.difference) {
    return 1;
  }
  return 0;
};

const prepareAggregate = async (request, query, result) => {
  try {
    const timestampTill = new Date(parseInt(request.stateAt));
    const db = mongoUtil.getDb();
    const data = await db.collections();
    const checkpoints = data
      .filter(coll => {
        if (coll.s.name !== "bookschemas") {
          const split = coll.s.name.split("_");
          if (parseInt(request.stateAt) - parseInt(split[1]) > 0) {
            return true;
          }
        }
      })
      .map(coll => {
        const split = coll.s.name.split("_");
        return {
          name: coll.s.name,
          timestamp: split[1],
          kafkaData: `{"${split[2]}":${parseInt(split[3]) - 1}}`,
          difference: parseInt(request.stateAt) - parseInt(split[1])
        };
      });
    if (!checkpoints) {
      const err = new ttypes.BookException({
        code: ttypes.ErrorCode.INVALID_DATA,
        message: "No such state exists"
      });
      result(err, null);
      return;
    }
    checkpoints.sort(timeSort);
    console.log(checkpoints);
    runCheckpoints(checkpoints, query, timestampTill, result);
  } catch (err) {
    console.log;
  }
};

const runCheckpoints = async (checkpoints, query, timestampTill, result) => {
  const db = mongoUtil.getDb();
  console.log(query);
  const data = await db
    .collection(`${checkpoints[0].name}`)
    .find({ _id: query.aggregateId })
    .toArray();
  let aggregate = {};
  data.forEach(element => {
    aggregate[element._id] = element;
  });
  console.log(aggregate, checkpoints[0].kafkaData);
  const initTimestamp = await EventSchema.findOne(
    {
      kafkaData: checkpoints[0].kafkaData
    },
    { createdAt: 1 }
  );
  console.log({
    $gte: new Date(initTimestamp.createdAt),
    $lte: timestampTill
  });
  const events = await EventSchema.find({
    ...query,
    createdAt: {
      $gte: new Date(initTimestamp.createdAt),
      $lte: timestampTill
    }
  });
  runEvents(aggregate, events, result);
};

const validate = (request, result) => {
  for (let i = 0; i < request.filter.bookIds.length; i++) {
    if (!mongoose.Types.ObjectId.isValid(request.filter.bookIds[i])) {
      const err = new ttypes.BookException({
        code: ttypes.ErrorCode.INVALID_DATA,
        message: "Not a mongoID"
      });
      result(err, null);
      return false;
    }
  }
  return true;
};

/**
 *
 * @param {*} events The events to be run
 * @param {*} result The thrift callback passed
 */
const runEvents = (aggregate, events, result) => {
  try {
    events.map(async e => {
      if (e.eventType === commandHelper.CREATED_BOOK) {
        aggregate[e.aggregateId] = JSON.parse(e.payload);
      } else if (
        e.eventType === commandHelper.UPDATED_BOOK &&
        aggregate[e.aggregateId]
      ) {
        aggregate[e.aggregateId] = await updateAggregate(
          aggregate[e.aggregateId],
          JSON.parse(e.payload),
          e.version
        );
      }
    });
    const responseStatus = new ttypes.ResponseStatus({
      success: true,
      message: "Get Book Successful",
      code: ttypes.SuccessCode.SUCCESS
    });
    const books = [];
    for (let key in aggregate) {
      books.push(
        new ttypes.Book({
          id: aggregate[key]._id.toString(),
          name: aggregate[key].name,
          description: aggregate[key].description,
          author: aggregate[key].author,
          cost: aggregate[key].cost,
          createdAt: "" + new Date(aggregate[key].createdAt).getTime(),
          updatedAt: "" + new Date(aggregate[key].updatedAt).getTime(),
          __v: aggregate[key].__v
        })
      );
    }
    const getBookResponse = new ttypes.GetBookResponse({
      responseStatus: responseStatus,
      books,
      total: Object.keys(aggregate).length
    });
    result(null, getBookResponse);
  } catch (e) {
    const err = new ttypes.BookException({
      code: ttypes.ErrorCode.INVALID_DATA,
      message: e.message
    });
    result(err, null);
  }
};

const updateAggregate = (aggregate, event, version) =>
  new Promise(resolve => {
    console.log(event);
    for (var key in event) {
      if (key === "updatedAt") {
        aggregate[key] = new Date(parseInt(event[key])).toISOString();
      } else if (key !== "bookId" && event[key]) {
        aggregate[key] = event[key];
      }
    }
    aggregate.__v = version;
    resolve(aggregate);
  });

const queryDB = async (request, query, result) => {
  try {
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
    console.log(query, sortBy);
    const res = await BookSchema.aggregate([
      {
        $facet: {
          data: [
            { $match: query },
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
          total: [{ $match: query }, { $count: "Records" }]
        }
      }
    ]).exec();
    const responseStatus = new ttypes.ResponseStatus({
      success: true,
      message: "Get Book Successful",
      code: ttypes.SuccessCode.SUCCESS
    });
    console.log(res);
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
      const getBookResponse = new ttypes.GetBookResponse({
        responseStatus: responseStatus,
        books: books,
        total: res[0].total[0].Records
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
  const eventQuery = {};
  const bookQuery = {};
  if (request) {
    if (request.bookIds) {
      eventQuery.aggregateId = {
        $in: request.bookIds.map(id => mongoose.Types.ObjectId(id))
      };
      bookQuery._id = {
        $in: request.bookIds.map(id => mongoose.Types.ObjectId(id))
      };
    }
    if (request.name) {
      bookQuery.name = { $regex: request.name, $options: "i" };
    }
    if (request.description) {
      bookQuery.description = { $regex: request.description, $options: "i" };
    }
    if (request.author) {
      bookQuery.author = { $regex: request.author, $options: "i" };
    }
    if (request.lteCost) {
      bookQuery.cost = {
        $lte: request.lteCost
      };
    }
    if (request.gteCost) {
      bookQuery.cost = {
        ...bookQuery.cost,
        $gte: request.gteCost
      };
    }
    if (request.lteCreatedAt) {
      bookQuery.createdAt = {
        $lte: new Date(parseInt(request.lteCreatedAt))
      };
    }
    if (request.gteCreatedAt) {
      bookQuery.createdAt = {
        ...bookQuery.createdAt,
        $gte: new Date(parseInt(request.gteCreatedAt))
      };
    }
    if (request.lteUpdatedAt) {
      bookQuery.updatedAt = {
        $lte: new Date(parseInt(request.lteUpdatedAt))
      };
    }
    if (request.gteUpdatedAt) {
      bookQuery.updatedAt = {
        ...bookQuery.updatedAt,
        $gte: new Date(parseInt(request.gteUpdatedAt))
      };
    }
  }
  return { eventQuery, bookQuery };
};
