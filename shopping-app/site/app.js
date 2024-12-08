const express = require("express");
const expressHandlebars = require("express-handlebars");

const app = express();

app.use(express.static("public"));

const homepageData = require("./data/homepage.json");

app.engine(
  "handlebars",
  expressHandlebars.engine({
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars");

const PORT = process.env.port || 3000;

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
app.get("/projects/:projectName", (request, response) => {
  const projectName = request.params.projectName;
  const project = projectsData.projects.find(
    (proj) => proj.name.toLowerCase() === projectName.toLowerCase()
  );

  if (project) {
    response.render("project", {
      title: project.name,
      project: project,
    });
  } else {
    response.status(404).render("404", { title: "Project Not Found" });
  }
});
app.get("/category/:category", (request, response) => {
  const categorySlug = request.params.category;
  const categoryData = homepageData.featuredCategories.find(
    (category) => `/category/${categorySlug}` === category.link
  );

  if (categoryData) {
    response.render("category", {
      title: categoryData.name,
      category: categoryData,
    });
  } else {
    response.status(404).render("404");
  }
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
