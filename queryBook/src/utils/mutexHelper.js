var waitUntil = require("wait-until");
const BookSchema = require("../models/books");
let mutex = false;
let mutex1 = {};
const waitForUnlock = () =>
  new Promise(resolve => {
    waitUntil(
      10,
      Infinity,
      () => {
        if (mutex) {
          return false;
        } else {
          if (mutex1[id]) {
            return false;
          }
          return true;
        }
      },
      function done() {
        resolve();
      }
    );
  });
const lock = id =>
  new Promise(async resolve => {
    waitUntil(
      10,
      Infinity,
      () => {
        if (mutex) {
          return false;
        } else {
          if (mutex1[id]) {
            return false;
          }
          mutex1[id] = true;
          return true;
        }
      },
      function done() {
        resolve();
      }
    );
  });

const globalLock = () =>
  new Promise(resolve => {
    waitUntil(
      10,
      Infinity,
      () => {
        if (mutex) {
          return false;
        } else {
          mutex = true;
          return true;
        }
      },
      function done() {
        resolve();
      }
    );
  });

const unlock = id => {
  mutex1[id] = false;
};

const globalUnlock = () => {
  mutex = false;
};
module.exports = {
  lock,
  globalLock,
  unlock,
  globalUnlock,
  waitForUnlock
};
