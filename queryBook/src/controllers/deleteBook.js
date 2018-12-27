const mongoose = require("mongoose");
const BookSchema = require("../models/books");
const ttypes = require("../gen-nodejs/books_types");
const { dbAutoBackUp } = require("../config/backup");
const { consistencyCheck, updateDoc } = require("./updateBook");

module.exports = async data =>
  new Promise(async (resolve, reject) => {
    try {
      const consistencyState = await consistencyCheck(data);
      console.log(
        `------------${JSON.stringify(consistencyState)}------------------`
      );
      if (consistencyState.status == 1) {
        const doc = await runDeleteEvent(data);
        console.log(`Deleted Book: ${doc._id}`);
        resolve();
      } else {
        reject();
      }
    } catch (e) {
      const err = new ttypes.StoreException({
        code: ttypes.ErrorCode.INVALID_DATA,
        message: e.message
      });
      reject(err);
    }
  });

const runDeleteEvent = async data =>
  new Promise(async resolve => {
    const payload = JSON.parse(data.payload);
    const query = { _id: mongoose.Types.ObjectId(data.aggregateId) };
    const updatedDoc = await updateDoc(query, { isDeleted: true });
    if (!updatedDoc) {
      /**
       * Check if dirty else retry once.
       * */
    } else resolve(updatedDoc);
  });
