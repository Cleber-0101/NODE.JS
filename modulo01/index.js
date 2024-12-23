const express = require('express');
const server = express();

server.use(express.json());

// Query params = ?node=NODE.JS
// Route params = /curso/2
// Requeste Body = { nome: 'NODE.js' ,  TIPO: 'BACKEND' }

//CRUD >  CREATE ,READ , UPDATE , DELETE

const cursos = ['Node.js' , 'javascript' , 'reactnative' ,'Cleber'];

//Read - buscando todos os cursos
server.get('/cursos' , (req,res)=> {
  return res.json(cursos);
})

//Middleware Global 
server.use((req,res,next)=>{
  console.log(`URL CHAMADA ${req.url}`)

  return next();
})
 
//middleware 
function verificandoSeEstaPassandoNomeDosCursos(req, res, next){
  if(!req.body.name){
    return res.status(400).json({error: "Nome do curso é obrigatorio!!!"})
  }

  return next();
}

//middleware 
function verificandoUrlExistente(req, res, next){
  const curso = cursos[req.params.index]
  if(!curso){
    return res.status(400).json({
      error: "O curso não existe"
    })
  }

  req.curso = curso

  return next();
}

// function cursoCriadoComSucesso(req, res, next) {
//   if (req.body.name) {
//     return res.status(200).json({ mensagem: "Curso criado com Sucesso" });
//   }

//   return next();
// }



//Get - Busca um usuario via indexados(url-id)
server.get('/cursos/:index' , verificandoUrlExistente, (req , res) => {
  const {index} = req.params;

  return res.json(req.curso);
})

//Post - criando novo curso
server.post('/cursos', verificandoSeEstaPassandoNomeDosCursos,(req,res)=> {
  const {name} = req.body;
  cursos.push(name);

  return res.json(cursos);
})

//Put - Atualizando curso 
server.put('/cursos/:index', verificandoSeEstaPassandoNomeDosCursos, verificandoUrlExistente, (req ,res)=> {
  const {index} = req.params;
  const {name} = req.body
  cursos[index] = name;

  return res.json(cursos)
})

//Excluindo curso 
server.delete('/cursos/:index', verificandoUrlExistente, (req,res) => {
  const {index} = req.params
  cursos.splice(index , 1)
  return res.json({ mensagem : "Curso deletado com sucesso" })
})

server.listen(3000);