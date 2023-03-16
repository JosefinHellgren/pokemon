const searchApiUrl = 'https://pokeapi.co/api/v2/pokemon/';
const apiUrlPokemons = 'https://pokeapi.co/api/v2/pokemon?limit=30&offset=0';
let secretPokemon = "pokemon"

const secret_card = document.getElementById('secret_card');
secret_card.style.display = "none";

//pokemon/1-20, läsa ner 20 stycken.
const startButton = document.getElementById('start-button');
const demobutton = document.getElementById('demo-button');




demobutton.addEventListener('click',async e =>{
    const response = await fetch(apiUrlPokemons);
    console.log(response);
    const data = await response.json();
    const pokemons = data.results;

    whosThere();
    


 


 secret_card.style.display ="block";
   for (let index = 0; index < pokemons.length; ++index) {
    const element = pokemons[index];
   const response = await fetch(element.url);
   const data = await response.json();

   createPokemonCard(data);


    //sort pokemon if the circumstance is reached or not.
    //if user press button with "grass":
    //if the secret pokemon has the grass type then all pokemons without the grass types disapear.
        //sort by pressing the buttons, when press height eller weight dropdown comes up or down. higher or lower?
}



})

async function  whosThere(){
   
    const randomIndex = Math.floor( Math.random() * 30 + 1);
    const url = `https://pokeapi.co/api/v2/pokemon/${randomIndex}`;

    const response = await fetch(url);
    const data = await  response.json();

    console.log(data.name, data.height, data.weight);

    secretPokemon = data;
    return secretPokemon;



}




startButton.addEventListener('click', async e=>{
    const searchText = document.getElementById('search').value;
    const url = `https://pokeapi.co/api/v2/pokemon/${searchText}`;

    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
   console.log(data);

   createPokemonCard(data);
    

})






const createPokemonCard = (pokemon) =>{

        
    const hiddenCard = document.getElementById('hidden-card');
        const cardElement = document.createElement('div');
        cardElement.classList = 'pokemonCard';
        hiddenCard.appendChild(cardElement);

        const pokemonImage = document.createElement('img');
        pokemonImage.src = pokemon.sprites.front_default;
        cardElement.appendChild(pokemonImage);
       
        const pokemonName = document.createElement('button');
        pokemonName.innerHTML =pokemon.name;
        pokemonName.classList = "nameButton";
        cardElement.appendChild(pokemonName);
       
        pokemonName.addEventListener('click', e =>{
         console.log(pokemonName.innerHTML);
         if (pokemonName.innerHTML == secretPokemon.name){
            secret_card.style.innerText = "";
            const winnerpicture = document.createElement('img');
            winnerpicture.src = secretPokemon.sprites.front_default;
            secret_card.appendChild(winnerpicture);
            
                console.log("omg dom är samma du vinner!!");
               

         }else{
            console.log("names are not the same  " + pokemonName.innerHTML + secretPokemon.name);
         }
     })

        const pokemonHeight = document.createElement('button');
        pokemonHeight.innerHTML = "height: " + pokemon.height;
        pokemonHeight.classList = "heightButton";
        cardElement.appendChild(pokemonHeight);


        const pokemonType = document.createElement('button');
        pokemonType.innerHTML = "type: " + pokemon.types[0].type.name;
        pokemonType.classList = 'typeButton';
        cardElement.appendChild(pokemonType);
        pokemonType.addEventListener('click', e=>{
            if(pokemonType.innerHTML == "type: " + secretPokemon.types[0].type.name){
                console.log("yes");
                alert("JA! samma typ!");
            }else{
                alert("Nej.")
                console.log("Nej");
            }
        })

        const pokemonAbility = document.createElement('button');
        pokemonAbility.innerHTML = "ability: "+ pokemon.abilities[0].ability.name;
        pokemonAbility.classList = "abilityButton";
        cardElement.appendChild(pokemonAbility);
        pokemonAbility.addEventListener('click', e=>{
            if(pokemonAbility.innerHTML == "ability: " + secretPokemon.abilities[0].ability.name){
                console.log("yes");
                alert("JA! samma ability!");
            }else{
                alert("Nej!");
            }
        })

        const pokemonExperience = document.createElement('button');
        pokemonExperience.innerHTML = "base experience: "+ pokemon.base_experience;
        cardElement.appendChild(pokemonExperience);

   

    


  

}



