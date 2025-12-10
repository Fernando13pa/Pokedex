
async function fetchUrl(i) {                             // fetch daten der einzelnen pokemon //
    let response = await fetch(arrayUrls[i]);
    let responseToJson = await response.json();
    pokemonsData.push(responseToJson);                  // daten der einzelnen pokemon in pokemonsData array pushen //
    
}

// async function fetchPokemonEvolution() {                // fetch daten der pokemon evolutionen nur load HomePage//
//     for (let i = 1; i <= pokemonCounterAdd; i++) {                  // schleife durch die anzahl der evolutionen im pokeapi (abhängig vom pokemonCounterAdd[wecher Wert])//
//         let response = await fetch('https://pokeapi.co/api/v2/evolution-chain/' + i);
//         let responseToJson = await response.json();
//         pokemonDataEvolution.push(responseToJson);                     //  pokemon evolutionen daten  in pokemonDataEvolution array pushen //
//     }
// }