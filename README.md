# petpal
petpal

# 🐾 PetPal — Pet-Safe Recipe Recommender

**Live Demo (Web UI):** [Open in Browser](https://hasyaaddini.github.io/petpal/)  

PetPal is a fun and interactive program for pet owners who want to share meals with their cats or dogs **safely**. Some human foods are toxic to pets, so PetPal provides **pet-safe recipe alternatives** while keeping the food visually similar. It also includes a **mood checker** to suggest activities, treats, songs, or care based on your pet’s behavior.  

The project has **two versions**:  
- **Terminal Version:** Run directly in your command line.  
- **Web Version:** Clickable, pixel-art-style gamelike interface for a playful user experience.

---

## 🌟 Features

### 1. Home Layout
- Choose your pet: **Cat** or **Dog**  
**Home Screen:**  
![Home Screen](https://image2url.com/images/1765119400735-834d8f07-3c38-4b88-948b-5f4cbbf4d762.png)

### 2. Options
1. **Upload Food Image**  
   - Detects uploaded food file  
   - Suggests **pet-safe replacements** for harmful ingredients  
  ![Feature Screen](https://image2url.com/images/1765119546048-16f3cbd2-86d9-488c-96c3-27b979b70925.png)

2. **Ingredient Checker**  
   - Type in any ingredient (Due to my own limited knowledge of the method to apply this, I only managed to input not so many ingredients. But if you are going to test, you can try  **cooked chicken, onion, rice** or if you are personally interested to see what kind of food is safe, you can check out the *harmful_ingredients.json* file)
   - Get categorized results: **Great, Neutral & Dangerous**  
   - Includes reasoning for **Great** anf **Dangerous**
    ![Feature Screen](https://image2url.com/images/1765119546048-16f3cbd2-86d9-488c-96c3-27b979b70925.png)   

3. **Pet Mood Checker**  
   - Describe your pet’s behavior in a textbox (e.g., “my cat is slow blinking”)  
   - Program classifies mood based on **keywords**  (Again, the program has some limitation on what keywords it detect, but if you are interested with my personal song recomendation according to mood, please feel free to check out the *pet_behaviors.json*!! I chose all songs by Laufey because she is my favorite singer.)
   - Suggests **food, play, song, or care** according to the pet's predicted mood 
   - Provide links to the song and toy/snacks suitable for them
     ![Mood Detection](https://image2url.com/images/1765120049728-d5acf695-d73b-453c-bb12-4446a3904a1d.png) 

### Acknowledgements
This project was developed by Hasya Addini. Some code snippets and design guidance were assisted by ChatGPT (OpenAI), used as a coding assistant to help implement features and organize the project.

#### Reflection
I think I could have done so much better but unfortunately I did not push myself far enough, but I got to admit that I do love doing this project so I quite enjoy it. Thanks to our professor who keep telling us to love our projects I guess :3.
