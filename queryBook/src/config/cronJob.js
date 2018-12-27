var CronJob = require("cron").CronJob;
var Cron = require("./backup.js");
// new CronJob(
// "* * * * * *",
//   function() {
Cron.startDB("mongodump-1545290046810", 27027);
//   },
//   null,
//   true,
//   "America/New_York"
// );
