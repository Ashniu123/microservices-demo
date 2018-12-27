const kafka = require("kafka-node");
const { client } = require("./kafkaClient");
const { globalLock, globalUnlock } = require("./mutexHelper");
const mongoUtil = require("./nativeClient");

const checkpoint = async () => {
  await globalLock();
  console.log("---------------Trying to checkpoint-------------------------");
  var offset = new kafka.Offset(client);
  offset.fetchCommits(
    "kafka-node-group",
    [{ topic: "books", partition: 0 }],
    async (err, o) => {
      console.log(o);
      if (err) console.log(err);
      else if (parseInt(o.books["0"]) > 0) {
        const now = Date.now();
        const db = mongoUtil.getDb();
        await db.command(
          {
            cloneCollectionAsCapped: "bookschemas",
            toCollection: `checkpoint_${now}_0_${JSON.stringify(o.books["0"])}`,
            size: 100000
          },
          (err, result) => {
            if (err) console.log(err);
            else {
              console.log(result);
            }
            globalUnlock();
          }
        );
      } else {
        globalUnlock();
      }
    }
  );
};
module.exports = {
  checkpoint
};
