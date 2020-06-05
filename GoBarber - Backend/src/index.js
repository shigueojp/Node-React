const express = require('express');

const server = express();
server.use(express.json());

/*  
=>      Query Params /user/?name=abc
server.get('/teste', (req, res) => {
     const nome = req.query.nome
     return res.json({message: `Hello ${nome}`})
 })

 =>     Route Params /users/:id
  req.params.id

=>      Route Body Params
  req.body.id
*/
const users = ['Ronaldo'];

// => MIDDLEWARE
server.use((req, res, next) => {
  return next();
});

function checkUserExists(req, res, next) {
  if (!req.body.user) {
    return res.status(400).json({ error: 'User not found!' });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  if (!users[req.params.id]) {
    return res.status(400).json({ error: 'User does not exists!' });
  }

  return next();
}

// => CREATE
server.post('/users', (req, res) => {
  const { nome } = req.body;
  users.push(nome);

  return res.json(users);
});

// => READ
server.get('/users', (req, res) => res.json(users));

server.get('/users/:id', checkUserInArray, (req, res) => {
  const { id } = req.params;

  return res.json(users[id]);
});

// => UPDATE
server.put('/users/:id', checkUserExists, checkUserInArray, (req, res) => {
  const index = req.params.id;
  const { nome } = req.body;
  users[index] = nome;

  return res.json(users);
});
// => DELETE
server.delete('/users/:id', checkUserInArray, (req, res) => {
  const index = req.params.id;
  // Cortar 1 posicao a partir do index
  users.splice(index, 1);

  return res.json(users);
});

server.listen('3000');
