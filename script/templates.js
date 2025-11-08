function getTemplateHomePage(name, img, nummerPokemon, typ) {
  return `
    <div class="pokemon-card  ${typ}"  onclick="dialogShowPokemon(${nummerPokemon})"> 
       <b>Nr.${nummerPokemon}</b><h3> ${name} </h3>
         <img src="${img}">
    </div>
    `;
}


function getTemplateDialogPokemon(name, Pokemon) {
  return `
      <div class="pokemonDialogFooter">
        <h2> ${name} </h2>
        <img src="${Pokemon.sprites.other.home.front_default}">
      </div>
      <div class="pokemonDialogNav">
            <button onclick="dialogShowPokemon(${Pokemon.id})">About</button>
            <button onclick="showStats(${Pokemon.id})" >Stats</button>
            <button>Evolution</button>
            <button>Moves</button>
        </div>
      <div class="pokemonDialogMain">
        <div class="pokemonDialogMainContent" id="pokemonDialogMainContentShow">
            <p>  
                <i>Height</i>
                <img src="icons/height.png" alt=""> 
                <i>${Pokemon.height / 10}m </i>
            </p>
            <p>  
                <i>Weight</i>
                <img src="icons/weight.png" alt=""> 
                <i>${Pokemon.weight / 10}kg</i>
            </p>
        </div>
      </div>
    `;
}


function getTemplateStats(Pokemon) {
  return `
      <div class="statsContainer">  
        ${Pokemon.stats.map(stat => `
            <div class="statRow"> 
                <span class="statName">${stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}</span>
                <span class="statValue">${stat.base_stat}</span>
                <div class="progress" >
                  <div class="progress-bar  progress-bar-striped" role="progressbar" style="width:${stat.base_stat}%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>  
        `).join('')}
      </div>
    `;
}


