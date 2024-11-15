let eList = require("../data/emails.json");

const fs = require("fs");
exports.newsletterSignup = (req, res) => {
  res.render("newsletter-signup", { csrf: "supersecretcode" });
};

exports.newsletterSignupProcess = (req, res) => {
  console.log(req.body);
  //To store
  let newUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    email: req.body.email,
  };
  console.log("Cleaned user");
  console.log(newUser);
  eList.users.push(newUser);
  let json = JSON.stringify(eList);
  fs.writeFileSync("./data/emails.json", json, "utf8", () => {
    console.log("finished writing files");
  });
  console.log("Current eList");
  console.log(eList);
  res.redirect(303, "/newsletter/thankyou");
};

exports.newsletterSignupList = (req, res) => {
  console.log(eList);
  res.render("userspage", { users: eList.users });
};

exports.newsletterUser = (req, res) => {
  let userDetails = eList.users.filter((user) => {
    return user.email == req.params.email;
  });
  res.render("userdetails", { users: userDetails });
};

exports.newsletterUserDelete = (req, res) => {
  let newUsers = { users: [] };
  newUsers.users = eList.users.filter((user) => {
    return user.email != req.params.email;
  });

  let json = JSON.stringify(newUsers);
  fs.writeFileSync("./data/emails.json", json, "utf8", () => {
    console.log("finished writing files");
  });

  res.send('<a href="/newsletter/list">Go Back</a>');
};
