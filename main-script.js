
let tests;
let activeTests;
let bestTestsId = [0, 14, 1, 10, 2];

const iconsFloder = "img/icons/";
const tagAll = document.getElementById("tag-all");
const tagGames = document.getElementById("tag-games");
const tagMovie = document.getElementById("tag-movie");
const tagSince = document.getElementById("tag-sience");
let activeTagBtn = tagAll;

tagAll.addEventListener("click", () => {
    defaultPage();
    activeTests = tests;
    calculatePages(activeTests.length);
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
        activeTests = tests;
        defaultPage = changeButtonPage(1);
        calculatePages(tests.length)
        fillQuiz(tests);
        defaultPage();
        let bestTestLine = document.getElementById("best-testes-line");
        bestTestLine.innerHTML = "";

        for (let i = 0; i < elementsCount; i++) {
            let curentTest = tests[bestTestsId[i]];
            const bestTest = document.createElement("div");
            bestTest.classList.add("best-testes__quiz-pannel");
            let icon = iconsFloder + (curentTest.icon == "" ? "EmptyIcon.png" : curentTest.icon);
            bestTest.style.backgroundImage = `url(${icon})`;

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
        activeTests = tests.filter(j => j.type == type);
        calculatePages(activeTests.length)
        fillQuiz(activeTests);
        defaultPage();
    }
}

function switchTagBtn(newTagBtn) {
    activeTagBtn.classList.remove("filter__tag-selected");
    newTagBtn.classList.add("filter__tag-selected");
    activeTagBtn = newTagBtn;
}

function setPage(pageNumber)
{
    fillQuiz(activeTests);
}

const quizContainer = document.getElementById("quizContainer");

function fillQuiz(arr) {
    quizContainer.innerHTML = "";

    let iterations = Math.min(curentPage * elementsInPage, arr.length);
    for (let index = (curentPage - 1) * elementsInPage; index < iterations; index++) {
        const element = arr[index];
        const resultsContainer = document.createElement("a");
        resultsContainer.classList.add("quizPannel");
        resultsContainer.href = `testWindow.html?testid=${index}&file=${element.file}`
        let icon = iconsFloder + (element.icon == "" ? "EmptyIcon.png" : element.icon);
        resultsContainer.innerHTML =
            `
        <img src="${icon}" alt="Изображение ${element.title}">
        <span class="hiddenText">${element.discription}</span>
        <h2 class="title">${element.title}</h2>
        `;

        quizContainer.appendChild(resultsContainer);
    }
}

window.addEventListener("scroll", (event) => {
    let a = this.scrollY;
    let b = document.body.scrollHeight - document.body.clientHeight;
    let c = a / b;
    document.body.style.setProperty('--thumb-color-percent', (c * 100) + '%')
});