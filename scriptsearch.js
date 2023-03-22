const searchButton = document.getElementById('search_button');
const searchGrid = document.getElementById('search_small_grid');




searchButton.addEventListener('click', async e=>{

    const searchText = document.getElementById('search').value;
    const searchLowerCase = searchText.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${searchLowerCase}`;

    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
   

console.log(data);




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
    pokemonName.innerHTML = pokemon.name +" " + pokemon.base_experience;
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

    const abilityDescription = document.createElement('p');
    abilityDescription.classList = 'muchText';
    abilityDescription.innerText = "ability: "+ pokemon.abilities[0].ability.name +"  "+ ability.effect_entries[1].effect;
    searchCardElement.appendChild(abilityDescription);

    const line = document.createElement('hr');
    line.classList = 'lines';
    searchCardElement.appendChild(line);

   






}