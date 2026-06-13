const http = require('http');
const { getUsers } = require('../src/modules/readUsers');

const PORT = process.env.PORT || 3003;
const HOST = '127.0.0.1';

const server = http.createServer((req, res) => {
  
  const url = new URL(req.url, `http://${HOST}`);
  const params = url.searchParams;

  // передан параметр ?hello=<name>
  if (params.has('hello')) {
    const name = params.get('hello');
    if (name && name.trim() !== '') {
      
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`Hello, ${name}.`);
    } else {
      
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Enter a name');
    }
    return;
  }

  // передан параметр ?users
  if (params.has('users')) {
    
    const allKeys = Array.from(params.keys());
    if (allKeys.length === 1 && allKeys[0] === 'users') {
      const users = getUsers();
      if (users) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(users));
      } else {
        
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Internal Server Error');
      }
    } else {
      
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end();
    }
    return;
  }

  //  параметров нет
  if (params.size === 0) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Hello, World!');
    return;
  }

  //  (не hello и не users)
  res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end();
});

server.listen(PORT, HOST, () => {
  console.log(`Сервер запущен по адресу http://${HOST}:${PORT}`);
});