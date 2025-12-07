import os
from difflib import SequenceMatcher
import json

def classify_food(filepath, ref_dir, recipes):
    filename = os.path.basename(filepath).lower()
    max_ratio = 0
    detected_food = "unknown"
    for meal in recipes["human_meals_pet_safe"]:
        ratio = SequenceMatcher(None, filename, meal["meal"].lower()).ratio()
        if ratio > max_ratio:
            max_ratio = ratio
            detected_food = meal["meal"]
    return detected_food if max_ratio > 0.5 else "unknown"

def check_ingredient(ingredient, pet, harmful):
    pet_data = harmful.get(pet + "s")
    if ingredient in pet_data["great"]:
        print(f"Safe! Info: {pet_data['great'][ingredient]}")
    elif ingredient in pet_data["neutral"]:
        print("Neutral ingredient. Small amounts okay.")
    elif ingredient in pet_data["dangerous"]:
        print(f"Dangerous! Reason: {pet_data['dangerous'][ingredient]}")
    else:
        print("Unknown ingredient.")

def detect_pet_mood(description, behaviors, pet):
    for mood_key, mood_info in behaviors["pet_behaviors"].items():
        for kw in mood_info["keywords"]:
            if kw in description:
                print(f"Mood: {mood_info['mood']}")
                print(f"Suggestion: {mood_info['suggestion']}")
                print(f"Music: {mood_info['music']['title']} ({mood_info['music']['link']})")
                print(f"Snack: {mood_info['snack']['title']} ({mood_info['snack']['link']})")
                return
    print("Could not determine mood.")
