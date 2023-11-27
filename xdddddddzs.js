const iconsFloder = "img/icons/"
const scoreContainer = document.querySelector(".test_list_container")
fetch(`test-data.json`)
    .then(response => response.json())
    .then(json => {json.tests.forEach(element => {
            const resultsContainer = document.createElement("div")
            resultsContainer.classList.add("test_list_element")
            let icon = iconsFloder + (element.icon == "" ? "EmptyIcon.png" : element.icon)
            resultsContainer.innerHTML =
                `
                <img src="${icon}" alt="test icon">
                <div class="test_name">${element.title}</div>
                <div class="test_score">76/10</div>
            `
            scoreContainer.appendChild(resultsContainer)
    })
    })