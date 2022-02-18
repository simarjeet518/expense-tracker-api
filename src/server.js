const fs = require("fs");
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors"); // cors require
const ENV = require("./environment");
let bodyParser = require("body-parser");

const PORT = 7600;
const app = express();
const db = require("./db");

app.use(cors()); // CORS middleware useage
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const users = require("./routes/users");
const login = require("./routes/login");
const transactions = require("./routes/transactions");
const budget = require("./routes/budget");
const categories = require("./routes/categories");
const allowances = require("./routes/allowances")

// app.use("api/allowances", allowances(db));
app.use("/api", login(db));
app.use("/api/users", users(db));
app.use("/api/transactions", transactions(db));
app.use("/api/budget", budget(db));
app.use("/api/categories", categories(db));


function read(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      file,
      {
        encoding: "utf-8",
      },
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}

// app.get(`*`, function(req, res){
//   console.log("invalid");
//   res.sendStatus(300);
//   })
// route to reset data
app.get("/api/debug/reset", (req, res) => {
  Promise.all([
    read(path.resolve(__dirname, `db/schema/create.sql`)),
    read(path.resolve(__dirname, `db/schema/seeds.sql`)),
  ])
    .then(([create, seeds]) => {
      db.query(create)
        .then(() => db.query(seeds))
        .then(() => {
          console.log("Database Reset");
          res.status(200).send("Database Reset");
        })
        .catch((error) => {
          console.log(`Error in resetting data : ${error}`);
        });
    })
    .catch((error) => {
      console.log(`Error setting up the reset route: ${error}`);
    });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
