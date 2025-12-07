let petType = "";

async function choosePet(type){
    petType = type;
    document.getElementById('home').classList.add('hidden');
    document.getElementById('options').classList.remove('hidden');
}

function showOptions(){
    document.getElementById('food-upload').classList.add('hidden');
    document.getElementById('ingredient-checker').classList.add('hidden');
    document.getElementById('mood-checker').classList.add('hidden');
    document.getElementById('tutorial').classList.add('hidden');
    document.getElementById('options').classList.remove('hidden');
}

function goHome(){
    document.getElementById('options').classList.add('hidden');
    document.getElementById('home').classList.remove('hidden');
}

function showTutorial(){
    document.getElementById('home').classList.add('hidden');
    document.getElementById('tutorial').classList.remove('hidden');
}

function showFoodUpload(){
    showOptions();
    document.getElementById('options').classList.add('hidden');
    document.getElementById('food-upload').classList.remove('hidden');
}

function showIngredientChecker(){
    showOptions();
    document.getElementById('options').classList.add('hidden');
    document.getElementById('ingredient-checker').classList.remove('hidden');
}

function showMoodChecker(){
    showOptions();
    document.getElementById('options').classList.add('hidden');
    document.getElementById('mood-checker').classList.remove('hidden');
}

async function classifyFood(){
    let fileInput = document.getElementById('foodImage').files[0];
    let resultDiv = document.getElementById('foodResult');
    if(!fileInput){
        resultDiv.innerHTML = "Please upload a food image!";
        return;
    }
    let filename = fileInput.name.toLowerCase();
    let recipes = await fetch('data/recipes.json').then(res => res.json());
    let found = recipes.human_meals_pet_safe.find(r => filename.includes(r.meal.toLowerCase()));
    if(found){
        resultDiv.innerHTML = `<p>Detected food: <b>${found.meal}</b></p>
                               <p>Risk: ${found.risk}</p>
                               <p>Pet-safe version: ${found.pet_safe_version}</p>`;
    } else {
        resultDiv.innerHTML = "Unknown food!";
    }
}

async function checkIngredient(){
    let input = document.getElementById('ingredientInput').value.toLowerCase();
    let resultDiv = document.getElementById('ingredientResult');
    if(!input){
        resultDiv.innerHTML = "Please type an ingredient!";
        return;
    }
    let data = await fetch('data/harmful_ingredients.json').then(res => res.json());
    let safe = data[petType].great;
    let neutral = data[petType].neutral;
    let dangerous = data[petType].dangerous;
    if(input in safe){
        resultDiv.innerHTML = `${input} is great! Reason: ${safe[input]}`;
    } else if(neutral.includes(input)){
        resultDiv.innerHTML = `${input} is neutral`;
    } else if(input in dangerous){
        resultDiv.innerHTML = `${input} is dangerous! Reason: ${dangerous[input]}`;
    } else {
        resultDiv.innerHTML = `${input} not found in database`;
    }
}

async function checkMood(){
    let input = document.getElementById('moodInput').value.toLowerCase();
    let resultDiv = document.getElementById('moodResult');
    if(!input){
        resultDiv.innerHTML = "Please describe your pet's behavior!";
        return;
    }
    let data = await fetch('data/pet_behaviors.json').then(res => res.json());
    let behaviors = data.pet_behaviors;
    let found = null;
    for(let key in behaviors){
        for(let kw of behaviors[key].keywords){
            if(input.includes(kw)){
                found = behaviors[key];
                break;
            }
        }
        if(found) break;
    }
    if(found){
        resultDiv.innerHTML = `<p>Mood detected: <b>${found.mood}</b></p>
                               <p>Suggestion: ${found.suggestion}</p>`;
    } else {
        resultDiv.innerHTML = "No mood detected.";
    }
}

