const url = "https://api.themoviedb.org/3/movie/upcoming?api_key=c8f0e89c2a789ea8a93c6db654ac65d8&language=en-US&page=1"


async function getAPI(proxima){
    try {
        const resultado = await fetch(proxima)
        if(resultado.ok){
            console.log(resultado.status)
            return await resultado.json()
        }else{
            throw new Error ('Http error: ${resultado.status}')}

    }catch (error){
        console.error(error)
    }
}


var htmlPeliculas = (movie) =>  `
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${movie.original_title}</h5>
            <p class="card-text"> ${movie.overview} </p>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Ver más
            </button>
        </div>
    </div>
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">${movie.original_title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
            <div class="modal-body">
                    <img src=" https://image.tmdb.org/t/p/w500/${movie.poster_path}">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary">Agregar a favoritos</button>
            </div>
        </div>
    </div>  `


async function renderMovie(){
    let movie = await getAPI(url)
    if(movie){
        var renderArray = movie.results.map(htmlPeliculas)
        var renderJoin = renderArray.join(' ')

        let lista = document.querySelector('#renderProximas')
        lista.innerHTML = renderJoin
    }
}

renderMovie();
