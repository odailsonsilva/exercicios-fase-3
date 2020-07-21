const paginaAtual = location.pathname
const menuitems  = document.querySelectorAll("header .links a")

for(item of menuitems) {
  if(paginaAtual.includes(item.getAttribute("href"))){
    item.classList.add("active")
  }
}

function paginate(selectedPage, totalPages){
  let pages = [], oldPage //oldPage = e a posicao anterior do array

for(let currentPage = 1; currentPage <= totalPages; currentPage++){
    const firshAndLastPage = (currentPage == 1 || currentPage == totalPages)
    const pagesAfterSelectPage = (currentPage <= selectedPage + 2)
    const pagesBeforeSelectPage = (currentPage >= selectedPage - 2)


    if(firshAndLastPage || pagesAfterSelectPage && pagesBeforeSelectPage){ //observar os operadores
      //logica dos pontos
      if(oldPage && currentPage - oldPage > 2){
        pages.push("...")
      }

      //logica para q se proximo elemento nao for >= 2 
      if(oldPage && currentPage - oldPage == 2){
        pages.push(oldPage + 1)
      }

      pages.push(currentPage)

      oldPage = currentPage
    }
  
  } 

  return pages
}

function createPagination(pagination){
const page = +pagination.dataset.page//mais converpara tipo Number
const total = +pagination.dataset.total
const pages = paginate(page, total)
const filter = pagination.dataset.filter
console.log(page, total, filter)

let elements = ""

for(let page of pages){
  if(String(page).includes('...')){
    elements += `<span>${page}</span>`
  }else{
    if(filter){
      elements += `<a href="?pages=${page}&filter=${filter}">${page}</a>`
    }else{
      elements += `<a href="?pages=${page}">${page}</a>`
    }
  }
  
}

pagination.innerHTML = elements
}

const pagination = document.querySelector('.pagination')


if(pagination){
  createPagination(pagination)
}