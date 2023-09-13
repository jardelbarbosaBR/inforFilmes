const bntBuscar = document.getElementById("btnPesquisar")
const btnMaisFilmes = document.getElementById('btnMaisFilmes')
const listarfilmes = document.querySelector('.listarfilmes')
const inforFilmeExibir = document.querySelector('.inforFilmeExibir')
const key = "6c7be0f2"

bntBuscar.addEventListener('click',() =>{
    const filme =  document.getElementById("pesquisar").value
    if(filme == ""){
        alert("Coloque o nome do filme")
        return
    }
    inforFilmeExibir.innerHTML=""
    procurarFilme(filme)
})

function procurarFilme(filme){
   fetch(`https://www.omdbapi.com/?s=${filme}&apikey=${key}`)
   .then(r => r.json())
   .then(filmes =>{exibirFilmes(filmes)
}).catch((erro) =>{console.log("Aconteceu um erro: " + erro)})
}

function exibirFilmes(filmes){
    
    if(filmes.Response == "False"){
        alert("Filme não encontrado");
        return
    }
    let listadeFilmes = filmes.Search.map((element, index) => {
        return `
        <div class="col d-flex justify-content-center align-self-stretch mb-4">
            <div class="card text-center" style="width: 13rem;">
                <img src="${element.Poster}" class="card-img-top"  alt="...">
                    <div class="card-body d-flex align-items-center  justify-content-center flex-column">
                        <h5 class="card-title text-center" id="tituloFilme-${index}">${element.Title}</h5>
                        <p  class="card-text">${element.Year}</p>
                        <button type="button" class="btn btn-primary" id="btnMaisFilmes" onclick="maisSobre(${index})">Saiba mais</button>
                    </div>
            </div>
        </div> 
    `
        
    });
    
    listarfilmes.innerHTML = listadeFilmes
}

// PESQUISAR INFORMÇÕES SOBRE O FILME QUE O USUARIO ESCOLHER

function maisSobre(index){
    let tituloFilme = document.getElementById('tituloFilme-'+ index).textContent
    pegarInfordoFilme(tituloFilme)
}

function pegarInfordoFilme(tituloFilme){
    fetch(`https://www.omdbapi.com/?t=${tituloFilme}&plot=full&apikey=${key}`)
    .then(r => r.json())
    .then(filme =>{
        exibirInfoFilme(filme)
    }).catch((erro) =>{console.log("Aconteceu um erro: " + erro)})
 }

 function exibirInfoFilme(filme){
    listarfilmes.innerHTML = ""
    inforFilmeExibir.innerHTML = `
    <div class="col-4">
                    <img id="capa-poster" class=" rounded img-thumbnail " src="${filme.Poster}" alt="">
                </div>
                <div class="col-sm-6">
                    <h1 id="titulofilme">${filme.Title}</h1><hr>
                    <p id="ano-filme">${filme.Year}</p>
                    <p id="tag-ano">ANO DE LANÇAMENTO</p>
                    <p>${filme.Plot}</p>
                <div class="row  align-items-center text-center py-4">
                <div class="col bg-body-secondary pt-2">
                    <p><img class="icone-logo" src="img/tomate.png">Rotten Tomatoes</p>
                    <p id="idtomate">S/N</p>
                </div>
                <div class="col bg-body-secondary pt-2">
                    <p><img class="icone-logo" src="img/metascore.png">Metacritic</p>
                    <p id="idmetric">S/N</p>
                </div>
                <div class="col bg-body-secondary pt-2">
                    <p><img class="icone-logo" src="img/imdb.png">IMDB</p>
                    <p id="idimdb">S/N</p>
                </div>
            </div>
        </div>
    `

 /**
  *     ---- Verifica se existe alguma avaliação
  */
    let idmetric = document.getElementById('idmetric')
    let idimdb = document.getElementById('idimdb')
    let idtomate = document.getElementById('idtomate')


    filme.Ratings.forEach(item => {
        if(item.Source === "Internet Movie Database"){
            idimdb.textContent = item.Value
        }else if(item.Source === "Metacritic"){
            idmetric.textContent = item.Value 
        }else if(item.Source === "Rotten Tomatoes"){
            idtomate.textContent = item.Value
        }
    });
}
 





/*
<div class="col-4">
                    <img id="capa-poster" class=" rounded img-thumbnail " src="${item.Poster}" alt="">
                </div>
                <div class="col-sm-6">
                    <h1 id="titulofilme">${item.Title}</h1><hr>
                    <p id="ano-filme">${item.Year}</p>
                    <p id="tag-ano">ANO DE LANÇAMENTO</p>
                    <p>${item.Plot}</p>
                <div class="row  align-items-center text-center py-4">
                <div class="col bg-body-secondary pt-2">
                    <p><img class="icone-logo" src="img/tomate.png">Rotten Tomatoes</p>
                    <p>${item.Ratings[1].Value}</p>
                </div>
                <div class="col bg-body-secondary pt-2">
                    <p><img class="icone-logo" src="img/metascore.png">Metacritic</p>
                    <p>${item.Ratings[2].Value}</p>
                </div>
                <div class="col bg-body-secondary pt-2">
                    <p><img class="icone-logo" src="img/imdb.png">IMDB</p>
                    <p>${item.Ratings[0].Value}</p>
                </div>
            </div>
        </div>
        
        `

 let idtomate = document.getElementById('idtomate')
    let idmetric = document.getElementById('idmetric')
    let idimdb = document.getElementById('idimdb')

    if(filme.hasOwnProperty("Ratings")){
        console.log(filme)
        console.log("Sim existe")
    }else{
        console.log("Não eciste")
    }
*/