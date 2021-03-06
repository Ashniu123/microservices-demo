const app = require('./src/app');

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log(`SEARCH server running on :${process.env.PORT}`);
  }
})