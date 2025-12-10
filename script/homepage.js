async function loadContentFunc() {                      // hauptfunktion zum laden der daten Homepage //
    loadingSpinner();                                   // lade spinner homepage(pokeball....) //
    await fetchData();                                  // fetch daten Homepage(...pokemons) //
    setTimeout(renderContentHomePage, 2000);            // nach verzögerung homepage rendern //
}

async function fetchData() {                       // fetch daten der homepage //
    let response = await fetch(BASE_URL + 'json');
    let responseToJson = await response.json();

    array = responseToJson.results;                      // array mit den namen und urls der pokemon //
    filterUrl(array)                ;                           // filtert nur die urls der pokemon für die homepage(20pokemons) //
    // await fetchPokemonEvolution();                               // fetch daten der pokemon evolutionen(nur für  die ersten 20 Pokemons Links) //
}

async function filterUrl(filterHomePageUrls) {                      // funktion filtert nur die urls der pokemon für die homepage aus const BASE_URL//
    let urls = filterHomePageUrls.map(element => element.url);          // nur die urls der pokemon in ein neues array //
    arrayUrls = urls;                                                   // array mit den urls der einzelnen pokemon //
    await fetchPokemonHomePageForSchleife();                                   // forschleife funktion für fetch data //
}

async function fetchPokemonHomePageForSchleife() {                // for schleife zum fetchen der daten der einzelnen pokemon //
    for (let i = 0; i < arrayUrls.length; i++) {                  // schleife durch alle urls //
        if (i === pokemonCounterAdd ) {                      // wenn i gleich variable(pokemonCounterAdd[20]), dann break //
            break;   
        }
        await fetchUrl(i)                                    // fetch daten der einzelnen pokemon //
    }
}

function loadingSpinner() {                                                          // funktion zum laden des spinners auf der homepage //
    document.getElementById('main-loader').style = 'align-content: center;';
    document.getElementById('content').innerHTML = getlopadingspinnerTemplate();        // lade spinner homepage //
    
}