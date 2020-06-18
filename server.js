const express = require('express')
const nunjucks = require('nunjucks')


const server = express()


server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false, //impri html dentro de "description"
    noCache: true
})

server.get('/', function(req, res){
    return res.render("layout")
})

server.get('/teachers', function(req, res){
    return res.render("teachers/teachers")
})

server.listen(8000)