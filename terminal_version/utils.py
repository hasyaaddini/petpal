import json

def load_json(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def classify_food(food_name, recipes):
    for meal in recipes["human_meals_pet_safe"]:
        if meal["meal"].lower() == food_name.lower():
            return meal
    return None

def check_ingredient(ingredient, data, pet_type):
    ingredient = ingredient.lower()
    if ingredient in data[pet_type]["great"]:
        return "great", data[pet_type]["great"][ingredient]
    elif ingredient in data[pet_type]["neutral"]:
        return "neutral", "neutral, fine in moderation"
    elif ingredient in data[pet_type]["dangerous"]:
        return "dangerous", data[pet_type]["dangerous"][ingredient]
    else:
        return "unknown", "no info available"

def classify_pet_behavior(description, behaviors):
    description = description.lower()
    for key, info in behaviors["pet_behaviors"].items():
        for kw in info["keywords"]:
            if kw in description:
                return info["mood"], info["suggestion"]
    return "neutral", "no strong behavior detected"

