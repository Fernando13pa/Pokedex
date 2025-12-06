function renderContentHomePage() {                  // funktion zum rendern der inhalte der homepage //
    document.getElementById('main-loader').style = ' ';
    document.getElementById('main-loader').style = 'height: 100%;';
    document.getElementById('content').innerHTML = " ";
    for (let i = 0; i < pokemonsData.length; i++)  {                 // schleife durch alle pokemons im pokemonsData array //
        document.getElementById('content').innerHTML += getTemplateHomePage(pokemonsData[i].name.charAt(0).toUpperCase() + pokemonsData[i].name.slice(1), pokemonsData[i].sprites.other.home.front_default, pokemonsData[i].id, pokemonsData[i].types[0].type.name, pokemonsData[i].types[1]?.type.name);
        if (i === pokemonCounterAdd - 1 ) {                         // wenn i gleich der variable pokemonCounterAdd(20), dann break //
            document.getElementById('loadMoreContainer').innerHTML = getTemplateloadIcon(); //Pikachu Img button hinzufügen//
            break;
        }
    }
}

function renderContentDialog(responseToJson) {
    document.getElementById('dialog').innerHTML = " ";
    document.getElementById('dialog').classList = " ";
    // document.getElementById('dialog').style = 'width: 35%;';
    document.getElementById('dialog').innerHTML = getTemplateDialogPokemon(pokemonsData[responseToJson].name.charAt(0).toUpperCase() + pokemonsData[responseToJson].name.slice(1), pokemonsData[responseToJson]);
    document.getElementById('dialog').classList.add(pokemonsData[responseToJson].types[0].type.name);
}

function renderContentStats(idArray) {
    let statPokemon = pokemonsData[idArray]
    let stats = statPokemon.stats.map(element => element);
    document.getElementById('pokemonDialogMainContentShow').innerHTML = " ";
    document.getElementById('pokemonDialogMainContentShow').style = 'flex-direction: ';
    // document.getElementById('dialog').style = 'width: 35%;';
    for (let i = 0; i < stats.length; i++) {
        document.getElementById('pokemonDialogMainContentShow').innerHTML += getTemplateStats(stats[i], statPokemon);
    }
}

function renderContentDialogEvolution(arrayEvolutionsData) {
    document.getElementById('pokemonDialogMainContentShow').innerHTML = " ";
    for (let i = 0; i < arrayEvolutionsData.length; i++) {
        document.getElementById('pokemonDialogMainContentShow').innerHTML += getTemplateEvolution(arrayEvolutionsData[i].name.charAt(0).toUpperCase() + arrayEvolutionsData[i].name.slice(1), arrayEvolutionsData[i].img);
    }
    document.getElementById('pokemonDialogMainContentShow').style = 'flex-direction: unset';
    // document.getElementById('dialog').style = 'width: 45%;';
}