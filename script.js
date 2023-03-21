
const typeApiUrl = "https://pokeapi.co/api/v2/type";
const abilityApiUrl = "https://pokeapi.co/api/v2/ability/";
//const searchApiUrl = `https://pokeapi.co/api/v2/pokemon/${searchText}`;
const apiUrlPokemons = 'https://pokeapi.co/api/v2/pokemon?limit=30&offset=0';
let secretPokemon = "pokemon"
const geuss_container = document.getElementById('geuss-container')
const secret_card = document.getElementById('secret_card');
const select = document.getElementById("mySelect");
const abilitySelect = document.getElementById("abilitySelect");
const weightSelect = document.getElementById('weightSelect');
const baseSelect = document.getElementById('baseSelect');
const typeSelect = document.getElementById("typeSelect");
const typeOptions = document.getElementById('type-button');
const abilityOptions = document.getElementById("ability-button");
const weightOptions = document.getElementById('weight-button');
const baseExperienceOptions = document.getElementById('base-experience-button');
const startButton = document.getElementById('start-button');
const startGame = document.getElementById('demo-button');
const searchImageGrid = document.getElementById('search_small_grid');
const cardContainer = document.getElementById('card_container');
let countDown = document.getElementById('countdown');
let pokemonies = [];
let types = [];
let abilitys = [];
let filteredList = [];
let pokemonsLeft = 30;



//do an api call to get all types




function getAbilitys() {


  for (let i = 0; i < pokemonies.length; i++) {
    const option = document.createElement("option");
    option.text = pokemonies[i].pokemonAbility
    abilitySelect.add(option);

  }
 

}

async function getTypes() {
  const response = await fetch(typeApiUrl);
  console.log(response);
  const data = await response.json();
  types = data.results;


  for (let i = 0; i < types.length; i++) {
    const option = document.createElement("option");
    option.text = types[i].name;
    typeSelect.add(option);

  }
}









typeOptions.addEventListener('click', e => {

  if (typeSelect.style.display === "none") {

    typeSelect.style.display = "block";
  } else {
    typeSelect.style.display = "none";
  }
})
typeSelect.addEventListener('change', e => {
  let currentSelection = typeSelect.options[typeSelect.selectedIndex].text

  filterPokemons('pokemonType', currentSelection);
  console.log(currentSelection);
})




//do api call to get all abilitys
abilityOptions.addEventListener('click', e => {
  console.log(abilityOptions.innerHTML)

  if (abilitySelect.style.display === "none") {

    abilitySelect.style.display = "block";
  } else {
    abilitySelect.style.display = "none";
  }
});
abilitySelect.addEventListener('change', e => {
  let currentSelection = abilitySelect.options[abilitySelect.selectedIndex].text

  console.log(currentSelection);
  filterPokemons('pokemonAbility', currentSelection);
})









startGame.addEventListener('click', async e => {
  cardContainer.innerHTML = '';
  type = [];
  abilitys = [];
  pokemonies = [];
  filteredList = [];
  secret_card.innerHTML = "";
  secret_card.innerText = "?";
 pokemonsLeft = 30;
 countDown.innerText = pokemonsLeft+ " pokemons left";


  getTypes();


  const response = await fetch(apiUrlPokemons);
  console.log(response);
  const data = await response.json();
  const pokemons = data.results;


  // geuss_container.display = "grid";


  for (let index = 0; index < pokemons.length; ++index) {
    const element = pokemons[index];
    const response = await fetch(element.url);
    const data = await response.json();


    pokemonies.push({
      pokemonType: data.types[0].type.name,
      pokemonName: data.name,
      pokemonHeight: data.height,
      pokemonAbility: data.abilities[0].ability.name,
      pokemonWeight: data.weight,
      pokemonImage: data.sprites.front_default,
      pokemonExperience: data.base_experience

    });




  }
  for (let index = 0; index < pokemonies.length; ++index) {
    getAbilitys();
    createPokemonCard(pokemonies[index])

  }

  secretPokemon = pokemonies[Math.floor(Math.random() * pokemonies.length)];
  console.log(secretPokemon);

})




const createPokemonCard = (pokemon) => {



  const cardElement = document.createElement('div');
  cardElement.classList = 'pokemonCard';
  cardContainer.appendChild(cardElement);


  const pokemonImage = document.createElement('img');
  pokemonImage.src = pokemon.pokemonImage;
  cardElement.appendChild(pokemonImage);

  const pokemonName = document.createElement('button');
  pokemonName.innerHTML = pokemon.pokemonName;
  pokemonName.classList = "nameButton";
  cardElement.appendChild(pokemonName);
  pokemonName.addEventListener('click', e => {
    if (pokemonName.innerText == secretPokemon.pokemonName) {
      console.log("you geussed right");
      cardContainer.innerHTML = "";
      secret_card.innerText = "";
      const winnerImage = document.createElement('img');
      winnerImage.src = secretPokemon.pokemonImage;
      secret_card.appendChild(winnerImage);
      countDown.innerText = "Yes its " + secretPokemon.pokemonName + "!!!";
    } else {
      console.log("your geussed wrong");
    }
  })

  const pokemonHeight = document.createElement('button');
  pokemonHeight.innerHTML = "height: " + pokemon.pokemonHeight;
  pokemonHeight.classList = "heightButton";
  cardElement.appendChild(pokemonHeight);


  const pokemonType = document.createElement('button');
  pokemonType.innerHTML = "type: " + pokemon.pokemonType;
  pokemonType.classList = 'typeButton';
  cardElement.appendChild(pokemonType);


  const pokemonAbility = document.createElement('button');
  pokemonAbility.innerHTML = "ability: " + pokemon.pokemonAbility;
  pokemonAbility.classList = "abilityButton";
  cardElement.appendChild(pokemonAbility);


  const pokemonExperience = document.createElement('button');
  pokemonExperience.innerHTML = "base experience: " + pokemon.pokemonExperience;
  cardElement.appendChild(pokemonExperience);


}



const updateUI = (list) => {
pokemonsLeft = list.length;

countDown.innerText= pokemonsLeft+" pokemons left";



  console.log("update ui körs ju", list);
  cardContainer.innerHTML = "";


  for (const pokemon of list) {
    createPokemonCard(pokemon);

  }
}


const filterPokemons = (genre, filter) => {
  console.log(genre, filter)
  filteredList = [];
  if (secretPokemon[genre] == filter) {
    console.log("secretPokemon does have this type")
    //it has, filter to keep pokemons with filter.

    for (const pokemon of pokemonies) {
      console.log(pokemonies)
      if (pokemon[genre] == filter) {
        filteredList.push(pokemon);

        pokemonies = [...filteredList];


      }
    }
    console.log("listan efter filter", pokemonies);
    updateUI(pokemonies);




  } else {
    console.log("secretPokemon does not have this type")

    for (const pokemon of pokemonies) {

      //take away all the pokemon that has this filter
      if (pokemon[genre] != filter) {
        filteredList.push(pokemon);
        pokemonies = [...filteredList];


      }
    }
    updateUI(pokemonies);
    console.log(pokemonies);

  }

}


