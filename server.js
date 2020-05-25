// var http = require('http');

// var server = http.createServer((req, res) => {
//   // console.log(req.method);
//   const url = req.url;
//   console.log(url);
//   if(url === '/about') {
//     res.write('<h1>About US page</h1>');
//   } else if(url === '/contact') {
//     res.write('<h1>Contact page</h1>');
//   } else {
//     res.write('<h1>Other page</h1>');
//   }
//   // res.write('Hello World !');
//   res.end();
// });

// server.listen(3000)

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req,res) => res.send('<h1>Home page</h1>'));
app.get('/about', (req,res) => res.send('<h1>About US page</h1>'));
app.get('/contact', (req,res) => res.send('<h1>Contact page</h1>'));
app.get('*', (req,res) => res.send('<h1>Other page</h1>'));

app.listen(port, () => console.log(`App listening on port ${port} !`));