const db = require('../../config/db')
const {age, date, graduation, graduation2} = require('../../libs/utils')

module.exports = {
  all(callback){
    const query = `
        SELECT * FROM students
        ORDER BY students.name
    `
    db.query(query, function(err, results){
        if(err) throw `erro index controller ${err}`

        callback(results.rows)
    })
  },
  create(data, callback){

    const query = `
      INSERT INTO students ( 
        avatar_url,
        name,
        birth_date,
        email,
        ano,
        chs,
        created_at,
        teacher_id
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8
      ) RETURNING id
    `

    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.email,
      data.ano,
      data.chs,
      date(Date.now()).iso,
      data.teacher
    ]

    db.query(query, values, function(err, results){
      if(err) throw `Erro no MODEL CREATE ${err}`

      callback(results.rows[0])
    })

  },
  find(id, callback){
    db.query(`SELECT students.*, teachers.name AS teacher_name
    FROM students 
    LEFT JOIN teachers ON (students.teacher_id = teachers.id)
    WHERE students.id = $1`, [id], function(err, results){
      if(err) throw `Erro no MODEL FIND ${err}`

      callback(results.rows[0])
    })  
  },
  update(data, callback){
    const query = `
      UPDATE students SET
        avatar_url=($1),
        name=($2),
        birth_date=($3),
        email=($4),
        ano=($5),
        chs=($6),
        teacher_id=($7)
      WHERE id=$8
    `

    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.email,
      data.ano,
      data.chs,
      data.teacher,
      data.id
    ]

    db.query(query, values, function(err, results){
      if(err) throw `Erro no MODEL UPDATE ${err}`
      
      callback()
    })
  },
  delete(id, callback){
    db.query('DELETE FROM students WHERE id = $1', [id], function(err, results){
      if(err) throw `Erro no MODEL DELETE ${err}`
      
      callback()
    })
  },
  teacherOptionSelect(callback){
    db.query(`SELECT name, id FROM teachers`, function(err, results){
      if(err) throw `erro teacherOptionSelect ${err}`

      callback(results.rows)
    })
  },
  paginate(params){
    let {filter, limit, offset, callback} = params
    //no model de instructors add as subquerys
    let query = "", 
    filterQuery = "",
    totalQuery = `
    (SELECT count(*) FROM students) 
    AS total
    `

    if(filter){

      filterQuery = ` WHERE students.name ILIKE '%${filter}%'
      `

      totalQuery = `
      (SELECT count(*) FROM students
       ${filterQuery})  
      AS total
      `
    }

    query = `SELECT students.*, ${totalQuery}
    FROM students
    ${filterQuery}
    LIMIT $1 OFFSET $2`

    db.query(query, [limit, offset], function(err, results){
      if(err) throw `erro na paginacao ${err}`

      callback(results.rows)
    })
  }
}