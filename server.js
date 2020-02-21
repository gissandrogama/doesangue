//configurando o servidor
const express = require("express")
const server = express()

//configurando o servidor para apresentar arquivos estáticos
server.use(express.static('public'))

//configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server
})

//lista de doadores: Vetor / Array
const donors = [
    {
        name: "Gissandro Gama",
        blood: "O+"
    },
    {
        name: "Luana Helena",
        blood: "O+"
    },    
    {
        name: "Henry Gama",
        blood: "O+"
    },    
    {
        name: "Marcos Antonio",
        blood: "AB+"
    },
]

//configurando a apresentação da página
server.get("/", function(req, res){
    return res.render("index.html", {donors})
})

//ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, function(){
    console.log("Servidor iniciado")
})