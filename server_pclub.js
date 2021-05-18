const express = require("express");
const session = require('express-session');
const fs = require('fs');

const port = 2000;
const app = express();

let Name = [];
let Branch = [];
let rollno = [];
app.use(express.static('public'));
app.use(session({
  secret: 'my-secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: false
  }
}));

app.get('/', function (req, res) {
  if (req.query.Newregistration) Name.push(req.query.Newregistration);
  const formattedename = Name.map((name)=> `<dd>${name}</dd>`).join(' ');
  const template = fs.readFileSync('./index.html', 'utf8');
  const view = template.replace('$registered$', formattedename);
  res.send(view);
});


app.listen(port, () => console.log(`The server is listening at http://localhost:${port}`));
