const searchButton = document.getElementById('search_button');
const searchGrid = document.getElementById('search_small_grid');




searchButton.addEventListener('click', async e=>{

    const searchText = document.getElementById('search').value;
    const searchLowerCase = searchText.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${searchLowerCase}`;

    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
   
const abilityName = data.abilities[0].ability.name

const urlAbilyt = `https://pokeapi.co/api/v2/ability/${abilityName}`;

const response2 = await fetch(urlAbilyt);
console.log(response2);
const data2 = await response2.json();
console.log(data2.effect_entries[1]);
createBigPokemonCard(data,data2);

})

const createBigPokemonCard = (pokemon,ability) =>{

    const searchCardElement = document.createElement('div');
    searchCardElement.classList = 'bigPokemonCard';
    searchGrid.appendChild(searchCardElement);
  
    const pokemonName = document.createElement('div');
   
    const hp = pokemon.stats[0].base_stat;
   
    pokemonName.innerHTML = pokemon.name +" " +hp ;
    pokemonName.classList = "nameDiv";
    searchCardElement.appendChild(pokemonName);

    const pokemonSmallImage = document.createElement('img');
    pokemonSmallImage.src = pokemon.sprites.front_default;
    pokemonSmallImage.classList ='smallerImage';
    searchCardElement.appendChild(pokemonSmallImage);


    const pokemonImage = document.createElement('img');
    pokemonImage.classList = 'shinyImage';
    pokemonImage.src = pokemon.sprites.front_shiny;
    searchCardElement.appendChild(pokemonImage);

    const heightAndWeight = document.createElement('p');
    heightAndWeight.classList = 'heightAndWeight';
    heightAndWeight.innerText = "type: " +pokemon.types[0].type.name + "  Pokemon.  "+ "height: " + pokemon.height +", weight: " + pokemon.weight+".";
    searchCardElement.appendChild(heightAndWeight);
    if(pokemon.types[0].type.name == "bug"|| pokemon.types[0].type.name == "grass" ){
       searchCardElement.style.backgroundImage = "linear-gradient(to right top, #237a23, #449827, #66b629, #8bd528, #b4f423)";
    }else if(pokemon.types[0].type.name == "psychic"){
       searchCardElement.style.backgroundImage  = "linear-gradient(to right top, #ebd7f6, #e2bff7, #d7a7f8, #ca8ffa, #bc77fb)";
    }else if(pokemon.types[0].type.name == "poison"){
        searchCardElement.style.backgroundImage = "linear-gradient(to right top, #3c2c59, #4d327a, #61379b, #773abc, #8f3ade)";
    }else if(pokemon.types[0].type.name == "water"){
        searchCardElement.style.backgroundImage = "linear-gradient(to right top, #c8d5f4, #adc6f4, #8fb7f3, #6aa9f3, #2c9cf2)";

    }

    const abilityDescription = document.createElement('p');
    abilityDescription.classList = 'muchText';
    abilityDescription.innerText = "ability: "+ pokemon.abilities[0].ability.name +"  "+ ability.effect_entries[1].effect;
    searchCardElement.appendChild(abilityDescription);

    const line = document.createElement('hr');
    line.classList = 'lines';
    searchCardElement.appendChild(line);
}