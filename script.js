let arrayUrls = [];                                                 // array mit den urls der einzelnen pokemon //
let array = [];                                                     // array mit den namen und urls der pokemon // 
let pokemonsData = [];                                          // array mit den daten der einzelnen pokemon //

let pokemonDataEvolution = [];                                  // array mit den daten der einzelnen pokemon evolutionen //
const arrayEvolutionCounter = 549;                           // anzahl der evolutionen im pokeapi //
let pokemonCounterAdd = 20;                                 // anfangsanzahl der pokemon die geladen werden //


function loadMorePokemon() {                                          // funktion load more pokemon (icon Pikachu) //
    document.getElementById('loadMoreContainer').innerHTML = " ";
    document.getElementById('loadMoreContainer').innerHTML = getButtonLoadMoreTemplate();   // loadingspinner drehen//
    forMoreDataPokemon();                                               // fetch daten der einzelnen pokemon für load more bzw mehrere pokemons laden //
    setTimeout(forLoadMorePokemon, 3000);                                                   // weitere  Pokemon nach verzögerung//

}

async function forMoreDataPokemon() {                   // for schleife zum fetchen der daten der einzelnen pokemon für load more bzw mehrere pokemons laden //
    for (let i = pokemonCounterAdd; i < arrayUrls.length; i++) {                  // schleife durch alle urls ab der variable pokemonCounterAdd [wird zuerst erhöht *2] //
        if (i === (pokemonCounterAdd * 2)) {                                     // wenn i gleich variable(pokemonCounterAdd[20] * 2 = 40), dann break //
            break;

        } else {
            await fetchUrl(i)
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
        else if (i === 1000) {
            document.getElementById('loadMoreContainer').innerHTML += getButtonLoadLessTemplate();      //Pokeball Loadingspinner ohne animation//
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
}

function closeAlbum() {
    dialog.close();
}

function showStats(id) {
    let idArray = id - 1;
    renderContentStats(idArray);
}

/////////////////////////                                                                              /////////////////////////////////////////////

async function showEvolution(pokemonName) {
    for (let i = 0; i < pokemonDataEvolution.length; i++) {

        let pokemonNameEvolution = pokemonDataEvolution[i].chain.species.name;
        let evolvesTo = pokemonDataEvolution[i].chain.evolves_to[0]?.species.name;
        let evolvesToSecond = pokemonDataEvolution[i].chain.evolves_to[0]?.evolves_to[0]?.species.name;

        if (pokemonName == pokemonNameEvolution || pokemonName == evolvesTo || pokemonName == evolvesToSecond) {
            filterDataEvolution(pokemonNameEvolution, evolvesTo, evolvesToSecond);
            break;
        }
    }
    await forMorePokemonEvo()
}

async function forMorePokemonEvo() {
    for (let i = pokemonDataEvolution.length; i < arrayEvolutionCounter; i++) {
        if (pokemonDataEvolution.length ===  pokemonsData.length)  {
            break;
        }
        else if (i === arrayEvolutionCounter) {
            break;
        } else {
            let response = await fetch('https://pokeapi.co/api/v2/evolution-chain/' + i);
            let responseToJson = await response.json();
            pokemonDataEvolution.push(responseToJson);
        }
    }

}

function filterDataEvolution(pokemonNameEvolution, evolvesTo, evolvesToSecond) {
    let arrayEvolutionsData = [];
    if (pokemonNameEvolution) {
        let findPokemon = pokemonsData.find(element => element["name"] === pokemonNameEvolution);
        arrayEvolutionsData = [{ name: findPokemon.name, img: findPokemon.sprites.other.showdown.front_default }];
    }
    if (evolvesTo) {
        let findPokemon2 = pokemonsData.find(element => element["name"] === evolvesTo);
        arrayEvolutionsData.push({ name: findPokemon2.name, img: findPokemon2.sprites.other.showdown.front_default });
    }
    if (evolvesToSecond) {
        let findPokemon3 = pokemonsData.find(element => element["name"] === evolvesToSecond)
        arrayEvolutionsData.push({ name: findPokemon3.name, img: findPokemon3.sprites.other.showdown.front_default });
    }

    renderContentDialogEvolution(arrayEvolutionsData);
}

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

function scrollenPrevious(id) {
    if (id === 1) {

    } else {
        renderContentDialog(id - 2)
    }

}

function scrollenNext(id) {
    if (id > pokemonCounterAdd - 1) {

    } else {
        renderContentDialog(id)
    }
}









