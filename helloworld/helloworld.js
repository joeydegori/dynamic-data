const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
  console.log(request);
  console.log("Responding to request");
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello World");
});

server.listen(PORT, () =>
  console.log(`server started on ${PORT}; ` + "press Ctrl-C to terminate.....")
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
