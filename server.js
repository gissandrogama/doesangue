//configurando o servidor
const express = require("express")
const server = express()

//configurando o servidor para apresentar arquivos estáticos
server.use(express.static('public'))

//habilitar body do formulario
server.use(express.urlencoded({ extended: true}))

//configurar conexão com o banco de dados
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'doe'
})

//configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true,
})

// //lista de doadores: Vetor / Array
// const donors = [
//     {
//         name: "Gissandro Gama",
//         blood: "O+"
//     },
//     {
//         name: "Luana Gama",
//         blood: "O+"
//     },    
//     {
//         name: "Henry Gama",
//         blood: "O+"
//     },    
//     {
//         name: "Marcos Antonio",
//         blood: "AB+"
//     },
// ]

//configurando a apresentação da página
server.get("/", function(req, res){
    
    db.query("SELECT * FROM donors", function(error, result){
        if(error) return res.send("Erro no banco de dados.")

        const donors = result.rows
        return res.render("index.html", {donors})

    })

})

server.post("/", function(req, res){
    //pegar dados do 
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    //se algum campo estiver vazio
    if (name == "" || email == "" || blood == ""){
        return res.send("Todos os campos tem que ser preenchido.")
    }

    // //colocando valores no array
    // donors.push({
    //     name: name,
    //     blood: blood,
    // })

    //colocando valores no banco
    const query = `
    INSERT INTO donors ("name", "email", "blood")
    VALUES ($1, $2, $3)`

    const values = [name, email, blood]

    db.query(query, values, function(error){
        //fluxo de erro
        if (error) return res.send("Error no banco de dados.")

        //fluxo ideal 
        return res.redirect("/")
    } )

})

//ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, function(){
    console.log("Servidor iniciado")
})