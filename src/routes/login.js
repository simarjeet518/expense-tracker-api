const router = require("express").Router();

module.exports = (db) => {
  router.post("/register", (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;

    db.query(`SELECT * FROM users where email = $1`, [email])
      .then((data) => {
        const user = data.rows[0];
        console.log(user);
        //if already same email user exists send null to client
        if (user) {
          res.json(null);
        } else {
          //  register a user into the database
          db.query(
            `INSERT INTO users(first_name,last_name,email,password) VALUES ($1, $2, $3, $4) RETURNING *;`,
            [first_name, last_name, email, password]
          )
            .then((data) => {
              const user = data.rows[0];
              res.json(user);
            })
            .catch((error) => {
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

    db.query(`SELECT * FROM users WHERE email = $1`, [email]).then((data) => {
      const user = data.rows[0];
      user.password === password ? res.json(user) : res.json(null);
    });
  });

  return router;
};
