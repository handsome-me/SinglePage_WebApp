const http=require('http');
const path=require('path');
const fs=require('fs');

const PORT=8080;

http.createServer(function (req, res) {

  if (req.url == '/index.js') {
    console.log('into index.js');
        const readStream = fs.createReadStream(path.resolve('./frontend/index.js'));
        res.writeHead(200,{'Content-type': 'application/javascript'});
        readStream.pipe(res);
        return;
    }
       const readStream = fs.createReadStream(path.resolve('./frontend/index.html'));
        res.writeHead(200,{'Content-type': 'text/html'});
       
        readStream.on('open', function () {
    // This just pipes the read stream to the response object (which goes to the client)
    readStream.pipe(res);
  });
  
   

  // This catches any errors that happen while creating the readable stream (usually invalid names)
  readStream.on('error', function(err) {
    res.end(err);
  });
        


}).listen(PORT, function(){
 console.log("server start at port 8080"); //the server object listens on port 3000
});
