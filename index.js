const { log } = require("console");
const http = require("http");

http
  .createServer((request, response) => {
    const { headers, method, url } = request;

    let body = [];
    request
      .on("error", (err) => {
        log(err);
      })
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        body = Buffer.concat(body).toString();
        // the request ends here...
      });

    // what about the response object?

    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.setHeader("X-Powered-By", "bacon");

    // OR explicity set the headers here...
    // If you want, you can explicitly write the headers to the response stream. To do this, there's a method called writeHead, which writes the status code and the headers to the stream.

    // response.writeHead(200, "Everything is Good", {
    //   "Content-Type": "application/json",
    //   "X-Powered-By": "bacon",
    // });

    response.write("<html>");
    response.write("<body>");
    response.write("<h1>Hello, World!</h1>");
    response.write("</body>");
    response.write("</html>");
    response.end();

    // // OR 
    // The end function on streams can also take in some optional data to send as the last bit of data on the stream, so we can simplify the example above as follows.
    // response.end('<html><body><h1>Hello, World!</h1></body></html>');

  })
  .listen(8080);
