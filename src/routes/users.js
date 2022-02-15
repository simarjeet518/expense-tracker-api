const router = require("express").Router();

const queryString = `SELECT users.*,
array_agg(distinct categories.name) as categories
FROM users
JOIN user_categories ON user_categories.user_id = users.id
JOIN categories ON user_categories.category_id = categories.id
WHERE users.id = $1
GROUP BY users.id`;

module.exports = (db) => {
  console.log("gere");
  router.get("/:id/transactions/?", (req, res) => {
  db.query(`select  transactions.id,trasactions.amount, transactions.date, transactions.time, categories.name as name from transactions
  JOIN categories ON transactions.category_id = categories.id
  where transactions.user_id = $1 and transactions.date BETWEEN $2 AND $3;
  `,[req.params.id , req.query.start_date, req.query.end_date])
  .then((data) => {
    res.json(data.rows);
  })
  .catch((error) => {
    console.log(error);
  });
});

  // router.get("/:id", (req, res) => {
  //   db.query(queryString, [req.params.id])
  //     .then((data) => {
  //       res.json(data.rows);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // });
 

  return router;
};
