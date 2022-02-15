const router = require("express").Router();

module.exports = (db) => {
  router.post("/register", (req, res) => {
    console.log(req);
    const first_name = req.body.firstName;
    const last_name = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    db.query(`SELECT * FROM users where email = $1`, [email])
      .then((data) => {
        const user = data.rows[0];
        console.log(user);
        //if already same email user exists
        if (user) {
          res.sendStatus(400);
        } else {
          //  register a user into the database
          db.query(
            `INSERT INTO users(first_name,last_name,email,password) VALUES ($1, $2, $3, $4) RETURNING first_name ,last_name, email , id;`,
            [first_name, last_name, email, password]
          )
            .then((data) => {
              const user = data.rows[0];
              res.json(user);
            })
            .catch((error) => {
              res.sendStatus(400);
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
   console.log("here");
    db.query(`SELECT * FROM users WHERE email = $1`, [email]).then((data) => {
      const user = data.rows[0];
      console.log(user);
      if (user) {
        //dont want to send back password
        const returndata = {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        };
        user.password === password ? res.json(returndata) : res.sendStatus(404);
      } else {
        res.sendStatus(404);
      }
    });
  });

  return router;
};
