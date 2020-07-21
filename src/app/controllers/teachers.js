const {age, date, graduation, graduation2} = require('../../libs/utils')
const Teacher = require('../models/Teacher')

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
            callback(teachers){
                const pagination = {
                    total: Math.ceil(teachers[0].total / limit),
                    pages
                }

                return res.render('teachers/index', {teachers, pagination, filter})
            }
        }

        Teacher.paginate(params)
 
    },

    show(req, res){
        Teacher.find(req.params.id, function(teacher){
          
            if(!teacher) return res.send('Instrutor nao encontradoo')

            teacher.age = age(teacher.birth_date)

            teacher.education_level = graduation(teacher.education_level)

            teacher.created_at = date(teacher.created_at).format

            return res.render('teachers/show', {teacher: teacher})

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

        Teacher.create(req.body, function(teacher){
            return res.redirect(`/teachers/${teacher.id}`)
        })

    },
 
    edit(req, res){
        Teacher.find(req.params.id, function(teacher){
          
            if(!teacher) return res.send('Instrutor nao encontradoo')

            teacher.birth_date = date(teacher.birth_date).iso


            return res.render('teachers/edit', {teacher: teacher})

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

        Teacher.update(req.body, function(){
            return res.redirect(`teachers/${req.body.id}`)
        })
    },
  
    delete(req, res){
        Teacher.delete(req.body.id, function(){
            return res.redirect('teachers')
        })
    }
}
