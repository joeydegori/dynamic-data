const express = require("express");
const expressHandlebars = require("express-handlebars");

const app = express();

app.use(express.static("public"));

const homepageData = require("./data/homepage.json");
const projectsData = require("./data/projects.json");
const detailsData = require("./data/details.json");
const fs = require("fs");
const path = require("path");
const session = require("express-session");

app.engine(
  "handlebars",
  expressHandlebars.engine({
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars");

const PORT = process.env.port || 3000;

app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, URL: ${req.url}`);
  next();
});
app.use(
  session({
    secret: "cart_secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Process routes
app.get("/", (req, res) => {
  res.render("home", {
    data: homepageData,
    title: "Photography Portfolio",
  });
});
app.get("/about", (request, response) => {
  response.render("about", {
    title: "About",
  });
});
app.get("/projects/:projectName", (req, res) => {
  const projectName = req.params.projectName;
  console.log("Requested Project Name:", projectName);

  const project = projectsData.projects.find(
    (proj) => proj.slug === projectName
  );

  console.log("Matched Project:", project);

  if (project) {
    res.render("project", {
      title: project.name,
      project: project,
    });
  } else {
    console.log("Project Not Found for:", projectName);
    res.status(404).render("404", { title: "Project Not Found" });
  }
});
app.get("/details/:itemId", (req, res) => {
  const itemId = req.params.itemId.toLowerCase();
  console.log(`Requested Item ID: ${itemId}`);

  const item = detailsData.items.find((itm) => itm.id.toLowerCase() === itemId);

  if (item) {
    console.log("Found Item:", item);
    res.render("details", {
      title: item.name,
      mainImage: item.mainImage,
      additionalImages: item.additionalImages,
      description: item.description,
      price: item.price,
      relatedItems: item.relatedItems,
    });
  } else {
    console.log("Item Not Found:", itemId);
    res.status(404).render("404", { title: "Item Not Found" });
  }
});
app.post("/cart/add", (req, res) => {
  console.log("Request Body:", req.body);
  const { title, price, image } = req.body;

  if (!title || !price || !image) {
    console.error("Incomplete data received:", req.body);
    return res.status(400).send("Incomplete data");
  }

  req.session.cart.push({ title, price, image });
  res.redirect("/cart");
});
app.get("/cart", (req, res) => {
  res.render("cart", {
    title: "Your Cart",
    cartItems: req.session.cart,
  });
});
app.post("/checkout", (req, res) => {
  const order = {
    customer: req.body,
    items: req.session.cart,
    date: new Date().toISOString(),
  };

  const ordersPath = path.join(__dirname, "data/orders.json");

  let orders = [];
  if (fs.existsSync(ordersPath)) {
    orders = JSON.parse(fs.readFileSync(ordersPath));
  }

  orders.push(order);
  fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));

  req.session.cart = [];
  res.redirect("/thank-you");
});
app.get("/thank-you", (req, res) => {
  res.render("thank-you", { title: "Thank You" });
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
