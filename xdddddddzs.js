const iconsFloder = "img/icons/"
const scoreContainer = document.querySelector(".test_list_container")



fetch(`test-data.json`)
    .then(response => response.json())
    .then(json => {
        let allTests = json.tests
        let usersTests = JSON.parse(localStorage.testsave)
        usersTests.tests.forEach(element => {
            let currentTest = allTests[element.testid]
            /*let questionCount = fetch(`tests/${currentTest.file}.json`)
            .then(response => response.json())
            .then(test =>{console.log(test)
                return test.questions.length
            })*/
            console.log(questionCount)
            const resultsContainer = document.createElement("div")
            resultsContainer.classList.add("test_list_element")
            let icon = iconsFloder + (currentTest.icon == "" ? "EmptyIcon.png" : currentTest.icon)
            resultsContainer.innerHTML =
                `
                <img src="${icon}" alt="test icon">
                <div class="test_name">${currentTest.title}</div>
                <div class="test_score">${element.result}</div>
            `
            scoreContainer.appendChild(resultsContainer)
    })
    })
    console.log(JSON.parse(localStorage.testsave))