// Data: an ARRAY of meal OBJECTS, all with the same structure.
const meals = [
  {
    name: "Creamy Spaghetti Carbonara",
    description: "A classic Italian pasta dish with eggs, cheese, and pancetta",
    image: "photo/1.avif", 
    rating: 4.8, reviews: 234, difficulty: "Easy", cuisine: "Italian",
    prepTime: 15, cookTime: 20, servings: 4,
    ingredients: ["400g spaghetti pasta", "200g pancetta, diced", "4 egg yolks + 1 whole egg", "100g Pecorino Romano, grated", "Black pepper, freshly ground", "Salt for pasta water"],
    instructions: ["Boil the spaghetti in salted water until al dente.", "Fry the pancetta until crispy.", "Whisk eggs, cheese and pepper in a bowl.", "Toss hot pasta with pancetta off the heat, then stir in the egg mixture.", "Add a splash of pasta water and serve at once."],
    nutrition: { Calories: "520 kcal", Protein: "28g", Carbohydrates: "62g", Fat: "18g", Fiber: "3g", Sodium: "680mg" },
    tips: ["Take the pan off the heat before adding the eggs so they don't scramble.", "Save a cup of pasta water.", "Use freshly grated cheese."]
  },
  {
    name: "Mediterranean Quinoa Bowl",
    description: "Healthy bowl with quinoa, vegetables, and tahini dressing",
    image: "photo/2.avif", 
    rating: 4.5, reviews: 156, difficulty: "Easy", cuisine: "Mediterranean",
    prepTime: 25, cookTime: 25, servings: 2,
    ingredients: ["1 cup quinoa", "Cherry tomatoes, halved", "Cucumber, diced", "Red onion, sliced", "Kalamata olives", "Feta cheese, crumbled", "Fresh parsley", "Tahini dressing"],
    instructions: ["Rinse and cook the quinoa for 15 minutes, then fluff.", "Chop all the vegetables.", "Combine everything in a bowl.", "Drizzle with tahini dressing and top with feta."],
    nutrition: { Calories: "430 kcal", Protein: "15g", Carbohydrates: "52g", Fat: "19g", Fiber: "8g", Sodium: "540mg" },
    tips: ["Toast the dry quinoa for a nutty flavor.", "Add chickpeas for extra protein."]
  },
  {
    name: "Grilled Chicken Shawarma",
    description: "Juicy spiced chicken with garlic sauce, wrapped in warm pita",
    image: "photo/3.avif", 
    rating: 4.7, reviews: 312, difficulty: "Medium", cuisine: "Middle Eastern",
    prepTime: 30, cookTime: 25, servings: 4,
    ingredients: ["600g chicken thighs", "Yogurt", "Garlic cloves", "Shawarma spices", "Lemon juice", "Pita bread", "Pickles"],
    instructions: ["Marinate the chicken in yogurt, garlic, lemon and spices for 2 hours.", "Grill or pan-fry until golden and cooked through.", "Slice thinly.", "Wrap in pita with garlic sauce and pickles."],
    nutrition: { Calories: "610 kcal", Protein: "42g", Carbohydrates: "48g", Fat: "27g", Fiber: "3g", Sodium: "890mg" },
    tips: ["Marinate overnight for the best flavor.", "Don't overcook thighs; they stay juicy."]
  },
  {
    name: "Vegetable Stir Fry",
    description: "Quick and colorful vegetables tossed in a savory soy-ginger sauce",
    image: "photo/4.avif", 
    rating: 4.3, reviews: 98, difficulty: "Easy", cuisine: "Asian",
    prepTime: 10, cookTime: 10, servings: 2,
    ingredients: ["Broccoli florets", "Bell peppers, sliced", "Carrots, sliced", "Soy sauce", "Fresh ginger, grated", "Garlic", "Sesame oil", "Cooked rice"],
    instructions: ["Heat oil in a wok on high heat.", "Stir-fry the carrots and broccoli for 3 minutes.", "Add peppers, garlic and ginger.", "Pour in soy sauce, toss, and serve over rice."],
    nutrition: { Calories: "340 kcal", Protein: "9g", Carbohydrates: "55g", Fat: "9g", Fiber: "6g", Sodium: "760mg" },
    tips: ["Keep the heat high and the pieces small.", "Have everything chopped before you start."]
  }
];

let current = null;
let activeTab = "ingredients";
const $ = (id) => document.getElementById(id);

// Function: pick a random meal (and avoid repeating the same one).
function getRandomMeal() {
  let meal;
  do {
    meal = meals[Math.floor(Math.random() * meals.length)];
  } while (meal === current && meals.length > 1);
  return meal;
}

// Function: build the HTML of the active tab.
function renderPanel() {
  const m = current;
  let html = "";

  if (activeTab === "ingredients" || activeTab === "instructions") {
    html = "<ol>" + m[activeTab].map((t, i) => `<li><span class="num">${i + 1}</span>${t}</li>`).join("") + "</ol>";
  } else if (activeTab === "tips") {
    html = '<div class="tips">' + m.tips.map((t) => `<div class="tip-card"><i class="fa-solid fa-circle-check"></i><span>${t}</span></div>`).join("") + "</div>";
  } else {
    const icons = {
      Calories: ["fa-fire", "#ea580c", "#ffedd5"],
      Protein: ["fa-dumbbell", "#2563eb", "#dbeafe"],
      Carbohydrates: ["fa-wheat-awn", "#ca8a04", "#fef9c3"],
      Fat: ["fa-droplet", "#dc2626", "#fee2e2"],
      Fiber: ["fa-seedling", "#16a34a", "#dcfce7"],
      Sodium: ["fa-cube", "#db2777", "#fce7f3"]
    };
    html = '<div class="nutri-grid">' + Object.entries(m.nutrition).map(([k, v]) => {
      const [icon, color, bg] = icons[k];
      return `<div class="nutri-card"><span class="nutri-icon" style="background:${bg};color:${color}"><i class="fa-solid ${icon}"></i></span><span class="nutri-label">${k}</span><b>${v}</b></div>`;
    }).join("") + "</div>";
  }

  $("panel").className = "panel " + activeTab;
  $("panel").innerHTML = html;
}

// Function: show a meal on the page 
function showMeal(m) {
  current = m;
  $("name").textContent = m.name;
  $("description").textContent = m.description;
  $("rating").innerHTML = `<i class="fa-solid fa-star"></i> <b>${m.rating}</b> <small>(${m.reviews} reviews)</small>`;
  $("difficulty").textContent = m.difficulty;
  $("cuisine").textContent = m.cuisine;
  $("prep").textContent = m.prepTime + " min";
  $("cook").textContent = m.cookTime + " min";
  $("servings").textContent = m.servings + " people";

  const photo = $("photo");
  if (m.image && m.image.trim() !== "") {
    photo.style.backgroundImage = `url("${m.image}")`;
  } else {
    photo.style.backgroundImage = "none";
  }

  // Warning appears only when total time is more than 45 minutes.
  $("alert").hidden = m.prepTime + m.cookTime <= 45;
  $("save").classList.remove("on");
  renderPanel();
}

// Event Listeners for Tabs
$("tabs").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  activeTab = btn.dataset.tab;
  document.querySelectorAll("#tabs button").forEach((b) => b.classList.toggle("active", b === btn));
  renderPanel();
});

$("try").addEventListener("click", () => showMeal(getRandomMeal()));
$("save").addEventListener("click", (e) => e.currentTarget.classList.toggle("on"));
$("share").addEventListener("click", () => navigator.clipboard && navigator.clipboard.writeText(current.name));

// Initialize first meal
showMeal(getRandomMeal());