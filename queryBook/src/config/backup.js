var fs = require("fs");
var _ = require("lodash");
var exec = require("child_process").exec;
var spawn = require("child_process").spawn;
var dbOptions = {
  // user: '<databaseUsername>',
  // pass: '<databasePassword>',
  host: "localhost",
  port: 27017,
  database: "books-read",
  autoBackup: true,
  removeOldBackup: true,
  keepLastDaysBackup: 2,
  autoBackupPath: "/home/akshat/Desktop/backup/" // i.e. /var/database-backup/
};
/* return date object */
const stringToDate = function(dateString) {
  return new Date(dateString);
};
/* return if variable is empty or not. */
const empty = function(mixedVar) {
  var undef, key, i, len;
  var emptyValues = [undef, null, false, 0, "", "0"];
  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixedVar === emptyValues[i]) {
      return true;
    }
  }
  if (typeof mixedVar === "object") {
    for (key in mixedVar) {
      return false;
    }
    return true;
  }
  return false;
};

exports.startDB = (path, port) => {
  const cmd =
    "mongod" +
    " --port " +
    port +
    " --dbpath " +
    dbOptions.autoBackupPath +
    path;
  const child = spawn(cmd, { shell: true, detached: true, stdio: "ignore" });
  
};

exports.getBackupTimes = all => {
  const path = dbOptions.autoBackupPath;
  fs.readdir(path, (err, items) => {
    if (err) {
      console.log(err);
    }
    list = items
      .map(elem => parseInt(elem.slice(10, elem.length)))
      .sort((a, b) => {
        return a - b;
      });
    console.log(list);
    return all ? list : list[0];
  });
};
exports.getBackups = () => {
  const path = dbOptions.autoBackupPath;
  fs.readdir(path, (err, items) => {
    if (err) {
      console.log(err);
    }
    console.log(items);
    for (var i = 0; i < items.length; i++) {
      console.log(items[i]);
    }
  });
};
// Auto backup script
exports.dbAutoBackUp = function() {
  console.log("1");
  // check for auto backup is enabled or disabled
  if (dbOptions.autoBackup == true) {
    console.log("2");
    var currentDate = Date.now().toString();
    var beforeDate, oldBackupDir, oldBackupPath;
    var newBackupDir = currentDate;
    var newBackupPath = dbOptions.autoBackupPath + "mongodump-" + newBackupDir; // New backup path for current backup process
    // check for remove old backup after keeping # of days given in configuration
    console.log(newBackupPath);
    if (dbOptions.removeOldBackup == true) {
      beforeDate = _.clone(currentDate);
      oldBackupDir = new Date(parseInt(beforeDate)).setDate(
        new Date(parseInt(beforeDate)).getDate() - dbOptions.keepLastDaysBackup
      );
      oldBackupPath = dbOptions.autoBackupPath + "mongodump-" + oldBackupDir; // old backup(after keeping # of days)
    }
    var cmd =
      "mongodump --host " +
      dbOptions.host +
      " --port " +
      dbOptions.port +
      " --db " +
      dbOptions.database +
      //   " --username " +
      //   dbOptions.user +
      //   " --password " +
      //   dbOptions.pass +
      " --out " +
      newBackupPath; // Command for mongodb dump process
    exec(cmd, function(error, stdout, stderr) {
      console.log("4");
      if (empty(error)) {
        // check for remove old backup after keeping # of days given in configuration
        // if (dbOptions.removeOldBackup == true) {
        //   if (fs.existsSync(oldBackupPath)) {
        //     exec("rm -rf " + oldBackupPath, function(err) {});
        //   }
        // }
      } else {
        console.log(error);
      }
    });
  }
};
