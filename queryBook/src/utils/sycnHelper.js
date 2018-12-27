const { updateBook } = require("../controllers/updateBook");
const deleteBook = require("../controllers/deleteBook");
const {
  getEvent,
  getKeys,
  getIDs,
  removeID,
  removeKeys,
  getDBSize
} = require("./redisHelper");
const { globalLock, globalUnlock } = require("./mutexHelper");
const syncBacklog = async () => {
  try {
    await globalLock();
    console.log("Backlog Size:" + (await getDBSize()));
    const ids = await getIDs();
    console.log(ids);
    jobs = [];
    for (let i = 0; i < ids.length; i++) {
      jobs.push(runIDBacklog(ids[i]));
    }
    await Promise.all(jobs);
    globalUnlock();
  } catch (error) {
    console.log(error);
  }
};

const runIDBacklog = async id =>
  new Promise(async (resolve, reject) => {
    try {
      let delKeys = [];
      const keys = await getKeys(`${id}-*`);
      for (let i = 0; i < keys.length; i++) {
        try {
          await runEvent(keys[i]);
          delKeys.push(keys[i]);
        } catch (err) {
          console.log(`Unable to execute event ${keys[i]} yet!`);
        }
      }
      console.log(`Ran all events for ${id}`);
      if (delKeys.length) {
        await removeKeys(delKeys);
        delKeys = [];
        const remainingKeys = await getKeys(`${id}-*`);
        if (remainingKeys.length === 0) await removeID(id);
      }
      resolve();
    } catch (error) {
      reject();
    }
  });
const runEvent = async key =>
  new Promise(async (resolve, reject) => {
    try {
      const eventData = JSON.parse(await getEvent(key));
      // const parsedData = eventData);
      console.log(`syncHelper: Running Event ${eventData._id}`);
      if (eventData.eventType === "UPDATED_BOOK") {
        await updateBook(eventData);
        resolve();
      }
      if (eventData.eventType === "DELETED_BOOK") {
        await deleteBook(eventData);
        resolve();
      }
    } catch (error) {
      reject();
    }
  });
module.exports = { syncBacklog };
