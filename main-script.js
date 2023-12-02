
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


const paginationButtonsParent = document.getElementById("pagination__buttons");
const pagination = document.getElementById("pagination");
let curentPage = 1;
let maxPage = 1;
const testsInPage = 12;
let paginationButtons = [];
let defaultPage = null;

let paginationLeft = document.getElementById("pagination__left");
let paginationRight = document.getElementById("pagination__right");

paginationLeft.addEventListener("click", movePage(-1))
paginationRight.addEventListener("click", movePage(1))

function calculatePages(testsCount) {
    const testPages = Math.ceil(testsCount / testsInPage);
    if (testPages == 1) {
        pagination.style.display = "none";
    }
    else {
        pagination.style.display = "flex";
    }

    paginationButtons = [];
    paginationButtonsParent.innerHTML = "";
    maxPage = testPages;
    for (let index = 0; index < testPages; index++) {
        const element = document.createElement("button");
        element.classList.add('pagination__button');
        element.addEventListener('click', changeButtonPage(index + 1));
        element.textContent = index + 1;
        paginationButtons.push(element);
        paginationButtonsParent.appendChild(element);
    }
    curentPage = 1;
    paginationButtons[0].classList.add("selected");
}

function movePage(direction) {
    let dir = direction;
    return function () {
        let tempPage = curentPage + dir;
        if (tempPage < 1 || tempPage > maxPage)
            return;

        setPage(curentPage + dir);
    }
}

function setPage(pageNumber)
{
    paginationButtons[curentPage - 1].classList.remove("selected");
    curentPage = pageNumber;
    paginationButtons[pageNumber - 1].classList.add("selected");
    fillQuiz(activeTests);
}

function changeButtonPage(pageNumber) {
    const page = pageNumber;
    return function () {
        setPage(page);
        // quizContainer.scrollIntoView();
    }
}

const quizContainer = document.getElementById("quizContainer");

function fillQuiz(arr) {
    quizContainer.innerHTML = "";

    let iterations = Math.min(curentPage * testsInPage, arr.length);
    for (let index = (curentPage - 1) * testsInPage; index < iterations; index++) {
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