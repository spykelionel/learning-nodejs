const { log } = require("console");
const http = require("http");

http
  .createServer((request, response) => {
    const { headers, method, url } = request;

    // Let's create a echo server.
    // It pipes the request back to response.
    if (request.method === 'POST' && request.url === '/echo') {
        request.pipe(response);
      } else {
        response.statusCode = 404;
        response.end();
      }

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
    
    const responseBody = { headers, method, url, body };
 
    response.write(JSON.stringify(responseBody));
    response.end();

    // // OR 
    // The end function on streams can also take in some optional data to send as the last bit of data on the stream, so we can simplify the example above as follows.
    // response.end('<html><body><h1>Hello, World!</h1></body></html>');

  })
  .listen(5000, ()=>{
    log("Server running on port 5000")
  });


/*   
We've now covered most of the basics of handling HTTP requests. At this point, you should be able to:

Instantiate an HTTP server with a request handler function, and have it listen on a port.
Get headers, URL, method and body data from request objects.
Make routing decisions based on URL and/or other data in request objects.
Send headers, HTTP status codes and body data via response objects.
Pipe data from request objects and to response objects.
Handle stream errors in both the request and response streams.
From these basics, Node.js HTTP servers for many typical use cases can be constructed. There are plenty of other things these APIs provide, so be sure to read through the API docs for EventEmitters, Streams, and HTTP.

*/