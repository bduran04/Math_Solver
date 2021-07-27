require('dotenv').config();
const express = require("express");
const routes = require("./routes");
const session = require('express-session');


const MongoStore = require('connect-mongo');

const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

  app.use(session({
    secret: 'Queen Bee',
    maxAge: new Date(Date.now() + 3600000),
    store: MongoStore.create(
      { mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/Math_Solver" }
    )
  }));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use("/api", routes);

app.get("/login", function(req, res) {
  res.send({"success": 200})
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/Math_Solver',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);


app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});


