const searchform = document.querySelector('form')
const searchResult = document.querySelector('.search-result')
const container = document.querySelector('.container')

let searchQuery = ''

const APP_ID = '4f7e228b'
const APP_KEY = 'bac36c3b65b502352fb43a7b5cea0c73'


searchform.addEventListener('submit', (e) =>{
    e.preventDefault()
    searchQuery = e.target.querySelector('input').value
    recipeApp()
})

async function recipeApp(){
    const baseUrl = `https://api.edamam.com/api/recipes/v2/?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&type=public`
    const response = await fetch(baseUrl)
    const data = await response.json()
    generateHTML(data.hits)
    console.log(data)
}

function generateHTML(results){
    container.classList.remove('initial')
    let generatedHTML = ''
    results.map(result =>{
        generatedHTML +=
        `
        <div class="item">
        <img src="${result.recipe.image}" alt="" >
            <div class="flex-container">
                <h1 class="title">${result.recipe.label}</h1>
                <a class="view-button" href="${result.recipe.url}" target='_blank'  >View Recipe</a>
            </div>
            <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
            <p class="item-data">Diet Level: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data Found'}</p>
            <p class="item-data">Health Level: ${result.recipe.healthLabels}</p>
         </div>
        `
    })
    searchResult.innerHTML = generatedHTML
}

