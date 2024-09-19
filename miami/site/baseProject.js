const express = require("express");

const app = express();

const expressHandlebars = require("express-handlebars");

app.engine(
  "handlebars",
  expressHandlebars.engine({
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars");

const PORT = process.env.port || 3000;

//Process routes
app.get("/", (request, response) => {
  response.render("home");
});
app.get("/about", (request, response) => {
  response.render("about");
});
app.get("/nightlife", (request, response) => {
  response.type("text/plain");
  response.send("Miami At night");
});
app.get("/beaches", (request, response) => {
  response.type("text/plain");
  response.send("Miami beach and more!");
});
//Error
app.get("/history", (req, res) => {
  response.type("text/plain");
  response.send("History of Miami");
});

//Handle errors
//Not found
app.use((request, response) => {
  response.status(404);
  response.render("404");
});

//Server error
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500);
  response.render("500");
});

app.listen(PORT, () => {
  console.log(`Express is running on http:localhost:${PORT} `);
  console.log("Press ctrl-c to terminate");
});
