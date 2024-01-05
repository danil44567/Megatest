function toggleAll(counter)
{
    if (counter == 1)
    {
        document.getElementById("screen").innerHTML ='<img src="img/instructions/Rectangle 29.png" alt="скрин">'
        document.getElementById("text").textContent ='Первым делом вы сразу попадёте на главную. Вы можете выбрать тест, нажав на него, и перейти к его прохождению. Хорошей идеей будет попробовать что-нибудь из вкладки “Лучшие тесты”. Не можете найти то, что интересно вам? Попробуйте найти это с помощью фильтров – нажимайте на кнопку с интересующим фильтром и вам будет показывать тесты только из этой категории. Если хотите отменить фильтрацию, то нажмите на кнопку “Все”.'
    }
    else if (counter == 2)
    {
        document.getElementById("screen").innerHTML ='<img src="img/instructions/Rectangle 29.png" alt="скрин">'
        document.getElementById("text").textContent ='После выбора теста вы перейдёте к его прохождению: читайте вопрос нажимайте на кнопку с ответом, который считаете правильным и после пары секунд ожидания вы перейдёте следующему вопросу. После нажатия ответ загорится зелёным если он был правильный и красным если неправильный. В тесте нельзя вернуться к предыдущим вопросам и выбрать другой вариант, так что учитывайте это во время прохождения.'
    }
    else if (counter == 3)
    {
        document.getElementById("screen").innerHTML ='<img src="img/instructions/Rectangle 29.png" alt="скрин">'
        document.getElementById("text").textContent ='Пройдя тест, результаты можно посмотреть в истории решений, нажав на соответствующую кнопку в шапке сайта.'
    }
    else if (counter == 4)
    {
        document.getElementById("screen").innerHTML ='<img src="img/instructions/Rectangle 29.png" alt="скрин">'
        document.getElementById("text").textContent ='Если вы хотите связаться с нами, то вся контактная информация находится в подвале сайте, а если вы хотите побольше узнать о нас, то может нажать на соответствующую кнопку в подвале/шапке сайта.'
    }    
}
let count


function plusOne(count)
{  
    count = document.getElementById("page_number").textContent
    if (count <4 ) count++
    document.getElementById("page_number").innerHTML = count
    console.log(document.getElementById("page_number").textContent)
    toggleAll(document.getElementById("page_number").textContent)
}
function minusOne(count)
{  
    count = document.getElementById("page_number").textContent
    if (count >1 ) count--
    document.getElementById("page_number").innerHTML = count
    toggleAll(document.getElementById("page_number").textContent)
}
document.getElementById('button_right').addEventListener('click', plusOne);
document.getElementById('button_left').addEventListener('click', minusOne);