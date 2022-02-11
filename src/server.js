const fs = require("fs");
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors"); // cors require
const ENV = require("./environment");
const PORT = 3002;
const app = express();
const db = require("./db");

app.use(cors()); // CORS middleware useage
app.use(morgan("dev"));

const days = require("./routes/days");

app.use("/api", days(db));

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
