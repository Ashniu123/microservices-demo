const app = require('./src/app');

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log(`QueryBook server running on :${process.env.PORT}`);
  }
})