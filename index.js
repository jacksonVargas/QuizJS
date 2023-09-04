const questions = [
  {
    question: 'Qual a capital do Brasil?',
    responses: [
      { text: 'Rio de Janeiro', correct: false },
      { text: 'Porto Alegre', correct: false },
      { text: 'São Paulo', correct: false },
      { text: 'Brasília', correct: true },
    ]
  },

  {
    question: 'Qual a capital do Rio Grande do Sul?',
    responses: [
      { text: 'Gramado', correct: false },
      { text: 'Porto Alegre', correct: true },
      { text: 'Santa Catarina', correct: false },
      { text: 'Passo Fundo', correct: false },
    ]
  },

  {
    question: 'Qual a capital de Sergipe',
    responses: [
      { text: 'Palmas', correct: false },
      { text: 'Tocantins', correct: false },
      { text: 'Minas Gerais', correct: false },
      { text: 'Aracaju', correct: true },
    ]
  },

  {
    question: 'Qual a capital de Rondonia',
    responses: [
      { text: 'Palmas', correct: false },
      { text: 'Porto Velho', correct: true },
      { text: 'Amapá', correct: false },
      { text: 'Rio Branco', correct: false },
    ]
  },

  {
    question: 'Qual a capital de Espírito Santo',
    responses: [
      { text: 'Palmas', correct: false },
      { text: 'Goiânia', correct: false },
      { text: 'Vitória', correct: true },
      { text: 'Cuiabá', correct: false },
    ]
  },
];

const question = document.getElementById('question');
const responseButton = document.getElementById('responseButtons');
const nextButton = document.getElementById('nextButton');

let currentQuestionIndex = 0;
let score = 0;

startQuiz = () => {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = 'Próxima';
  showQuestion();
}

showQuestion = () => {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  question.innerHTML = questionNo + '. ' + currentQuestion.question;

  currentQuestion.responses.forEach(response => {
    const button = document.createElement('button');
    button.innerHTML = response.text;
    button.classList.add('btn');
    responseButton.appendChild(button);
    if(response.correct) {
      button.dataset.correct = response.correct;
    }
    button.addEventListener('click', selectResponses);
  });
}

resetState = () => {
  nextButton.style.display = 'none';
  while(responseButton.firstChild) {
    responseButton.removeChild(responseButton.firstChild);
  }
}

selectResponses = (e) => {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === 'true';
  if(isCorrect) {
    selectedButton.classList.add('correct');
    score ++;
  }else {
    selectedButton.classList.add('incorrect');
  }

  Array.from(responseButton.children).forEach(button => {
    if(button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });

  nextButton.style.display = 'block';
}

showScore = () => {
  resetState();
  question.innerHTML = `Você acertou ${score} questões de ${questions.length}.`;
  nextButton.innerHTML = 'Reiniciar';
  nextButton.style.display = 'block';
}

handleNextButton = () => {
  currentQuestionIndex ++;
  if(currentQuestionIndex < questions.length) {
    showQuestion();
  }else {
    showScore();
  }
} 

nextButton.addEventListener('click', () => {
  if(currentQuestionIndex < questions.length) {
    handleNextButton();
  }else {
    startQuiz();
  }
});

startQuiz();