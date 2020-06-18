const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')


//get
routes.get('/', function(req, res){
    return res.redirect("/teachers")
})

routes.get('/teachers', function(req, res){
    return res.render("teachers/teachers")
})

routes.get('/teachers/create', function(req, res){
    return res.render("teachers/create") 
})

routes.get('/teachers/:id', teachers.show)

//post
routes.post("/teachers", teachers.post)


module.exports = routes