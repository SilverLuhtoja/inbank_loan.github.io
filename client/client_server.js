import http from 'http';
import fs from 'fs';
const server = http.createServer((req, res) => {
  if (req.url == '/main.css') {
    res.setHeader('Content-type', 'text/css');
    res.write(fs.readFileSync('./client/main.css'));
    res.end();
    return;
  }
  if (req.url == '/app.js') {
    res.setHeader('Content-type', 'text/css');
    res.write(fs.readFileSync('./client/app.js'));
    res.end();
    return;
  }
  res.writeHead(200, { 'content-type': 'text/html' });
  fs.createReadStream('./client/index.html').pipe(res);
});
server.listen(process.env.PORT || 8000);
