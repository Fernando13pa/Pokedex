function getTemplateHomePage(name, img, nummerPokemon, typ) {
  return `
    <div class="pokemon-card  ${typ}"  onclick="dialogShowPokemon(${nummerPokemon})"> 
       <b>Nr.${nummerPokemon}</b><h3> ${name} </h3>
         <img src="${img}">
    </div>
    `;
}


function getTemplateDialogPokemon(name, pokemon) {
  return `
      <div class="pokemonDialogFooter">
        <h2> ${name} </h2>
        <img src="${pokemon.sprites.other.home.front_default}">
      </div>
      <div class="pokemonDialogNav">
            <button onclick="dialogShowPokemon(${pokemon.id})">About</button>
            <button onclick="showStats(${pokemon.id})" >Stats</button>
            <button onclick ="showEvolution('${name}')">Evolution</button>
            <button>Moves</button>
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


