const { promisify } = require("util");
const redisClient = require("./redisConnect");
const getAsync = promisify(redisClient.get).bind(redisClient);

const getDBSize = async key =>
  new Promise(async (resolve, reject) => {
    redisClient.dbsize((err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

const setBacklog = async (id, version, data) => {
  try {
    redisClient.sadd(["backlogIDs", id.toString()], (err, data) => {
      if (err) console.log(err);
    });
    redisClient.setex(`${id}-${version}`, 7200, data, (err, data) => {
      if (err) console.log(err);
    });
  } catch (err) {
    console.log(err);
  }
};

const getEvent = async key =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await getAsync(key);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });

const getKeys = async pattern =>
  new Promise(async (resolve, reject) => {
    redisClient.keys(pattern, (err, keys) => {
      if (err) {
        reject(err);
      }
      keys.sort(function(a, b) {
        return parseInt(a.slice(25)) - parseInt(b.slice(25));
      });
      resolve(keys);
    });
  });

const getIDs = async =>
  new Promise(async (resolve, reject) => {
    redisClient.smembers("backlogIDs", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });

const removeID = id =>
  new Promise(async (resolve, reject) => {
    redisClient.srem("backlogIDs", id, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });

const removeKeys = keys =>
  new Promise(async (resolve, reject) => {
    console.log("keys");
    console.log(keys);
    redisClient.del(keys, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });

module.exports = {
  getDBSize,
  setBacklog,
  getEvent,
  getKeys,
  getIDs,
  removeID,
  removeKeys
};
