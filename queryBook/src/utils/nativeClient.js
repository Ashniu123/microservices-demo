var MongoClient = require("mongodb").MongoClient;

var _db;

module.exports = {
  connectToServer: function(callback) {
    MongoClient.connect(
      "mongodb://localhost:27017",
      (err, db) => {
        console.log("Attemting to connect!");
        _db = db.db("books-read");
        return callback(err);
      }
    );
  },

  getDb: () => {
    return _db;
  }
};
