const http=require('http');

const PORT=8080;

http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response
  res.end(); //end the response
}).listen(PORT, function(){
 console.log("server start at port 8080"); //the server object listens on port 3000
});
