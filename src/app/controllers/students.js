const {age, date, graduation, ano} = require('../../libs/utils')
const Student = require('../models/Student')

//index
module.exports = {
    index(req, res){
        let {filter, pages, limit} = req.query

        pages = pages || 1
        limit = limit || 2

        let offset = limit * (pages - 1)

        const params = {
            filter, 
            pages,
            limit,
            offset,
            callback(students){
                const pagination = {
                    total: Math.ceil(students[0].total / limit),
                    pages
                }

                return res.render('students/index', {students, pagination, filter})
            }
        }

        Student.paginate(params)
 
    },

    create(req, res){
        Student.teacherOptionSelect(function(options){
            return res.render("students/create", {teachersOptions: options}) 
        })
    },
 
    show(req, res){
        Student.find(req.params.id, function(student){
          
            if(!student) return res.send('Instrutor nao encontradoo')

            student.age = age(student.birth_date)

            student.ano = ano(student.ano)

            return res.render('students/show', {student: student})

        })
    },
    
    post(req, res){
        //validacao - se tudo preechido
        const keys = Object.keys(req.body) 
        for(key of keys){
            if(req.body[key] == ""){
                return res.send("Preencha todos os campos")
            }
        }

        Student.create(req.body, function(student){
            return res.redirect(`/students/${student.id}`)
        })

    },
 
    edit(req, res){
        Student.find(req.params.id, function(student){
          
            if(!student) return res.send('Instrutor nao encontradoo')

            student.birth_date = date(student.birth_date).iso

            Student.teacherOptionSelect(function(options){
                return res.render('students/edit', {student: student, teachersOptions: options})
            })

        })
    },

    put(req, res){
         //validacao - se tudo preechido
         const keys = Object.keys(req.body) 
         for(key of keys){
             if(req.body[key] == ""){
                 return res.send("Preencha todos os campos")
             }
            }

        Student.update(req.body, function(){
            return res.redirect(`students/${req.body.id}`)
        })
    },
  
    delete(req, res){
        Student.delete(req.body.id, function(){
            return res.redirect('students')
        })
    }
}
