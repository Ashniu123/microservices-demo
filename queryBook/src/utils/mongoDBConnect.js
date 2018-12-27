const mongoose = require("mongoose");
const dbURI = process.env.MONGO_URI || "mongodb://localhost:27017/aics";
const reconnectInterval = 1000;
const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_SAFE_INTEGER,
  reconnectInterval,
  keepAlive: true
};

const connect = () => {
  mongoose.connect(
    dbURI,
    options
  );
};

const db = mongoose.connection;

db.on("error", err => {
  console.log("Connection error: %O", err);
  console.log(
    "error",
    `${new Date().toISOString()} mongodb> ${JSON.stringify(err)}`
  );
  mongoose.disconnect();
});

db.on("connecting", () => {
  console.log(
    "info",
    `${new Date().toISOString()} mongodb> Connecting to Database!`
  );
  console.log("Connecting to Database!");
});

db.on("reconnected", () => {
  console.log(
    "info",
    `${new Date().toISOString()} mongodb> Reconnected to Database!`
  );
  console.log("Reconnected to Database!");
});

db.on("connected", () => {
  console.log(
    "info",
    `${new Date().toISOString()} mongodb> Connected to Database!`
  );
  console.log("Connected to Database!");
});

db.on("open", () => {
  console.log(
    "info",
    `${new Date().toISOString()} mongodb> Connection to Database opened!`
  );
  console.log("Connection to Database opened!");
});

db.on("disconnected", () => {
  console.log(
    "info",
    `${new Date().toISOString()} mongodb> Disconnected from Database!`
  );
  console.log("Disconnected from Database!");
  setTimeout(connect, reconnectInterval);
});

process.on("SIGINT", () => {
  db.close(() => {
    console.log("Force to close the MongoDB connection");
    process.exit(0);
  });
});

connect();
module.exports = db;
