const router = require("express").Router();


module.exports = (db) => {

  router.post("/:id", (req, res) => {
    const id = req.body.id;
    const user_id = req.body.user_id;
    const budget = req.body.budget;
  db.query(`INSERT INTO users_monthly_allowance(id,user_id, budget) VALUES ($1, $2, $3);
  `,[id, user_id, budget])
  .then((data) => {
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log(error);
  });
});

  router.get("/:id", (req, res) => {
    let date  = new Date();
    let currentMonthStartDate  = (new Date(date.getFullYear(), date.getMonth(), 1));
    let currentMonthLastDate  = (new Date(date.getFullYear(), date.getMonth()+1, 0));
    db.query('SELECT id, budget,date  FROM users_monthly_allowance WHERE user_id =$1 ', [req.params.id])
      .then((data) => {
        res.json(data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  });
 

  return router;
};