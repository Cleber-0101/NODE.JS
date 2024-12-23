const express = require('express');
const server = express();

server.use(express.json());

// Query params = ?node=NODE.JS
// Route params = /curso/2
// Requeste Body = { nome: 'NODE.js' ,  TIPO: 'BACKEND' }

//CRUD >  CREATE ,READ , UPDATE , DELETE

const cursos = ['Node.js' , 'javascript' , 'reactnative' ,'cleber'];

//Read - buscando todos os cursos
server.get('/cursos' , (req,res)=> {
  return res.json(cursos);
})

//Post - criando novo curso
server.post('/cursos' , (req,res)=> {
  const {name} = req.body;
  cursos.push(name);

  return res.json(cursos);
})

//Put - Atualizando curso 
server.put('/cursos/:index', (req ,res)=> {
  const {index} = req.params;
  const {name} = req.body
  cursos[index] = name;

  return res.json(cursos)
})

// localhost:3000/curso
server.get('/cursos/:index' , (req , res) => {
  //PERGUNTANDO , BUSCANDO REQUERENDO
  const {index} = req.params;

  //REPOSTA DA REQUISIÇÃO , DEVOLVENDO RESPONSE
  return res.json(cursos[index]);
})

//Excluindo curso 
server.delete('/cursos/:index', (req,res) => {
  const {index} = req.params
  cursos.splice(index , 1)
  return res.json({ mensagem : "Curso deletado com sucesso" })
})



server.listen(3000);