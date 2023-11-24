// Ваши вопросы и варианты ответов
let questions = [];
let quizTitle = "";


let currentQuestionIndex = 0;
let correctAnswers = 0;
let isCheckingAnswer = false;


const quizContainer = document.querySelector("#quiz-container"); // Получаем контейнер один раз

function loadQuestion(index) {
    const questionContainer = quizContainer.querySelector(".question");
    const optionsContainer = quizContainer.querySelector(".options");
    const feedbackElement = quizContainer.querySelector(".feedback");

    questionContainer.textContent = questions[index].question;
    optionsContainer.innerHTML = "";

    if (feedbackElement) {
        feedbackElement.remove();
    }

    questions[index].options.forEach((option, optionIndex) => {
        const optionElement = document.createElement("div");
        optionElement.classList.add("option", "fade-in");
        optionElement.textContent = option;
        optionElement.addEventListener("click", () => selectOption(optionElement, optionIndex));
        optionsContainer.appendChild(optionElement);
    });

    updateCounter(index);
}

// window.addEventListener("DOMContentLoaded", initQuiz);

function selectOption(optionElement, selectedIndex) {
    if (isCheckingAnswer) {
        return; // Блокируем дополнительный ввод во время проверки
    }

    isCheckingAnswer = true; // Устанавливаем флаг проверки
    const correctIndex = questions[currentQuestionIndex].correctIndex;

    const options = document.querySelectorAll(".option");
    options.forEach(option => option.classList.remove("selected"));

    if (selectedIndex === correctIndex) {
        options[selectedIndex].classList.add("correct");
        correctAnswers++;
    } else {
        options[selectedIndex].classList.add("incorrect");
    }

    options.forEach((option, index) => {
        if (index !== selectedIndex) {
            option.classList.remove("fade-in");
            option.classList.add("fade-out");
        }
    });

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion(currentQuestionIndex);
        } else {
            showFinalScore();
        }
        isCheckingAnswer = false; // Снимаем флаг проверки после завершения
    }, 1000);
}


function updateCounter(index) {
    const counterElement = document.querySelector(".counter");
    counterElement.textContent = `Вопрос ${index + 1} из ${questions.length}`;
}


function initQuiz() {
    const quizContainer = document.querySelector("#quiz-container");
    quizContainer.innerHTML = `
    <h1>${quizTitle}</h1>
    <p class="question"></p>
    <div class="options"></div>
    <p class="counter">Вопрос 1 из ${questions.length}</p>
  `;

    currentQuestionIndex = 0;
    correctAnswers = 0;
    loadQuestion(currentQuestionIndex);
}

function showFinalScore() {
    const quizContainer = document.querySelector("#quiz-container");
    const resultsContainer = document.createElement("div");
    resultsContainer.classList.add("results-container");
    resultsContainer.innerHTML = `
<p>Тест завершен! Вы правильно ответили на <span class="correct-answers">${correctAnswers}</span> вопросов из <span class="total-questions">${questions.length}</span>.</p>
  <button class="restart-btn">Начать сначала</button>
`;
    const correctAnswersPercentage = (correctAnswers / questions.length) * 100;

    const correctAnswersElement = resultsContainer.querySelector(".correct-answers");

    correctAnswersElement.textContent = correctAnswers;

    if (correctAnswersPercentage >= 90) {
        correctAnswersElement.style.color = "green";
    } else if (correctAnswersPercentage >= 50) {
        correctAnswersElement.style.color = "orange";
    } else {
        correctAnswersElement.style.color = "red";
    }
    quizContainer.innerHTML = ""; // Очищаем контейнер
    quizContainer.appendChild(resultsContainer); // Добавляем результаты

    const restartButton = quizContainer.querySelector(".restart-btn");
    restartButton.addEventListener("click", initQuiz);
}

fetch("tests/genshin.json")
    .then(response => response.json())
    .then(json => {
        questions = json.questions;
        quizTitle = json.title;
        document.body.style.backgroundImage = `url(${json.image})`;
        initQuiz();
    });
    
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('testid');

console.log(myParam)