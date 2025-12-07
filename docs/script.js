let petType = "";

function choosePet(type){
    petType = type;
    document.getElementById("main-section").style.display = "block";
}

function showUpload(){
    let meal = prompt("Enter meal name:");
    fetch("data/recipes.json")
    .then(response => response.json())
    .then(data => {
        let found = data.human_meals_pet_safe.find(m => m.meal.toLowerCase() === meal.toLowerCase());
        if(found){
            document.getElementById("output").innerHTML = `
                <h3>${found.meal}</h3>
                <p>Risk: ${found.risk}</p>
                <p>Pet-Safe Version: ${found.pet_safe_version}</p>
                <audio src="https://youtu.be/dQw4w9WgXcQ?si=6l9vIyV8z7j6h7OK" controls autoplay></audio>
            `;
        } else {
            document.getElementById("output").innerText = "Meal not found.";
        }
    });
}

function showIngredient(){
    let ingredient = prompt("Enter ingredient:");
    fetch(`data/harmful_ingredients.json`)
    .then(response => response.json())
    .then(data => {
        let result = "";
        if(data[petType]["great"][ingredient]){
            result = `Great! ${data[petType]["great"][ingredient]}`;
        } else if(data[petType]["neutral"].includes(ingredient)){
            result = "Neutral, fine in moderation";
        } else if(data[petType]["dangerous"][ingredient]){
            result = `Dangerous! ${data[petType]["dangerous"][ingredient]}`;
        } else {
            result = "Unknown ingredient";
        }
        document.getElementById("output").innerText = result;
    });
}

function showMood(){
    let description = prompt("Describe your pet's behavior:");
    fetch("data/pet_behaviors.json")
    .then(response => response.json())
    .then(data => {
        let found = "neutral"; 
        let suggestion = "No strong behavior detected";
        for(let key in data.pet_behaviors){
            data.pet_behaviors[key].keywords.forEach(kw => {
                if(description.toLowerCase().includes(kw)){
                    found = data.pet_behaviors[key].mood;
                    suggestion = data.pet_behaviors[key].suggestion;
                }
            });
        }
        document.getElementById("output").innerHTML = `<h3>Mood: ${found}</h3><p>${suggestion}</p>
        <audio src="https://youtu.be/dQw4w9WgXcQ?si=6l9vIyV8z7j6h7OK" controls autoplay></audio>`;
    });
}

