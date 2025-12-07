import json
from utils import classify_food, check_ingredient, check_mood

def load_data():
    with open("recipes.json", "r") as f:
        recipes = json.load(f)
    with open("harmful_ingredients.json", "r") as f:
        harmful = json.load(f)
    with open("pet_behaviors.json", "r") as f:
        behaviors = json.load(f)
    return recipes, harmful, behaviors

def main():
    recipes, harmful, behaviors = load_data()
    print("🐾 Welcome to PetPal Terminal Version!")
    pet = input("Do you have a cat or dog? ").lower()
    
    while True:
        print("\nOptions:")
        print("1. Food image (enter filename)")
        print("2. Ingredient checker")
        print("3. Mood checker")
        print("4. Quit")
        choice = input("Choose option (1-4): ")

        if choice == "1":
            filename = input("Enter food image filename (e.g., pizza.jpeg): ")
            classify_food(filename, recipes)
        elif choice == "2":
            ingredient = input("Enter ingredient name: ")
            check_ingredient(ingredient, harmful, pet)
        elif choice == "3":
            desc = input("Describe your pet's behavior: ")
            check_mood(desc, behaviors)
        elif choice == "4":
            print("Goodbye!")
            break
        else:
            print("Invalid choice!")

if __name__ == "__main__":
    main()
