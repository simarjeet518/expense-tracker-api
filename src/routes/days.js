const router = require("express").Router();

module.exports = (db) => {
  router.get("/days", (req, res) => {
    db.query(`select * from days`)
      .then((data) => {
        console.log("here");
        res.json(data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return router;
};
