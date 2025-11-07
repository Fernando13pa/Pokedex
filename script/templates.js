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
            <button >About</button>
            <button>Statics</button>
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