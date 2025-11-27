const BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=40&offset=0';
const BASE_URL_EVOLUTION = 'https://pokeapi.co/api/v2/evolution-chain/';
let arrayUrls = [];
let pokemonsData = [];
let pokemonDataEvolution = [];
const arrayEvolutionCounter = 19;



async function loadContentFunc() {
    await fetchData();
    loadingSpinner();
}



async function fetchData() {
    let response = await fetch(BASE_URL + 'json');
    let responseToJson = await response.json();
    console.log(responseToJson);

    array = responseToJson.results;
    filterUrl(array)
    await fetchPokemonEvolution()
}



async function filterUrl(filterHomePageUrls) {
    let urls = filterHomePageUrls.map(element => element.url);
    arrayUrls = urls;
    await forRenderPokemonHomePage();
}



async function forRenderPokemonHomePage() {
    for (let i = 0; i < arrayUrls.length; i++) {
        await fetchUrl(i)
    }
    console.log(pokemonsData);
}



async function fetchUrl(i) {
    let response = await fetch(arrayUrls[i]);
    let responseToJson = await response.json();
    pokemonsData.push(responseToJson);

}



function loadingSpinner() {
    document.getElementById('main-loader').style = 'align-content: center;';
    document.getElementById('content').innerHTML = getlopadingspinnerTemplate();
    setTimeout(renderContentHomePage, 2000);
}



function renderContentHomePage() {
    document.getElementById('main-loader').style = ' ';
    document.getElementById('main-loader').style = 'height: 100%;';
    document.getElementById('content').innerHTML = " ";
    for (let i = 0; i < pokemonsData.length; i++) {
        document.getElementById('content').innerHTML += getTemplateHomePage(pokemonsData[i].name.charAt(0).toUpperCase() + pokemonsData[i].name.slice(1), pokemonsData[i].sprites.other.home.front_default, pokemonsData[i].id, pokemonsData[i].types[0].type.name, pokemonsData[i].types[1]?.type.name);
        if (i === 19) {
            document.getElementById('loadMoreContainer').innerHTML = getTemplateloadIcon(); //Pikachu Img button//
            break;
        }
    }
}



function loadMorePokemon() {
    document.getElementById('loadMoreContainer').innerHTML = " ";
    document.getElementById('loadMoreContainer').innerHTML = getButtonLoadMoreTemplate();   // loadingspinner//
    setTimeout(forLoadMorePokemon, 2000);                                                   // weitere 20 Pokemon nach verzögerung//
}



function forLoadMorePokemon() {
    document.getElementById('loadMoreContainer').innerHTML = " ";           // loadingspinner löschen //

    for (let i = 20; i < arrayUrls.length; i++) {                           // weitere 20 Pokemon render//
        document.getElementById('content').innerHTML += getTemplateHomePage(pokemonsData[i].name.charAt(0).toUpperCase() + pokemonsData[i].name.slice(1), pokemonsData[i].sprites.other.home.front_default, pokemonsData[i].id, pokemonsData[i].types[0].type.name, pokemonsData[i].types[1]?.type.name);
    }
    document.getElementById('loadMoreContainer').innerHTML += getButtonLoadLessTemplate();      //Pokeball Loadingspinner ohne animation//
}



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



function renderContentDialog(responseToJson) {
    document.getElementById('dialog').innerHTML = " ";
    document.getElementById('dialog').classList = " ";
    // document.getElementById('dialog').style = 'width: 35%;';
    document.getElementById('dialog').innerHTML = getTemplateDialogPokemon(pokemonsData[responseToJson].name.charAt(0).toUpperCase() + pokemonsData[responseToJson].name.slice(1), pokemonsData[responseToJson]);
    document.getElementById('dialog').classList.add(pokemonsData[responseToJson].types[0].type.name);
}



function closeShowPokemonDialog(event) {
    if (!event.target.contains(dialog)) return;
    dialog.close();
}



function showStats(id) {
    let idArray = id - 1;
    renderContentStats(idArray);
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



async function fetchPokemonEvolution() {
    for (let i = 1; i <= arrayEvolutionCounter; i++) {
        let response = await fetch('https://pokeapi.co/api/v2/evolution-chain/' + i);
        let responseToJson = await response.json();
        pokemonDataEvolution.push(responseToJson);
    }
    console.log(pokemonDataEvolution);
}



async function showEvolution(pokemonName) {
    for (let i = 0; i < pokemonDataEvolution.length; i++) {

        let pokemonNameEvolution = pokemonDataEvolution[i].chain.species.name;
        let evolvesTo = pokemonDataEvolution[i].chain.evolves_to[0].species.name;
        let evolvesToSecond = pokemonDataEvolution[i].chain.evolves_to[0]?.evolves_to[0]?.species.name;

        if (pokemonName == pokemonNameEvolution || pokemonName == evolvesTo || pokemonName == evolvesToSecond) {
            filterDataEvolution(pokemonNameEvolution, evolvesTo, evolvesToSecond);
            break;
        }
    }
}



function filterDataEvolution(pokemonNameEvolution, evolvesTo, evolvesToSecond) {
    let findPokemon = pokemonsData.find(element => element["name"] === pokemonNameEvolution);
    let arrayEvolutionsData = [{ name: findPokemon.name, img: findPokemon.sprites.other.showdown.front_default }];
    if (evolvesTo) {
        let findPokemon2 = pokemonsData.find(element => element["name"] === evolvesTo);
        arrayEvolutionsData.push({ name: findPokemon2.name, img: findPokemon2.sprites.other.showdown.front_default });
    }
    if (evolvesToSecond) {
        let findPokemon3 = pokemonsData.find(element => element["name"] === evolvesToSecond)
        arrayEvolutionsData.push({ name: findPokemon3.name, img: findPokemon3.sprites.other.showdown.front_default });
    }
    console.log(arrayEvolutionsData);
    renderContentDialogEvolution(arrayEvolutionsData);
}


function renderContentDialogEvolution(arrayEvolutionsData) {
    document.getElementById('pokemonDialogMainContentShow').innerHTML = " ";
    for (let i = 0; i < arrayEvolutionsData.length; i++) {
        document.getElementById('pokemonDialogMainContentShow').innerHTML += getTemplateEvolution(arrayEvolutionsData[i].name.charAt(0).toUpperCase() + arrayEvolutionsData[i].name.slice(1), arrayEvolutionsData[i].img);
    }
    document.getElementById('pokemonDialogMainContentShow').style = 'flex-direction: unset';
    // document.getElementById('dialog').style = 'width: 45%;';
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








