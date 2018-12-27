const path = require("path");
const mongoose = require("mongoose");
const thrift = require("thrift");
const BookService = require("./gen-nodejs/BookService");
const viewHandler = require("./controllers/viewHandler");
require("dotenv").config({ path: path.resolve(__dirname, "config", ".env") });
const kafka = require("kafka-node");
const apiController = require("./controllers/api");
const { syncBacklog } = require("./utils/sycnHelper");
const { waitForUnlock } = require("./utils/mutexHelper");
const { getDBSize } = require("./utils/redisHelper");
const cron = require("cron");
/**
 * MongoDB Connection
 */
mongoose.connect(
  process.env.MONGO_URI,
  err => {
    if (err) {
      console.error(err);
    } else {
      console.log("Connected to database!");
    }
  }
);
/**
 * Kafka Consumer
 */
const client = new kafka.Client("127.0.0.1:2181", "books-client");
const topics = [
  {
    topic: "books",
    offset: 0
  }
];
const options = {
  autoCommit: false,
  fromOffset: true,
  fetchMaxWaitMs: 1000,
  fetchMaxBytes: 1024 * 1024,
  encoding: "buffer"
};

const consumer = new kafka.HighLevelConsumer(client, topics, options);
ct = 0;
consumer.on("message", async message => {
  try {
    await waitForUnlock();
    var event = new Buffer(message.value).toString();
    await viewHandler(JSON.parse(event));
    ct += 1;
    if (ct % 10 == 1) {
      const size = await getDBSize();
      console.log(
        `---------------------------${size}-------------------------------------`
      );
      if (parseInt(size) > 10) syncBacklog();
    }
  } catch (error) {
    console.log(error);
  }
});

consumer.on("error", function(err) {
  console.log("error", err);
});
// consumer.on('SIGINT', function() {
//   highLevelConsumer.close(true, function(){
//       consumer.exit();
//   })
// });

/**
 * Thrift Connection
 */
const thriftOptions = {
  protocol: thrift.TCompactProtocol,
  transport: thrift.TFramedTransport
};

// var CronJob = require("cron").CronJob;
// new CronJob("* * * * *", syncBacklog, null, true, "");
const app = thrift.createServer(BookService, apiController, thriftOptions);
module.exports = app;
