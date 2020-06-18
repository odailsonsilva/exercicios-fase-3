const fs = require('fs')
const data = require('./data.json')

exports.show = function(req, res){
    const { id } = req.params

    const encontrouProfessor = data.teachers.find(function(teacher){
        return teacher.id == id;
    })

    if(!encontrouProfessor){
        return res.send("Professor não encontrado")
    }

    const teacher = {
        ...encontrouProfessor,
    }

    return res.render("teachers/show", {teacher : teacher})
}

//post
exports.post = function(req, res){
    let {name, avatar_url, birth, escolaridade, tipoaula, materias} = req.body
    
    const keys = Object.keys(req.body)
    for(key of keys){
        if(req.body[key] == ""){
            return res.send("Preencha todos os campos")
        }
    }

    birth = Date.parse(req.body.birth)
    const data_atual = Date.now()
    materias = materias.split(",")
    const id = Number(data.teachers.length + 1)
    
    //escolaridade 
    if(escolaridade == "emc"){
        escolaridade = "Ensino Médio Completo"
    }else if(escolaridade == "esc"){
        escolaridade = "Ensino Superior Completo"
    }else if(escolaridade == "me"){
        escolaridade = "Mestrado"
    }else{
        escolaridade = "Doutorado"
    }

    data.teachers.push({
        id,
        name,
        avatar_url,
        birth,
        escolaridade,
        tipoaula,
        materias,
        data_atual
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
        if(err) return res.send("Erro ao guardar os dados")
    })

    return res.redirect('/teachers')
}

//show