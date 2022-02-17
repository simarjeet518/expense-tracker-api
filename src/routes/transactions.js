const router = require("express").Router();

module.exports = (db) => {

  router.post("/:id", (req, res) => {
    // const id= req.body.id;
    console.log(req.body);
    const user_id = req.params.id;
    const category_name = req.body.category;
    const  amount = req.body.amount;
  // db.query(`SELECT id from categories where name Like $1`,[category_name])
  // .then((data)=>{
  //   console.log("data here",data);
    db.query(`INSERT INTO transactions(user_id,category_id,amount) VALUES($1,$2,$3);
    `,[ user_id,4, amount])
    .then((data) => {
      console.log(data.rows[0]);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
    });

  // })
  // .catch((error) => {
  //   console.log(error);
  // });
 
});

  router.get("/:id", (req, res) => {
    // let date  = new Date();
    // let currentMonthStartDate  = (new Date(date.getFullYear(), date.getMonth(), 1));
    // let currentMonthLastDate  = (new Date(date.getFullYear(), date.getMonth()+1, 0));
    db.query(`SELECT transactions.id, categories.name as category , amount ,date  FROM transactions 
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
