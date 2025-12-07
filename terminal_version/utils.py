def classify_food(filename, recipes):
    filename = filename.lower()
    found = None
    for r in recipes["human_meals_pet_safe"]:
        if r["meal"].lower() in filename:
            found = r
            break
    if found:
        print(f"Detected food: {found['meal']}")
        print(f"Risk: {found['risk']}")
        print(f"Pet-safe version: {found['pet_safe_version']}")
    else:
        print("Unknown food!")

def check_ingredient(ingredient, harmful, pet):
    ingredient = ingredient.lower()
    safe = harmful[pet]["great"]
    neutral = harmful[pet]["neutral"]
    dangerous = harmful[pet]["dangerous"]
    if ingredient in safe:
        print(f"{ingredient} is great! Reason: {safe[ingredient]}")
    elif ingredient in neutral:
        print(f"{ingredient} is neutral")
    elif ingredient in dangerous:
        print(f"{ingredient} is dangerous! Reason: {dangerous[ingredient]}")
    else:
        print(f"{ingredient} not found in database")

def check_mood(description, behaviors):
    description = description.lower()
    found = None
    for key in behaviors["pet_behaviors"]:
        for kw in behaviors["pet_behaviors"][key]["keywords"]:
            if kw in description:
                found = behaviors["pet_behaviors"][key]
                break
        if found:
            break
    if found:
        print(f"Mood detected: {found['mood']}")
        print(f"Suggestion: {found['suggestion']}")
    else:
        print("No mood detected.")
