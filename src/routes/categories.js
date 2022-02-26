const router = require("express").Router();


module.exports = (db) => {

  router.post("/allowances/:id", (req, res) => {
    // const id= req.body.id;
    console.log(req.body);
    const user_id = req.params.id;
    const category_name = req.body.category;
    const  budget = req.body.budget;
  db.query(`SELECT id from categories where name Like $1`,[category_name])
  .then((data)=>{
    console.log("data here",data);
    db.query(`update user_categories set budget = $1  where category_id = $2 and user_id = $3 returning *;
    `,[ budget,data.rows[0].id, user_id])
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