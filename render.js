function renderContentHomePage() {
    document.getElementById('main-loader').style = ' ';
    document.getElementById('main-loader').style = 'height: 100%;';
    document.getElementById('content').innerHTML = " ";
    for (let i = 0; i < pokemonsData.length; i++) {
        document.getElementById('content').innerHTML += getTemplateHomePage(pokemonsData[i].name.charAt(0).toUpperCase() + pokemonsData[i].name.slice(1), pokemonsData[i].sprites.other.home.front_default, pokemonsData[i].id, pokemonsData[i].types[0].type.name, pokemonsData[i].types[1]?.type.name);
        if (i === pokemonCounterAdd - 1) {
            document.getElementById('loadMoreContainer').innerHTML = getTemplateloadIcon(i); //Pikachu Img button//
            break;
        }
    }
}