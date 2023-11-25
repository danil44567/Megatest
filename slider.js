let offset = 0;
const gap = 24;
const sliderLine = document.getElementById("best-testes-line");
let pannel;
const elementsCount = 5;
let elementsCountOffset = window.screen.width < 900 ? -1 : -2;
let curentElement = 0;

function initSlider()
{
    pannel = document.querySelector('.best-testes__quiz-pannel');
}

document.querySelector('.arrow-left').addEventListener('click', () => {
    let width = pannel.offsetWidth;
    offset += width + gap;
    curentElement--;
    if (offset > 0) {
        offset = getMaxElementPos(width);
        curentElement = elementsCount;
    }
    sliderLine.style.left = offset + "px";
});

document.querySelector('.arrow-right').addEventListener('click', () => {
    let width = pannel.offsetWidth;
    offset -= width + gap;
    curentElement++;
    if (offset < getMaxElementPos(width)) {
        offset = 0;
        curentElement = 0;
    }
    sliderLine.style.left = offset + "px";
});

function getMaxElementPos(width) {
    let curElemCount = elementsCount + elementsCountOffset;
    return -((curElemCount * width) + (curElemCount * gap))
}

window.addEventListener('resize', function (event) {
    elementsCountOffset = window.screen.width < 900 ? -1 : -2;

    let temp = getComputedStyle(sliderLine).getPropertyValue('transition');
    sliderLine.style.transition = "none";

    let maxElements = elementsCount + elementsCountOffset;
    if (curentElement >= maxElements)
        curentElement = maxElements;
    let width = pannel.offsetWidth;
    offset = -(((curentElement * width) + (curentElement * gap)));
    sliderLine.style.left = offset + "px";

    sliderLine.style.transition = temp;
}, true);