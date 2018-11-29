// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data
const express = require('express');
const app = express();
const path = require('path');

var jsonData = {count: 12, message: 'hey'};
console.log(__dirname);
app.get('/', (req, res)=> res.sendFile(path.join(__dirname+'/index.html')));
app.get('/data', (req, res)=> res.json(jsonData));
app.listen(3000, ()=> console.log('hey'));


