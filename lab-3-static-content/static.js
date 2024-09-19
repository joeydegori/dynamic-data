const http = require("http");

//File System
const fs = require("fs");

const PORT = process.env.PORT || 8080;

//Syntax to create a function
const functionName = (parameter1, parameter2, parameter3) => {
  //Write the code to be executed by the function
  console.log("functionName was called");
  console.log(parameter1);
  console.log(parameter2);
  console.log(parameter3);
};
//Create a function to read files and display them
const displayPage = (path, res, contentType, responseCode = 200) => {
  fs.readFile(__dirname + path, (errors, content) => {
    if (errors) {
      res.writeHead(500, { "Content-type": "text/plain" });
      return res.end("500 - Internal Error");
    }
    res.writeHead(responseCode, { "Content-Type": contentType });
    res.end(content);
  });
};

const server = http.createServer((request, response) => {
  console.log(request.url);
  console.log(request.method);

  //ROUTING
  let path = request.url;
  switch (path) {
    case "":
    case "/":
      displayPage("/public/home.html", response, "text/html");
      break;
    case "/about":
      displayPage("/public/about.html", response, "text/html");
      break;
    case "/contact":
      displayPage("/public/contact.html", response, "text/html");
      break;
    case "/logo":
      displayPage("/public/image.jpg", response, "image.jpg");
      break;
    case "/saturday":
      displayPage("/public/saturday.jpg", response, "image.jpg");
      break;
    default:
      displayPage("/public/404.html", response, "text/html", 400);
      break;
  }
  console.log(request);
  console.log("Responding to request");
});

server.listen(PORT, () =>
  console.log(
    `server started on http://localhost:${PORT}; ` +
      "press Ctrl-C to terminate....."
  )
);
