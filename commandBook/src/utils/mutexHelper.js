var waitUntil = require("wait-until");
var mutex = {};
const lock = id =>
  new Promise(resolve => {
    waitUntil(
      10,
      Infinity,
      () => {
        if (mutex[id]) {
          return false;
        }
        mutex[id] = true;
        return true;
      },
      function done() {
        resolve();
      }
    );
  });

const unlock = id => {
  mutex[id] = false;
};
module.exports = {
  lock,
  unlock
};
