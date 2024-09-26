const express = require("express");

const app = express();

app.use(express.static("public"));

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
  response.render("landing", {
    title: "This is Miami!!",
    abstract: "Miami is a great place to live.",
    image: "miamisky.jpg",
  });
});
app.get("/about", (request, response) => {
  response.render("page", {
    title: "About Miami",
    abstract: "From the Miami Marlins to Miami heat, there's a lot to see",
  });
});
app.get("/nightlife", (request, response) => {
  response.render("page", {
    title: "Miami at Night",
    abstract: "Stay away from South Beach",
  });
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
