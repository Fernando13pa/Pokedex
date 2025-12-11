let arrayUrls = [];                                                 // array mit den urls der einzelnen pokemon //
let array = [];                                                     // array mit den namen und urls der pokemon // 
let pokemonsData = [];                                          // array mit den daten der einzelnen pokemon //

let pokemonDataEvolution = [];                                  // array mit den daten der einzelnen pokemon evolutionen //
const arrayEvolutionCounter = 549;                           // anzahl der evolutionen im pokeapi //
let pokemonCounterAdd = 20;                                 // anfangsanzahl der pokemon die geladen werden //
let arrayEvolutionsData = [];


async function loadMorePokemon() {                                          // funktion load more pokemon (icon Pikachu) //
    document.getElementById('loadMoreContainer').innerHTML = " ";
    document.getElementById('loadMoreContainer').innerHTML = getButtonLoadMoreTemplate();   // loadingspinner drehen//
    await forMoreDataPokemon();                                               // fetch daten der einzelnen pokemon für load more bzw mehrere pokemons laden //
    setTimeout(forLoadMorePokemon, 3000);                                                   // weitere  Pokemon nach verzögerung//

}

async function forMoreDataPokemon() {                   // for schleife zum fetchen der daten der einzelnen pokemon für load more bzw mehrere pokemons laden //
    for (let i = pokemonCounterAdd; i < arrayUrls.length; i++) {                  // schleife durch alle urls ab der variable pokemonCounterAdd [wird zuerst erhöht *2] //
        if (i === (pokemonCounterAdd * 2)) {                                     // wenn i gleich variable(pokemonCounterAdd[20] * 2 = 40), dann break //
            break;
        } else {
            await fetchUrl(i)
        }
        if (i === 999) {
            console.log(999);
            break;  
        }
    }
}

function forLoadMorePokemon() {

    document.getElementById('loadMoreContainer').innerHTML = " ";           // loadingspinner löschen //
    for (let i = pokemonCounterAdd; i < arrayUrls.length; i++) {                           // weitere  Pokemon render//
        document.getElementById('content').innerHTML += getTemplateHomePage(pokemonsData[i].name.charAt(0).toUpperCase() + pokemonsData[i].name.slice(1), pokemonsData[i].sprites.other.home.front_default, pokemonsData[i].id, pokemonsData[i].types[0].type.name, pokemonsData[i].types[1]?.type.name);
        if (i === (pokemonCounterAdd * 2 - 1)) {
            document.getElementById('loadMoreContainer').innerHTML = getTemplateloadIcon();         //Pikachu Img button hinzufügen//
            pokemonCounterAdd = pokemonCounterAdd * 2;                                          // variable pokemonCounterAdd verdoppeln //
            break;
        }
        if (i > 998) {
            pokemonCounterAdd = 1000;
            document.getElementById('loadMoreContainer').innerHTML += getButtonLoadLessTemplate();      //Pokeball Loadingspinner ohne animation//
            break;
        }
    }
}

///////////////////////                                                                              /////////////////////////////////////////////

function animation() {
    document.getElementById('loadLessSpinner').style = "animation: spin 1s linear infinite;";     //Pokeball animation (drehen) add//
    setTimeout(reloadPage, 2000);                       // nach verzögerung Seite wiederladen//
}

function reloadPage() {
    // location.reload();
    window.location.reload(true);     //seite wiederladen//
}

function dialogShowPokemon(pokemonNummer) {
    renderContentDialog(pokemonNummer - 1)
    dialog.showModal();
}

function closeShowPokemonDialog(event) {
    if (!event.target.contains(dialog)) return;
    dialog.close();
    // pokemonDataEvolution = [];
}

function closeAlbum() {
    dialog.close();
    // pokemonDataEvolution = [];
}

function showStats(id) {
    let idArray = id - 1;
    renderContentStats(idArray);
}

/////////////////////////                                                                              /////////////////////////////////////////////

function searchPokemon() {
    let input = document.getElementById('searchBar').value.toLowerCase();
    if (input === "") {
        renderContentHomePage()
        return;
    } else if (input.length > 2) {
        foundPokemon(input);
    }
    input.value = " ";
    document.getElementById('loadMoreContainer').innerHTML = " ";
}

function foundPokemon(input) {
    document.getElementById('content').innerHTML = " ";
    for (let i = 0; i < pokemonsData.length; i++) {
        if (pokemonsData[i].name.toLowerCase().includes(input)) {
            document.getElementById('content').innerHTML += getTemplateHomePage(pokemonsData[i].name.charAt(0).toUpperCase() + pokemonsData[i].name.slice(1), pokemonsData[i].sprites.other.home.front_default, pokemonsData[i].id, pokemonsData[i].types[0].type.name);
            input.value = " ";
        } else if (!pokemonsData[i].name.toLowerCase().includes(input) && i === pokemonsData.length - 1 && document.getElementById('content').innerHTML === " ") {
            document.getElementById('content').innerHTML = `<h2 class="noResults"> No results found for "${input}" </h2>`;
            input.value = " ";
        }
        document.getElementById('main-loader').style = 'height: 100vh;';
        input.value = " ";
    }
}

function scrollenPrevious(id, EvolutionUrl) {
    if (id === 1) {

    } else {
        renderContentDialog(id - 2)
         fetchPokemonEvolutionData(EvolutionUrl);
    }

}

function scrollenNext(id, EvolutionUrl) {
    if (id > pokemonCounterAdd - 1) {

    } else {
        renderContentDialog(id)
         fetchPokemonEvolutionData(EvolutionUrl);
    }
}









