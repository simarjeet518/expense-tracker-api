const router = require("express").Router();

module.exports = (db) => {

  router.post("/:id", (req, res) => {
    const id= req.body.id;
    const user_id = req.params.id;
    const category_name = req.body.name;
    const  amount = req.body.amount;
  db.query(`SELECT id from categories where name=$1`,[category_name])
  .then((data)=>{
    db.query(`INSERT INTO transactions(id,user_id,category_id,amount) VALUES ($1,$2,$3,$4) returning *;
    `,[id, user_id, data.rows[0].id, amount])
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
    // let date  = new Date();
    // let currentMonthStartDate  = (new Date(date.getFullYear(), date.getMonth(), 1));
    // let currentMonthLastDate  = (new Date(date.getFullYear(), date.getMonth()+1, 0));
    db.query(`SELECT transactions.id, categories.name as name , amount ,date  FROM transactions 
    join categories on categories.id = category_id WHERE user_id =$1 `, [req.params.id])
      .then((data) => {
        res.json(data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  });
 
  return router;
};
