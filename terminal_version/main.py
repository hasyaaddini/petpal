from utils import load_json, classify_food, check_ingredient, classify_pet_behavior

def main():
    print("Welcome to PetChef Terminal Version!")
    recipes = load_json("recipes.json")
    ingredients_data = load_json("harmful_ingredients.json")
    behaviors_data = load_json("pet_behaviors.json")

    while True:
        print("\nChoose an option:")
        print("1. Upload Food (type meal name)")
        print("2. Ingredient Checker")
        print("3. Mood Checker")
        print("4. Exit")

        choice = input("Option: ")

        if choice == "1":
            food_name = input("Enter food name: ")
            meal = classify_food(food_name, recipes)
            if meal:
                print(f"\nMeal: {meal['meal']}")
                print(f"Risk: {meal['risk']}")
                print(f"Pet-Safe Version: {meal['pet_safe_version']}")
            else:
                print("Sorry, meal not found in database.")

        elif choice == "2":
            pet_type = input("Pet type (cats/dogs): ").lower()
            ingredient = input("Enter ingredient: ")
            result, explanation = check_ingredient(ingredient, ingredients_data, pet_type)
            print(f"{ingredient}: {result.upper()} -> {explanation}")

        elif choice == "3":
            description = input("Describe your pet's behavior: ")
            mood, suggestion = classify_pet_behavior(description, behaviors_data)
            print(f"Mood: {mood}\nSuggestion: {suggestion}")

        elif choice == "4":
            print("Bye!")
            break

        else:
            print("Invalid option!")

if __name__ == "__main__":
    main()

