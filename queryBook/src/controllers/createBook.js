const BookSchema = require("../models/books");
module.exports = async data => new Promise(async(resolve)=>{
  try {
    const res = await BookSchema.create(JSON.parse(data.payload));
    console.log(`Created Book: ${res._id}`);
    resolve();
  } catch (err) {
    console.log(err);
  }
});
