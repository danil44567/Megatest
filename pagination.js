const paginationButtonsParent = document.getElementById("pagination__buttons");
const pagination = document.getElementById("pagination");
let curentPage = 1;
let elementsMaxCount = 1;
const elementsInPage = 12;
let paginationButtons = [];
let defaultPage = null;

let paginationLeft = document.getElementById("pagination__left");
let paginationRight = document.getElementById("pagination__right");

paginationLeft.addEventListener("click", movePage(-1))
paginationRight.addEventListener("click", movePage(1))

function calculatePages(elementsCount) {
    const testPages = Math.ceil(elementsCount / elementsInPage);
    if (testPages == 1) {
        pagination.style.display = "none";
    }
    else {
        pagination.style.display = "flex";
    }

    paginationButtons = [];
    paginationButtonsParent.innerHTML = "";
    elementsMaxCount = testPages;
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
        if (tempPage < 1 || tempPage > elementsMaxCount)
            return;

            setPagePagination(curentPage + dir);
    }
}


function changeButtonPage(pageNumber) {
    const page = pageNumber;
    return function () {

        setPagePagination(page);
    }
}

function setPagePagination(pageNumber)
{
    paginationButtons[curentPage - 1].classList.remove("selected");
    curentPage = pageNumber;
    paginationButtons[pageNumber - 1].classList.add("selected");
    setPage(pageNumber);
}