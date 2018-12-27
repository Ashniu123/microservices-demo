const path = require("path");
const thrift = require("thrift");
var CronJob = require("cron").CronJob;
require("dotenv").config({ path: path.resolve(__dirname, "config", ".env") });
const viewHandler = require("./controllers/viewHandler");
const apiController = require("./controllers/api");
const BookService = require("./gen-nodejs/BookService");
const { syncBacklog } = require("./utils/sycnHelper");
const { lock, unlock } = require("./utils/mutexHelper");
const { checkpoint } = require("./utils/viewBackup");
const { consumer } = require("./utils/kafkaClient");
var mongoUtil = require("./utils/nativeClient");

mongoUtil.connectToServer(err => {
  if (err) console.log(err);
});

/**
 * MongoDB Connection
 */
require("./utils/mongoDBConnect");
/**
 * Kafka Consumer
 */
consumer.on("message", async message => {
  var event = new Buffer(message.value).toString();
  await lock(event.aggregateId);
  console.log("-----------");
  await viewHandler(JSON.parse(event));
  await unlock(event.aggregateId);
});

consumer.on("error", function(err) {
  console.log("error", err);
});
consumer.on("SIGINT", function() {
  highLevelConsumer.close(true, function() {
    consumer.exit();
  });
});

/**
 * Thrift Connection
 */
const thriftOptions = {
  protocol: thrift.TCompactProtocol,
  transport: thrift.TFramedTransport
};

new CronJob("* * * * *", syncBacklog, null, true, "");
new CronJob("*/5000 * * * * *", checkpoint, null, true, "");
const app = thrift.createServer(BookService, apiController, thriftOptions);
module.exports = app;
