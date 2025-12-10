async function fetchPokemonEvolutionData(pokemonSpeciesUrl) {
    let response = await fetch(pokemonSpeciesUrl);
    let responseToJson = await response.json();
    let evolutionChainUrl = responseToJson.evolution_chain.url;

    let responseEvolution = await fetch(evolutionChainUrl);
    let responseToJsonEvolution = await responseEvolution.json();
    filterEvolutionData(responseToJsonEvolution);


}

function filterEvolutionData(evolution_chain) {
    if (pokemonDataEvolution.some(evolution => evolution.id === evolution_chain.id)) {
        return; // Evolution chain already exists, do not add it again
    } else {
        pokemonDataEvolution.push(evolution_chain);                     //  pokemon evolutionen daten  in pokemonDataEvolution array pushen //
    }
    // console.log(pokemonDataEvolution);
}

async function showEvolution(pokemonName) {
    for (let i = 0; i < pokemonDataEvolution.length; i++) {

        let pokemonNameEvolution = pokemonDataEvolution[i].chain.species.name;
        let evolvesTo = pokemonDataEvolution[i].chain.evolves_to[0]?.species.name;
        let evolvesToSecond = pokemonDataEvolution[i].chain.evolves_to[0]?.evolves_to[0]?.species.name;

        if (pokemonName == pokemonNameEvolution || pokemonName == evolvesTo || pokemonName == evolvesToSecond) {
            filterDataEvolution(pokemonNameEvolution, evolvesTo, evolvesToSecond);
            // console.log(pokemonNameEvolution, evolvesTo, evolvesToSecond);
            break;
        }
    }
}

function filterDataEvolution(pokemonNameEvolution, evolvesTo, evolvesToSecond) {
    if (pokemonNameEvolution) {
        Evolution(pokemonNameEvolution);
    }
    if (evolvesTo) {
        pokemonEvolvesTo(evolvesTo);
    }
    if (evolvesToSecond) {
        pokemonEvolvesToSecond(evolvesToSecond);
    }
    renderContentDialogEvolution(arrayEvolutionsData);
    arrayEvolutionsData = [];
}

function Evolution(pokemonNameEvolution) {
    let findPokemon = pokemonsData.find(element => element["name"] === pokemonNameEvolution);

    if (findPokemon === undefined) {
    } else {
        arrayEvolutionsData = [{ name: findPokemon.name, img: findPokemon.sprites.other.showdown.front_default }];
    }

}

function pokemonEvolvesTo(evolvesTo) {
    let findPokemon2 = pokemonsData.find(element => element["name"] === evolvesTo);

    if (findPokemon2 === undefined) {
    } else {
        arrayEvolutionsData.push({ name: findPokemon2.name, img: findPokemon2.sprites.other.showdown.front_default });
    }
}

function pokemonEvolvesToSecond(evolvesToSecond) {
    let findPokemon3 = pokemonsData.find(element => element["name"] === evolvesToSecond);
    
    if (findPokemon3 === undefined) {
    }else {
        arrayEvolutionsData.push({ name: findPokemon3.name, img: findPokemon3.sprites.other.showdown.front_default });
    }
}
