const db = require('../../config/db')
const {age, date, graduation, graduation2} = require('../../libs/utils')

module.exports = {
  all(callback){
    const query = `
    SELECT * FROM teachers
    `
    // SELECT teachers.*, count(students) AS total_students
    // FROM teachers
    // LEFT JOIN students ON (teachers.id = students.teacher_id )
    // GROUP BY teachers.id
    // ORDER BY total_students
    db.query(query, function(err, results){
        if(err) throw `erro index controller ${err}`

        callback(results.rows)
    })
  },
  create(data, callback){

    const query = `
      INSERT INTO teachers ( 
        avatar_url,
        name,
        birth_date,
        education_level,
        class_type,
        materias,
        created_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7
      ) RETURNING id
    `

    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.escolaridade,
      data.tipoAula,
      data.materias,
      date(Date.now()).iso,
    ]

    db.query(query, values, function(err, results){
      if(err) throw `Erro no MODEL CREATE ${err}`

      callback(results.rows[0])
    })

  },
  find(id, callback){
    db.query('SELECT * FROM teachers WHERE id = $1', [id], function(err, results){
      if(err) throw `Erro no MODEL FIND ${err}`

      callback(results.rows[0])
    })  
  },
  update(data, callback){
    const query = `
      UPDATE teachers SET
        avatar_url=($1),
        name=($2),
        birth_date=($3),
        education_level=($4),
        class_type=($5),
        materias=($6)
      WHERE id=$7
    `

    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.escolaridade,
      data.tipoAula,
      data.materias,
      data.id
    ]

    db.query(query, values, function(err, results){
      if(err) throw `Erro no MODEL UPDATE ${err}`
      
      callback()
    })
  },
  delete(id, callback){
    db.query('DELETE FROM teachers WHERE id = $1', [id], function(err, results){
      if(err) throw `Erro no MODEL DELETE ${err}`
      
      callback()
    })
  },
  findBy(filter, callback){
    db.query(`
    SELECT teachers.*, count(students) AS total_students 
    FROM teachers
    LEFT JOIN students ON (teachers.id = students.teacher_id)
    WHERE teachers.name ILIKE '%${filter}%'
    OR teachers.materias ILIKE '%${filter}%'
    GROUP BY teachers.id
    ` , function(err, results){
      if(err)  throw `erro no all do bd${err}`
      
      callback(results.rows)
  })
  },
  paginate(params){
    let {filter, limit, offset, callback} = params
    //no model de instructors add as subquerys
    let query = "", 
    filterQuery = "",
    totalQuery = `
    (SELECT count(*) FROM teachers) 
    AS total
    `

    if(filter){

      filterQuery = ` WHERE teachers.name ILIKE '%${filter}%'
      OR teachers.materias ILIKE '%${filter}%'
      `

      totalQuery = `
      (SELECT count(*) FROM teachers
       ${filterQuery})  
      AS total
      `
    }

    query = `SELECT teachers.*, ${totalQuery}, count(students) AS total_students
    FROM teachers
    LEFT JOIN students ON (teachers.id = students.teacher_id)
    ${filterQuery}
    GROUP BY teachers.id LIMIT $1 OFFSET $2`

    db.query(query, [limit, offset], function(err, results){
      if(err) throw `erro na paginacao ${err}`

      callback(results.rows)
    })
  }
}