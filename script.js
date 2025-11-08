const BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=40&offset=0';
let arrayUrls = [];






function loadContentFunc() {
    fetchData();
}


async function fetchData() {
    let response = await fetch(BASE_URL + 'json');
    let responseToJson = await response.json();
    console.log(responseToJson);

    array = responseToJson.results;
    filterUrl(array)
}


function filterUrl(filterHomePageUrls) {
    let urls = filterHomePageUrls.map(element => element.url);
    arrayUrls = urls;
    forRenderPokemonHomePage();
}


function forRenderPokemonHomePage() {
    for (let i = 0; i < arrayUrls.length; i++) {
        fetchUrl(i);
    }
}

async function fetchUrl(i) {
    let response = await fetch(arrayUrls[i]);
    let responseToJson = await response.json();
    renderContentHomePage(responseToJson);
}

function renderContentHomePage(PokemonUrl) {
    document.getElementById('content').innerHTML += getTemplateHomePage(PokemonUrl.name.charAt(0).toUpperCase() + PokemonUrl.name.slice(1), PokemonUrl.sprites.other.home.front_default, PokemonUrl.id, PokemonUrl.types[0].type.name);
}


function dialogShowPokemon(pokemonNummer) {
    fetchUrlDialog(pokemonNummer);
    dialog.showModal();    
}


async function fetchUrlDialog(pokemonNummer) {
    let response = await fetch(arrayUrls[pokemonNummer - 1]);
    let responseToJson = await response.json();
    renderContentDialog(responseToJson);
}


function renderContentDialog(responseToJson) {
    document.getElementById('dialog').innerHTML = " ";
    document.getElementById('dialog').classList = " ";
    document.getElementById('dialog').innerHTML = getTemplateDialogPokemon(responseToJson.name.charAt(0).toUpperCase() + responseToJson.name.slice(1), responseToJson);
    document.getElementById('dialog').classList.add(responseToJson.types[0].type.name);
}


function closeShowPokemonDialog(event) {
    if (!event.target.contains(dialog)) return;
  dialog.close();
}


function showStats(id) {
   let idArray = id - 1;
    fetchUrlStats(idArray);
}


async function fetchUrlStats(idArray) {
    let response = await fetch(arrayUrls[idArray]);
    let responseToJson = await response.json();
    renderContentStats(responseToJson);
}


function renderContentStats(responseToJson) {
    
    document.getElementById('pokemonDialogMainContentShow').innerHTML = " ";
    document.getElementById('pokemonDialogMainContentShow').innerHTML = getTemplateStats(responseToJson);
   
}









