const router = require("express").Router();

module.exports = (db) => {
  
router.delete("/:id",(req,res) => {
  console.log("here",req.body);
  db.query(`delete from transactions where user_id= $1 and id=$2`,[req.params.id,req.body.id])
  .then(()=>{
    console.log("ok");
  })
  .catch((err) => console.log(err));
})

  router.post("/:id", (req, res) => {
    const id= req.body.id;
    console.log(req.body);
    const user_id = req.params.id;
    const category_name = req.body.category;
    const  amount = req.body.amount;
    const date = req.body.date;
  db.query(`SELECT id from categories where name Like $1`,[category_name])
  .then((data)=>{
    console.log("data here",data);
    db.query(`INSERT INTO transactions(id,user_id,category_id,amount,date) VALUES($1,$2,$3,$4,$5);
    `,[id, user_id,data.rows[0].id, amount,date])
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
    db.query(`SELECT transactions.id, categories.name as category , amount ,date  FROM transactions 
    join categories on categories.id = category_id WHERE user_id =$1 order by date ; `, [req.params.id])
      .then((data) => {
        res.json(data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  });
 
  return router;
};
