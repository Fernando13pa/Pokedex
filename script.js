const BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=40&offset=0';
let arrayUrls = [];
const arrayEvolutionCounter = 19;



async function loadContentFunc() {
    await fetchData();
    loadingSpinner();
}


function loadingSpinner() {
    document.getElementById('main-loader').style = 'align-content: center;';
    document.getElementById('content').innerHTML = getlopadingspinnerTemplate();
    setTimeout(forRenderPokemonHomePage, 2000);
}


function searchPokemon() {
    let input = document.getElementById('searchBar').value.toLowerCase();
    if (input === "") {
        forRenderPokemonHomePage();
        return;
    } else if (input.length > 2) {
        document.getElementById('content').innerHTML = " ";
        for (let i = 0; i < arrayUrls.length; i++) {
            fetch(arrayUrls[i])
                .then(response => response.json())
                .then(function (pokemon) {
                    if (pokemon.name.toLowerCase().includes(input)) {
                        document.getElementById('content').innerHTML += getTemplateHomePage(pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1), pokemon.sprites.other.home.front_default, pokemon.id, pokemon.types[0].type.name);
                        input.value = " ";
                    } else if (!pokemon.name.toLowerCase().includes(input) && i === arrayUrls.length - 1 && document.getElementById('content').innerHTML === " ") {
                        document.getElementById('content').innerHTML = `<h2 class="noResults"> No results found for "${input}" </h2>`;
                        input.value = " ";
                    }
                });
            document.getElementById('main-loader').style = 'height: 100vh;';
            input.value = " ";
        }
    }
    input.value = " ";
    document.getElementById('loadMoreContainer').innerHTML = " ";

}


async function fetchData() {
    let response = await fetch(BASE_URL + 'json');
    let responseToJson = await response.json();
    console.log(responseToJson);

    array = responseToJson.results;
    await filterUrl(array)
}


async function filterUrl(filterHomePageUrls) {
    let urls = filterHomePageUrls.map(element => element.url);
    arrayUrls = urls;


}


async function forRenderPokemonHomePage() {
    document.getElementById('main-loader').style = ' ';
    document.getElementById('main-loader').style = 'height: 100%;';
    document.getElementById('content').innerHTML = " ";
    for (let i = 0; i < arrayUrls.length; i++) {
        await fetchUrl(i);
        if (i === 19) {
            document.getElementById('loadMoreContainer').innerHTML = getTemplateloadIcon();
            break;
        }
    }
}


async function loadMorePokemon() {
    document.getElementById('loadMoreContainer').innerHTML = " ";
    document.getElementById('loadMoreContainer').innerHTML = getButtonLoadMoreTemplate();
    setTimeout(forLoadMorePokemon, 2000);
}


async function forLoadMorePokemon() {
    document.getElementById('loadMoreContainer').innerHTML = " ";

    for (let i = 20; i < arrayUrls.length; i++) {
        await fetchUrl(i);
    }
    document.getElementById('content').innerHTML += getButtonLoadLessTemplate();
}


function animation() {
    document.getElementById('loadLessSpinner').style = "animation: spin 1s linear infinite;";
    setTimeout(reloadPage, 2000);
}


function reloadPage() {
    location.reload();
}


async function fetchUrl(i) {
    let response = await fetch(arrayUrls[i]);
    let responseToJson = await response.json();
    await renderContentHomePage(responseToJson);
}


async function renderContentHomePage(PokemonUrl) {

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
    document.getElementById('dialog').style = 'width: 35%;';
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
    document.getElementById('dialog').style = 'width: 35%;';
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
    renderContentDialogEvolution(arrayEvolutionsData);
}


function renderContentDialogEvolution(arrayEvolutionsData) {
    document.getElementById('pokemonDialogMainContentShow').innerHTML = " ";
    for (let i = 0; i < arrayEvolutionsData.length; i++) {
        document.getElementById('pokemonDialogMainContentShow').innerHTML += getTemplateEvolution(arrayEvolutionsData[i].name.charAt(0).toUpperCase() + arrayEvolutionsData[i].name.slice(1), arrayEvolutionsData[i].img);
    }

    document.getElementById('pokemonDialogMainContentShow').style = 'flex-direction: unset';
    document.getElementById('dialog').style = 'width: 45%;';
}








