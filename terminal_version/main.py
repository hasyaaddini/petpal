import os
import json
from utils import classify_food, check_ingredient, detect_pet_mood

DATA_DIR = os.path.dirname(__file__)
RECIPES_FILE = os.path.join(DATA_DIR, "recipes.json")
HARMFUL_FILE = os.path.join(DATA_DIR, "harmful_ingredients.json")
BEHAVIOR_FILE = os.path.join(DATA_DIR, "pet_behaviors.json")
REF_IMG_DIR = os.path.join(DATA_DIR, "reference_images")

with open(RECIPES_FILE) as f:
    recipes = json.load(f)

with open(HARMFUL_FILE) as f:
    harmful = json.load(f)

with open(BEHAVIOR_FILE) as f:
    behaviors = json.load(f)

def main():
    print("🐾 Welcome to PetPal! 🐾")
    pet = input("Select your pet (cat/dog): ").lower()
    print("\nOptions:")
    print("1. Upload Food Image")
    print("2. Ingredient Checker")
    print("3. Mood Checker")
    choice = input("Enter option (1/2/3): ")

    if choice == "1":
        filepath = input("Upload food image path: ")
        food_name = classify_food(filepath, REF_IMG_DIR, recipes)
        print(f"\nDetected food: {food_name}")
        if food_name in recipes["human_meals_pet_safe"]:
            for meal in recipes["human_meals_pet_safe"]:
                if meal["meal"].lower() == food_name.lower():
                    print(f"Risk: {meal['risk']}")
                    print(f"Pet-safe version: {meal['pet_safe_version']}")
                    break
        else:
            print("Unknown food. No recommendation available.")
    elif choice == "2":
        ingredient = input("Enter ingredient: ").lower()
        check_ingredient(ingredient, pet, harmful)
    elif choice == "3":
        description = input("Describe your pet's behavior: ").lower()
        detect_pet_mood(description, behaviors, pet)
    else:
        print("Invalid choice.")

if __name__ == "__main__":
    main()
