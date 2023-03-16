const baseUrl = 'https://opentdb.com/api.php'
const addTo = '?amount=10&difficulty=easy'

const fetchButton = document.getElementById('fetch')

fetchButton.addEventListener('click', async e => {
const category = '11';
const amount = '10';
const difficulty = 'easy'

//const api = `${baseUrl}?amount=${amount}&difficulty=${difficulty}`

const params = new URLSearchParams({
    amount: amount,
    difficulty: difficulty
})

const api = `${baseUrl}?${params}`



   console.log('click');
   const response = await fetch(api);
   console.log('2.got response', response);

   const data = await response.json();
   console.log('3.got data:', data);
   const allQuestions = data.results;
 createQuestions(allQuestions);



})

const createQuestions = (questions) =>{
    const questionsContainer = document.getElementById('questions');
    questions.forEach( q => {
        const questionsElement = createQuestionElement(q);
        questionsContainer.appendChild(questionsElement);
    });
}

const createQuestionElement = (question) =>{

    const questionsElement = document.createElement('div');
    questionsElement.className = 'question';

    const questionHeading = document.createElement('h2');
    questionHeading.innerHTML = question.question;
    questionsElement.appendChild(questionHeading);
    //lägger in alla svaren i en array genom att skriva ...
   // let options = [...question.incorrect_answers,question.correct_answer];

    //vi vil shuffla listan eftersom rätta svaret justnu alltid är sist
    const options = question.incorrect_answers;
    const randomIndex = Math.floor( Math.random() * options.length + 1);
    options.splice(randomIndex, 0, question.correct_answer);

    options.forEach(option =>{
        const optionElement = createOptionElement(option , question.correct_answer);
        questionsElement.appendChild(optionElement);

    })

    return questionsElement
}

const createOptionElement = (option , correct_answer) => {
    const optionElement = document.createElement('div');
    optionElement.className = 'option';
    optionElement.innerHTML = option;
    optionElement.addEventListener('click', e=>{
        console.log('du valde '+ option);

        if(option == correct_answer){
            console.log('right answer');
            optionElement.classList.add('correct-answer');
        }else{
            console.log('fel');
            optionElement.classList.add('wrong-answer');
        }
    })

return optionElement
}
