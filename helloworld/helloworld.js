const http = require("http");

const PORT = process.env.PORT || 8080;

const server = http.createServer((request, response) => {
  console.log("*****************************************");
  console.log("*****************************************");
  console.log(request.url);
  console.log(request.method);
  //GET POST PUT DELETE
  //GET => READ OPERATION OF A DATABASE
  //POST => CREATE "" ""
  //PUT => UPDATE
  //DELETE => DELETE

  //How to respond to requests
  //ROUTING
  if (request.url == "/") {
    //execute the statement
    response.writeHead(200, { "Content-Type": "Text/Plain" });
    response.end("Home Page");
  } else if (request.url == "/about") {
    //execute the statement
    response.writeHead(200, { "Content-Type": "Text/Plain" });
    response.end("About Page");
  } else if (request.url == "/gallery") {
    //execute the statement
    response.writeHead(200, { "Content-Type": "Text/HTML" });
    response.end(
      "<html><head><title>Page Title</title></head><body><h1>My first HTML response</h1></body></html>"
    );
  } else if (request.url == "/contact") {
    //execute the statement
    response.writeHead(200, { "Content-Type": "Text/Plain" });
    response.end("Contact Page");
  } else {
    response.writeHead(400, { "Content-Type": "Text/Plain" });
    response.end("Page not found error 400");
  }

  //Basic Conditions
  /**
   * Equals: if a == b (Equals sign twice because = by itself is an assignment operator)
   * Not equal: if a != b
   * Greater than: if a > b
   * Less than: if a < b
   * Greater than or equal: if a >= b
   * Less than or equal: if a <= b
   */
  console.log(request);
  console.log("Responding to request");
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello World");
  console.log("*****************************************");
  console.log("*****************************************");
});

server.listen(PORT, () =>
  console.log(
    `server started on http://localhost:${PORT}; ` +
      "press Ctrl-C to terminate....."
  )
);

var name = "Joey";
var age = 21;
let lastName = "DeGori";
const year = 2024;

//JS object notation AKA JSON
var printer = {
  color: "black",
  size: "small",
  price: 29.99,
};
