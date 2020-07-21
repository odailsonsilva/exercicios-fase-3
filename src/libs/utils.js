module.exports = {
  age: function (timestamp){
    const today = new Date
    const birthDate = new Date(timestamp)

    let age = today.getFullYear() - birthDate.getFullYear()
    let month = today.getMonth() - birthDate.getMonth()

    if(month < 0 ||(month == 0 && today.getDate < birthDate.getDate)){
      age -= 1
    }

    return age
  },
  date: function(timestamp){
    const date = new Date(timestamp)
    const year = date.getUTCFullYear()
    const month = `0${date.getUTCMonth()}`.slice(-2)
    const day = `0${date.getUTCDate()}`.slice(-2)

    return {
      day,
      month, 
      year,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}/${year}`,
      format: `${day}-${month}-${year}`
    }
  },
  graduation: function(escolaridade){
    let graduation = escolaridade
  if(graduation == "emc"){
    graduation = "Ensino Médio Completo"
  }else if(graduation == "esc"){
    graduation = "Ensino Superior Completo"
  }else if(graduation == "me"){
    graduation = "Mestrado"
  }else{
    graduation = "Doutorado"
  }

  return graduation
  },
  ano: function(ano){
    let xano = ano
    if(xano == "5f"){
      xano = "5º ano Fundamental"
    }else if(xano == "6f"){
      xano = "6º ano Fundamental"
    }else if(xano == "7f"){
      xano = "7º ano Fundamental"
    }else if(xano == "8f"){
      xano = "8º ano Fundamental"
    }else if(xano == "9f"){
      xano = "9º ano Fundamental"
    }else if(xano == "1m"){
      xano = "1º ano Médio"
    }else if(xano == "2m"){
      xano = "2º ano Médio"
    }else if(xano == "3m"){
      xano = "3º ano Médio"
    }

    return xano
  }

}