const router = require("express").Router();

const queryString = `SELECT users.*,
array_agg(distinct categories.name) as categories
FROM users
JOIN user_categories ON user_categories.user_id = users.id
JOIN categories ON user_categories.category_id = categories.id
WHERE users.id = $1
GROUP BY users.id`;

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    db.query(queryString, [req.params.id])
      .then((data) => {
        res.json(data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return router;
};
