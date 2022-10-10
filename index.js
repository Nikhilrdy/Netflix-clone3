const apikey="7543524441a260664a97044b8e2dc621";
const apiEndpoint="https://api.themoviedb.org/3"
const imgPath="https://image.tmdb.org/t/p/original";
const apiPaths={
    fetchAllCategories: `${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
fetchMoviesList:(id)=> `${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`
}

function init(){
    fetchAndBuildAllSections();

}
function fetchAndBuildAllSections(){
    fetch(apiPaths.fetchAllCategories)
    .then(res=>res.json())
    .then(res=>{
        const categories=res.genres;
        if(Array.isArray(categories) && categories.length){
    categories.forEach(category=> {
        fetchAndbuildMovieSection(
            apiPaths.fetchMoviesList (category.id),
            category
            );
    });
        }
       // console.table(movies);

    })
    .catch(err=>console.error(err));
}
function fetchAndbuildMovieSection(fetchUrl,category){
    console.log(fetchUrl,category);
    fetch(fetchUrl)
    .then(res=>res.json())
    .then(res=>{
        //console.table(res.results);
        const movies =res.results;
        if(Array.isArray(movies)&& movies.length){
            buildMoviesSection(movies,category.name);
        }
    })
    .catch(err=>console.error(err))
}
function buildMoviesSection(list,categoryName){
    console.log(list, categoryName);
    const moviesCont=document.getElementById('movies-cont');
    const moviesListHTML=list.map(item=> {
        return `
                    <img class ="movies-item" src="${imgPath}${item.backdrop_path}" alt="{item.title}">

        `;
    }).join('');
    const moviesSectionHTML=`
   
    <h2 class ="movie-section-heading">${categoryName} <span class="explore-nudge">Explore All</span></h2>
    <div class="movies-row">
    ${moviesListHTML}
    </div>  
    `
    console.log(moviesSectionHTML);
    const div= document.createElement('div');
    div.className="movies-section"
    div.innerHTML=moviesSectionHTML;
moviesCont.append(div);
}
window.addEventListener('load',function(){
    init(); 
})