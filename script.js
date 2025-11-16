const BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=40&offset=0';
let arrayUrls = [];
const arrayEvolutionCounter = 19;



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


async function forRenderPokemonHomePage() {
    for (let i = 0; i < arrayUrls.length; i++) {
        await fetchUrl(i);
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
    let stats = responseToJson.stats.map(element => element);
    document.getElementById('pokemonDialogMainContentShow').innerHTML = " ";
    document.getElementById('pokemonDialogMainContentShow').style = 'flex-direction: ';

    for (let i = 0; i < stats.length; i++) {
        document.getElementById('pokemonDialogMainContentShow').innerHTML += getTemplateStats(stats[i], responseToJson);
    }
}


async function showEvolution(pokemonName) {
    for (let i = 1; i <= arrayEvolutionCounter; i++) {

        let response = await fetch('https://pokeapi.co/api/v2/evolution-chain/' + i);
        let responseToJson = await response.json();
        let pokemonNameEvolution = responseToJson.chain.species.name;
        let evolvesTo = responseToJson.chain.evolves_to[0].species.name;
        let evolvesToSecond = responseToJson.chain.evolves_to[0]?.evolves_to[0]?.species.name;

        if (pokemonName == pokemonNameEvolution || pokemonName == evolvesTo || pokemonName == evolvesToSecond) {
            await fetchUrlEvolutionPokemon(pokemonNameEvolution, evolvesTo, evolvesToSecond);
            break;
        }
    }
}



async function fetchUrlEvolutionPokemon(pokemonNameEvolution, evolvesTo, evolvesToSecond) {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonNameEvolution);
    let responseToJson = await response.json();


    let arrayEvolutionsData = [{ name: pokemonNameEvolution, img: responseToJson.sprites.other.showdown.front_default }];

    if (evolvesTo) {
        let responseEvolvesTo = await fetch('https://pokeapi.co/api/v2/pokemon/' + evolvesTo);
        let responseToJsonEvolvesTo = await responseEvolvesTo.json();
        arrayEvolutionsData.push({ name: evolvesTo, img: responseToJsonEvolvesTo.sprites.other.showdown.front_default });
    }
    if (evolvesToSecond) {
        let responseEvolvesToSecond = await fetch('https://pokeapi.co/api/v2/pokemon/' + evolvesToSecond);
        let responseToJsonEvolvesToSecond = await responseEvolvesToSecond.json();
        arrayEvolutionsData.push({ name: evolvesToSecond, img: responseToJsonEvolvesToSecond.sprites.other.showdown.front_default });
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
}








