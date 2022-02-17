const router = require("express").Router();


module.exports = (db) => {

  router.post("/:id", (req, res) => {
    const id = req.body.id;
    const name = req.body.budget;
  db.query(`INSERT INTO categories(id, name) VALUES (id,name) returning id;
  `)
  .then((data) => {
    db.query(`INSERT INTO user_categories WHERE user_id = $1 and category_id = $2`,[req.params.id,data.rows[0].id])
    .then((data) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
    });
  })
  .catch((error) => {
    console.log(error);
  });
});

  router.get("/:id", (req, res) => {
    db.query(`SELECT categories.id, categories.name as name  FROM categories
    join user_categories ON user_categories.category.id = categories.id
    WHERE user_id =$1 ;`, [req.params.id])
      .then((data) => {
        res.json(data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  });
 

  return router;
};