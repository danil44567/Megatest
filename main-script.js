
let tests;

const tagAll = document.getElementById("tag-all");
const tagGames = document.getElementById("tag-games");
const tagMovie = document.getElementById("tag-movie");
const tagSince = document.getElementById("tag-sience");

let activeTagBtn = tagAll;

tagAll.addEventListener("click", () => {
    fillQuiz(tests);
    switchTagBtn(tagAll);
});
tagGames.addEventListener("click", quizFilter("game", tagGames));
tagMovie.addEventListener("click", quizFilter("movie", tagMovie));
tagSince.addEventListener("click", quizFilter("sience", tagSince));

// .filter__tag-selected

fetch("test-data.json")
    .then(response => response.json())
    .then(json => {
        tests = json.tests;
        fillQuiz(tests);

        let bestTestLine = document.getElementById("best-testes-line");
        bestTestLine.innerHTML = "";
        for (let i = 0; i < elementsCount; i++) {
            let curentTest = tests[i];
            const bestTest = document.createElement("div");
            bestTest.classList.add("best-testes__quiz-pannel");
            bestTest.style.backgroundImage = `url(${curentTest.icon})`;
            
            bestTest.innerHTML = 
            `
            <p>${curentTest.discription}</p>
            <a href="testWindow.html?testid=${i}&file=${curentTest.file}">Решать</a>
            `;

            bestTestLine.appendChild(bestTest);
        }

        initSlider();
    });



function quizFilter(filterName, tagButton) {
    let type = filterName;
    let btn = tagButton;
    return function () {
        switchTagBtn(btn);
        fillQuiz(tests.filter(j => j.type == type));
    }
}

function switchTagBtn(newTagBtn) {
    activeTagBtn.classList.remove("filter__tag-selected");
    newTagBtn.classList.add("filter__tag-selected");
    activeTagBtn = newTagBtn;
}

const quizContainer = document.getElementById("quizContainer");

function fillQuiz(arr) {
    quizContainer.innerHTML = "";
    arr.forEach((element, index) => {
        const resultsContainer = document.createElement("a");
        resultsContainer.classList.add("quizPannel");
        resultsContainer.href = `testWindow.html?testid=${index}&file=${element.file}`
        resultsContainer.innerHTML =
            `
        <img src="${element.icon}">
        <span class="hiddenText">${element.discription}</span>
        <h2 class="title">${element.title}</h2>
        `;

        quizContainer.appendChild(resultsContainer);
    });
}