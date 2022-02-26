const router = require("express").Router();

module.exports = (db) => {

  router.post("/:id", (req, res) => {
    // const id= req.body.id;
    console.log(req.body);
    const user_id = req.params.id;
    const category_name = req.body.category;
    const  budget = req.body.budget;
  db.query(`SELECT id from categories where name Like $1`,[category_name])
  .then((data)=>{
    console.log("data here",data);
    db.query(`INSERT INTO user_categories(user_id,category_id,budget) VALUES($1,$2,$3);
    `,[ user_id,data.rows[0].id, budget])
    .then((data) => {
      console.log(data.rows[0]);
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
    console.log("inside here");
    db.query(`SELECT user_categories.id, categories.name as category , budget ,date  FROM user_categories 
    join categories on categories.id = category_id WHERE user_id =$1 order by date; `, [req.params.id])
      .then((data) => {
        res.json(data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  });
 
  return router;
};
