const mongoose = require("mongoose");
const BookSchema = require("../models/books");
const ttypes = require("../gen-nodejs/books_types");
const { dbAutoBackUp } = require("../config/backup");
const { setBacklog } = require("../utils/redisHelper");
// const { syncBacklog } = require("../utils/sycnHelper");
const updateBook = async data =>
  new Promise(async (resolve, reject) => {
    try {
      const consistencyState = await consistencyCheck(data);
      if (consistencyState.status == 1) {
        const doc = await runUpdateEvent(data);
        console.log(`Updated Book: ${doc._id}`);
        resolve();
      }
      reject();
    } catch (e) {
      const err = new ttypes.StoreException({
        code: ttypes.ErrorCode.INVALID_DATA,
        message: e.message
      });
      reject(err);
    }
  });

const updateDoc = (query, update) => {
  return BookSchema.findOneAndUpdate(
    query,
    { $set: update, $inc: { __v: 1 } },
    {
      new: true,
      useFindAndModify: false
    }
  );
};

const runUpdateEvent = async data =>
  new Promise(async (resolve) => {
    const payload = JSON.parse(data.payload);
    const query = { _id: mongoose.Types.ObjectId(data.aggregateId) };
    const update = {};
    if (payload.name) update.name = payload.name;
    if (payload.author) update.author = payload.author;
    if (payload.description) update.description = payload.description;
    if (payload.cost) update.cost = payload.cost;
    const updatedDoc = await updateDoc(query, update);
    if (!updatedDoc) {
      /**
       * Check if dirty else retry once.
       * */
    } else resolve(updatedDoc);
  });

const consistencyCheck = async data => {
  return new Promise(async resolve => {
    const payload = JSON.parse(data.payload);
    const bookData = await BookSchema.findOne(
      { _id: data.aggregateId },
      { id: 1, __v: 1 }
    );
    if (!bookData) {
      console.log(`Storing event ${data._id} in the backlog`);
      setBacklog(data.aggregateId, data.version, JSON.stringify(data));
      resolve({
        status: 3,
        message: "Object doesn't exist currently"
      });
    } else if (bookData.isDeleted) {
      resolve({
        status: 4,
        message: "Object has been deleted"
      });
    } else if (bookData.__v === data.version - 1) {
      resolve({
        status: 1,
        message: "Run the current event"
      });
    } else {
      if (bookData.__v > data.version - 1) {
        /**
         * Already ahead of that event. Replay or scrap the event
         */
      } else {
        /**
         * Store event in local structure
         */
        console.log(`Storing event ${data._id} in the backlog`);
        setBacklog(data.aggregateId, data.version, JSON.stringify(data));
        resolve({
          status: 2,
          message: "Pushed the event to the backlog"
        });
      }
    }
  });
};

module.exports = {
  updateBook,
  updateDoc,
  consistencyCheck
};
