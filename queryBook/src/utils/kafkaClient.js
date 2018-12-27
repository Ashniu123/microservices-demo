const kafka = require("kafka-node");
const client = new kafka.Client("127.0.0.1:2181", "books-client");
const topics = [
  {
    topic: "books",
    partition: 0,
    offset: 0
  }
];
const options = {
  autoCommit: true,
  //   fromOffset: true,
  fetchMaxWaitMs: 1000,
  fetchMaxBytes: 1024 * 1024,
  encoding: "buffer"
};

const consumer = new kafka.HighLevelConsumer(client, topics, options);
module.exports = { consumer, client };
