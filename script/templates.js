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
      <div class="pokemonDialogMain">
        <div class="pokemonDialogMainFooter">
          <a href="#">About</a>
          <a href="#">Base Stats</a>
          <a href="#">Evolution</a>
          <a href="#">Moves</a>
        </div>
        <div class="pokemonDialogMainContent">
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
    `;
}