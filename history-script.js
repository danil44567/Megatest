const iconsFloder = "img/icons/"
const scoreContainer = document.querySelector(".test_list_container")

async function get_question_count(file, id) {
    let questionCount = await fetch(`tests/${file}.json`)
        .then(response => response.json())
        .then(test => {
            return test.questions.length
        })
    return [questionCount, id]
}

if (localStorage.testsave != null) {
    document.getElementById("tests_none").style.display = "none"
    fetch(`test-data.json`)
        .then(response => response.json())
        .then(json => {
            let allTests = json.tests
            let usersTests = JSON.parse(localStorage.testsave)
            let promises = []
            usersTests.tests.forEach(element => {
                let currentTest = allTests[element.testid]
                promises.push(get_question_count(currentTest.file, element.testid))
            })
            let qustion_arr = Promise.all(promises).then(a => {
                for (let index = 0; index < a.length; index++) {
                    let currentTest = allTests[a[index][1]]
                    const resultsContainer = document.createElement("div")
                    resultsContainer.classList.add("test_list_element")
                    let icon = iconsFloder + (currentTest.icon == "" ? "EmptyIcon.png" : currentTest.icon)
                    resultsContainer.innerHTML =
                        `
                <img src="${icon}" alt="test icon">
                <div class="test_name">${currentTest.title}</div>
                <div class="test_score">${usersTests.tests[index].result}/${a[index][0]}</div>
            `
                    scoreContainer.appendChild(resultsContainer)
                }
            })
        })
}
