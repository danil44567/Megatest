

function toggleAll(counter)
{
    if (counter = 1)
    {
        document.getElementById("screen").innerHTML ='<img src="img/instructions/Rectangle 29.png" alt="скрин">'
        document.getElementById("text").textContent ='silly cat1'
        document.getElementById("page_number").innerHTML =1
    }
    else if (counter = 2)
    {
        document.getElementById("screen").innerHTML ='<img src="img/instructions/Rectangle 29.png" alt="скрин">'
        document.getElementById("text").textContent ='silly cat2'
        document.getElementById("page_number").innerHTML ='<img src="img/instructions/but.png" alt="кнопки">'
    }
    else if (counter = 3)
    {
        document.getElementById("screen").innerHTML ='<img src="img/instructions/Rectangle 29.png" alt="скрин">'
        document.getElementById("text").textContent ='silly cat3'
        document.getElementById("page_number").innerHTML ='<img src="img/instructions/but.png" alt="кнопки">'
    }
    else if (counter = 4)
    {
        document.getElementById("screen").innerHTML ='<img src="img/instructions/Rectangle 29.png" alt="скрин">'
        document.getElementById("text").textContent ='silly cat4'
        document.getElementById("page_number").innerHTML ='<img src="img/instructions/but.png" alt="кнопки">'
    }    
}
let count
count = counter

function plusOne(count)
{  
    count++
    console.log(count)
}
function minusOne(count)
{  
    
    count--
    console.log(count)
}
document.getElementById('button_right').addEventListener('click', toggleAll(2));