const express = require('express');
const app = express();
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};



app.get('/', (req, res) => {
  const mysql = require('mysql');
  const connection = mysql.createConnection(config);

  const sql = `SELECT name FROM people`;
  connection.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      res.sendStatus(500); 
    } else {
      const names = results.map(result => result.name);
      const namesList = names.join(', ');
      const response = `<h1>Full Cycle Rocks!</h1><p>${namesList}</p>`;
      res.send(response); 
    }
    connection.end(); 
  });
});

app.post('/add/:name', (req, res) => {
  const mysql = require('mysql');
  const connection = mysql.createConnection(config);

  const name = req.params.name;

  const sql = `INSERT INTO people(name) VALUES ('${name}')`;
  connection.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      res.sendStatus(201); 
    }
    connection.end(); 
  });
});

app.listen(3000, () => {
  console.log('Aplicação rodando em http://localhost:3000');
})