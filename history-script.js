const iconsFloder = "img/icons/"
const scoreContainer = document.querySelector(".test_list_container")
let promises 
let allTests
let testsComplite


  async function get_question_count(file, id) {
    let questionCount = await fetch(`tests/${file}.json`)
        .then(response => response.json())
        .then(test => {
            return test.questions.length
        })
    return [questionCount, id]
}
const historyContainer = document.getElementById("history_container")

function makeHistory(promises,allTests,testsComplite){
historyContainer.innerHTML=""
    let qustion_arr = Promise.all(promises).then(a => {
        console.log(a.length)
        let iterations = Math.min(curentPage * elementsInPage, a.length);
        console.log(`iter - ${iterations}`)
        for (let index = (curentPage - 1) * elementsInPage; index < iterations; index++) {
            let currentTest = allTests[a[index][1]]
            const resultsContainer = document.createElement("div")
            // resultsContainer.href = `testWindow.html?testid=${index}&file=${currentTest.file}` ссылка (не работает)
            resultsContainer.classList.add("test_list_element")
            let icon = iconsFloder + (currentTest.icon == "" ? "EmptyIcon.png" : currentTest.icon)
            resultsContainer.innerHTML =
                `
        <img src="${icon}" alt="test icon">
        <div class="test_name">${currentTest.title}</div>
        <div class="test_score">${testsComplite[index].result}/${a[index][0]}</div>
    `
            scoreContainer.appendChild(resultsContainer)
        }
    })
}

    if (localStorage.testsave != null) {
        document.getElementById("tests_none").style.display = "none"
        fetch(`test-data.json`)
            .then(response => response.json())
            .then(json => {
                allTests = json.tests
                let usersTests = JSON.parse(localStorage.testsave)
                promises = []

                usersTests.tests.forEach(element => {
                    let currentTest = allTests[element.testid]
                    promises.push(get_question_count(currentTest.file, element.testid))
                })
                //
                testsComplite = usersTests.tests
                calculatePages(testsComplite.length)
                console.log(`tests - ${testsComplite.length}`)
                //
                makeHistory(promises,allTests,testsComplite)
            })
    }

function setPage(pageNumber){
    makeHistory(promises,allTests,testsComplite)
}




