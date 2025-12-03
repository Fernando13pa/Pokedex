function getlopadingspinnerTemplate() {
  return `
    <span class="loader"></span>
    `;
}



function getTemplateHomePage(name, img, nummerPokemon, typ, typ2 = '') {
  return `
    <div class="pokemon-card  ${typ}"  onclick="dialogShowPokemon(${nummerPokemon})"> 
       <b>Nr.${nummerPokemon}</b><h3> ${name} </h3>
         <img src="${img}">
          <div class="typeContainer">
          <img src="icons/${typ}.ico" alt=""> 
          ${typ2 ? `<img src="icons/${typ2}.ico" alt="">` : ''}
          </div>
    </div>
    `;
}



function getTemplateloadIcon() {
    return `
     
        <img src="icons/pikachu-loadmore.png" alt="" onclick="loadMorePokemon()">
     
    `;
}



function getButtonLoadMoreTemplate() {
  return `
    <div class="loadMoreContainer">
         <span id="loadMoreButton"  class="loader-more"></span>
    </div>
    `;
}



function getButtonLoadLessTemplate() {
  return `
    
         <div class="pokemon" onclick= "animation()" id="loadLessSpinner">
          </div>
    
    `;
}



function getTemplateDialogPokemon(name, pokemon) {
  return `
      <div class="pokemonDialogHeader">
        <h2> ${name} </h2> <button onclick="closeAlbum()" class="${pokemon.types[0].type.name}">X</button>
        <div>
        <img src="icons/pfeil-links.png" alt="" class="next-left" onclick="scrollenPrevious(${pokemon.id})">
        <img src="${pokemon.sprites.other.home.front_default}">
        <img src="icons/pfeil-rechts.png" alt=""  class="next-rigth" onclick="scrollenNext(${pokemon.id})">
        </div>
      </div>
      <div class="pokemonDialogNav">
            <button onclick="dialogShowPokemon(${pokemon.id})" class ="button-${pokemon.types[0].type.name}">About</button>
            <button onclick="showStats(${pokemon.id})" class ="button-${pokemon.types[0].type.name}"  >Stats</button>
            <button onclick ="showEvolution('${pokemon.name}')" class ="button-${pokemon.types[0].type.name}">Evolution</button>
        </div>
      <div class="pokemonDialogMain">
        <div class="pokemonDialogMainContent" id="pokemonDialogMainContentShow">
            <p>  
                <i>Height</i>
                <img src="icons/height.png" alt=""> 
                <i>${pokemon.height / 10}m </i>
            </p>
            <p>  
                <i>Weight</i>
                <img src="icons/weight.png" alt=""> 
                <i>${pokemon.weight / 10}kg</i>
            </p>
        </div>
      </div>
    `;
}



function getTemplateStats(Pokemon, responseToJson) {
  return `
      <div class="statsContainer">  
            <div class="statRow"> 
              <span class="statName">${Pokemon.stat.name.charAt(0).toUpperCase() + Pokemon.stat.name.slice(1)}</span>
              <span class="statValue">${Pokemon.base_stat}</span>
              <div class="progress" >
                <div class="progress-bar ${responseToJson.types[0].type.name}  progress-bar-striped" role="progressbar" style="width:${Pokemon.base_stat}%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>  
      </div>
    `;
}



function getTemplateEvolution(name, img) {
  return `
      <div class="evolutionCard">  
            <h5> ${name} </h5>
            <img src="${img}">
      </div>
    `;
}














