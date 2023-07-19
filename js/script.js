// DECLARAÇÃO DE VARIÁVEIS
const iniciar = document.querySelector(".start");
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;


// Perguntas
const questions = [
    {
      "question": "PHP foi desenvolvido para qual fim?",
      "answers": [
        {
          "answer": "back-end",
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Sistema operacional",
          "correct": false
        },
        {
          "answer": "Banco de dados",
          "correct": false
        },
      ]
    },
    {
      "question": "Uma forma de declarar variável em JavaScript:",
      "answers": [
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual o seletor de id no CSS?",
      "answers": [
        {
          "answer": "#",
          "correct": true
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
      ]
    },
    {
      "question": "Em HTML, qual separador de linhas",
      "answers": [
        {
          "answer": "<br>",
          "correct": true
        },
        {
          "answer": "<p>",
          "correct": false
        },
        {
          "answer": "<b>",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
      ]
    },

]

// BOTÃO INICIAR
iniciar.addEventListener("click",function init(){
  quizzContainer.classList.remove("hide");
  //criar a primeira pergunta
  createQuestion(0);
  iniciar.classList.add("hide");

})


//Cria uma pergunta
function createQuestion(i){
    // Limpar a questão anterior
    const oldButtons = answersBox.querySelectorAll("button");

    oldButtons.forEach(function(btn){
        btn.remove();
    });
    //Alterar o texto da pergunta
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    //Insere as alternativas
    questions[i].answers.forEach(function(answer,i){

        //Cria o template do botão do quizz
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        //Remover hide e template class
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");

        //inserir as alternativas na tela
        answersBox.appendChild(answerTemplate);

        // Inserir um evento de click no botão
        answerTemplate.addEventListener("click", function(){
            checkAnswer(this)
        });      
        
    });
    // Incrementar o número da questão
    actualQuestion++;
    

}

// Verificando resposta do usuário
function checkAnswer(btn){
    //Seleciona todos os botões da div answersBox
    const buttons = answersBox.querySelectorAll("button");

    //verifica se a resposta está correta e adiciona classes nos botões
    buttons.forEach(function(button){

        if(button.getAttribute("correct-answer") === "true"){

            button.classList.add("correct-answer");

            //checa se o usuário acertou a pergunta
            if(btn == button ){
                //incremento dos pontos
                points++;
            }

        }else{
            button.classList.add("wrong-answer");

        }

    });

 //Exibir prox pergunta
 nextQuestion();

}
//Exibe a próxima pergunta no quizz
function nextQuestion(){

    //timer para usuário ver as respostas
    setTimeout(function(){

        //verifica se ainda há perguntas 
        if(actualQuestion >= questions.length){
            //apresentar a msg de sucesso
            showSuccessMessage();
            return;

        }      

        createQuestion(actualQuestion);


    },1500);
}

//Exibe a tela final
function showSuccessMessage(){

    hideOrShowQuizz();

    //trocar dados da tela de sucesso

    //calcular o score
    const score = ((points / questions.length) * 100).toFixed(2);

    const displayScore = document.querySelector("#display-score span");

    displayScore.textContent = score.toString();

    // alterar o número de perguntas corretas
    const correctAnswers = document.querySelector("#correct-answers");
    correctAnswers.textContent = points;

    //alterar o total de perguntas
    const totalQuestion = document.querySelector("#questions-qty");

    totalQuestion.textContent = questions.length;

    const mensagem = document.querySelector("#felicitacoes");

    // Mensagem para cada pontuação;
    if(score <= 33.33){
      mensagem.innerHTML = "Tente Novamente!";
     
    }else{
      mensagem.innerHTML= "Parabéns!";
      
    }



}
// Mostra ou esconde o score
function hideOrShowQuizz(){
    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
}

//Restart Quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function(){
    //zerar o jogo
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    createQuestion(0);
    // init();
})



//Inicialização do Quizz
// init();