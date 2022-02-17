// const bcrypt = require("bcryptjs");

const getUserByemail = (email, users) => {
  let result = "";
  for (let userid in users) {
    if (email === users[userid]["email"]) {
      result = userid;
    }
  }
  return result;
};

const validateData = (email, password) => {
  let err = "";
  if (getUserByemail(email, users) !== "") {
    err = "Error : Email already exists in data ";
    return err;
  }
  return err;
};
//function to check login crendientials
const validateLoginData = (userid, loginpassword) => {
  let err = "";
  if (
    userid !== "" &&
    bcrypt.compareSync(loginpassword, users[userid]["password"])
  ) {
    return err;
  } else {
    err = "Error :email id and password does not match";
    return err;
  }
};

module.exports = { getUserByemail, validateData, validateLoginData };
