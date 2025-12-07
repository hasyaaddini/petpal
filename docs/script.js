let pet = "";

async function choosePet(selected) {
    pet = selected;
    document.getElementById("home").style.display = "none";
    document.getElementById("options").style.display = "block";
    document.getElementById("petTitle").innerText = `You chose: ${pet}`;
}

function showUpload() {
    hideAll();
    document.getElementById("foodUpload").style.display = "block";
}

function showIngredient() {
    hideAll();
    document.getElementById("ingredientCheck").style.display = "block";
}

function showMood() {
    hideAll();
    document.getElementById("moodCheck").style.display = "block";
}

function hideAll() {
    document.getElementById("foodUpload").style.display = "none";
    document.getElementById("ingredientCheck").style.display = "none";
    document.getElementById("moodCheck").style.display = "none";
}

// Load JSON data
async function loadJSON(path) {
    const res = await fetch(path);
    return await res.json();
}

async function classifyFood() {
    const fileInput = document.getElementById("foodFile");
    const fileName = fileInput.files[0].name.toLowerCase();
    const recipes = await loadJSON("data/recipes.json");
    let detected = "unknown";
    recipes["human_meals_pet_safe"].forEach(meal => {
        if (fileName.includes(meal.meal.toLowerCase())) detected = meal.meal;
    });
    let resultDiv = document.getElementById("foodResult");
    if (detected !== "unknown") {
        let mealInfo = recipes["human_meals_pet_safe"].find(m => m.meal === detected);
        resultDiv.innerHTML = `<p>Detected: ${detected}</p>
                               <p>Risk: ${mealInfo.risk}</p>
                               <p>Pet-safe: ${mealInfo.pet_safe_version}</p>`;
    } else {
        resultDiv.innerHTML = "Unknown food.";
    }
}

async function checkIngredient() {
    const ingredient = document.getElementById("ingredientInput").value.toLowerCase();
    const harmful = await loadJSON("data/harmful_ingredients.json");
    let resultDiv = document.getElementById("ingredientResult");
    const petData = harmful[pet + "s"];
    if (petData.great[ingredient]) resultDiv.innerText = "Safe! " + petData.great[ingredient];
    else if (petData.neutral.includes(ingredient)) resultDiv.innerText = "Neutral, small amounts okay.";
    else if (petData.dangerous[ingredient]) resultDiv.innerText = "Dangerous! " + petData.dangerous[ingredient];
    else resultDiv.innerText = "Unknown ingredient.";
}

async function checkMood() {
    const description = document.getElementById("moodInput").value.toLowerCase();
    const behaviors = await loadJSON("data/pet_behaviors.json");
    let resultDiv = document.getElementById("moodResult");

    for (const moodKey in behaviors.pet_behaviors) {
        const mood = behaviors.pet_behaviors[moodKey];
        if (mood.keywords.some(kw => description.includes(kw))) {
            resultDiv.innerHTML = `<p>Mood: ${mood.mood}</p>
                                   <p>Suggestion: ${mood.suggestion}</p>
                                   <p>Music: <a href="${mood.music.link}" target="_blank">${mood.music.title}</a></p>
                                   <p>Snack: <a href="${mood.snack.link}" target="_blank">${mood.snack.title}</a></p>`;
            // Autoplay music
            const audio = new Audio(mood.music.link);
            audio.play();
            return;
        }
    }
    resultDiv.innerText = "Could not determine mood.";
}
