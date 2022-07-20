import express from 'express'
const app = express()

app.get('/', function (req, res) {
  res.send('<h1>Labas iš express serverio</h1>')
})

app.listen(3000)




//Serverio kurimas naudojant standartinius nodejs modulius
// import http from 'http'

// const hostname = '127.0.0.1';
// const port = 3001;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Labas Pasauli');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });