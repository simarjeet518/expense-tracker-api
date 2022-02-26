const router = require("express").Router();


module.exports = (db) => {

  router.post("/:id", (req, res) => {
    const budget = req.body.amount;
    const user_id = req.params.id;
    console.log(budget);
    db.query(`SELECT * from  users_monthly_allowance where user_id = $1;`,[user_id])
    .then((res)=>{
      console.log("here",res.rows.length);
      if(res.rows.length > 0){
        db.query(`update  users_monthly_allowance set budget = $1 where user_id = $2;`,[budget,user_id])
        .then((res) => console.log("updated"))
        .catch((err)=>{ console.log(err)})
      }
      else {
        db.query(`INSERT INTO users_monthly_allowance(user_id, budget) VALUES ($1, $2);
          `,[user_id, budget])
        .then((res) => console.log("inserted"))
        .catch((err)=>{ console.log(err)})
      }
    })
    .catch((err)=>{ console.log(err)})
  });

  router.get("/:id", (req, res) => {
    const user_id = req.params.id;
    let date  = new Date();
    db.query('SELECT id, budget as amount,date  FROM users_monthly_allowance WHERE user_id=$1;', [user_id])
      .then((data) => {
        res.json(data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  });
 

  return router;
};