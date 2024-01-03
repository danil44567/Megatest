function toggleAll(counter)
{
    if (counter = 1)
    {
        document.getElementById("screen").innerHTML ='<img src="img/instructions/Rectangle 29.png" alt="скрин">'
        document.getElementById("text").textContent ='silly cat1'
    }
    else if (counter = 2)
    {
        document.getElementById("screen").innerHTML ='<img src="img/instructions/Rectangle 29.png" alt="скрин">'
        document.getElementById("text").textContent ='silly cat2'
    }
    else if (counter = 3)
    {
        document.getElementById("screen").innerHTML ='<img src="img/instructions/Rectangle 29.png" alt="скрин">'
        document.getElementById("text").textContent ='silly cat3'
    }
    else if (counter = 4)
    {
        document.getElementById("screen").innerHTML ='<img src="img/instructions/Rectangle 29.png" alt="скрин">'
        document.getElementById("text").textContent ='silly cat4'
    }    
}
let count


function plusOne(count)
{  
    count = document.getElementById("page_number").textContent
    console.log(count)
    if (count <4 ) count++
    console.log(count)
    document.getElementById("page_number").innerHTML = count
    console.log(document.getElementById("page_number").textContent)
    toggleAll(document.getElementById("page_number").textContent)
}
function minusOne(count)
{  
    count = document.getElementById("page_number").textContent
    if (count >1 )count--
    console.log(count)
    document.getElementById("page_number").innerHTML = count
    toggleAll(document.getElementById("page_number").textContent)
}
document.getElementById('button_right').addEventListener('click', plusOne);
document.getElementById('button_left').addEventListener('click', minusOne);