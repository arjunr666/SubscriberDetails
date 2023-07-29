require("dotenv").config();
const subscriberRouter = require("./routes/subscribers");

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dbURI = `mongodb://0.0.0.0:27017/`;
const PORT = 3000;

mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(PORT, function () {
      console.log(`listening on http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// mongoose.connect(process.env.DATABASE_URL, {
//   useNewUrlParser: true,
// });

// const db = mongoose.connection;

// db.on("error", (error) => console.error(error));
// db.once("open", () => console.log("Connected to Database"));

app.use(express.json()); // as middleware and send body to our server

app.use("/subscribers", subscriberRouter); // 'localhost:3000/subscribers/fghfhf'

// app.listen(3000, () => console.log("Server started"));
