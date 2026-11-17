/*
 * Shopping Tiles Card – shows the open items of a Home Assistant to-do list as icon tiles.
 * Einkaufsliste als Kacheln – zeigt die offenen Artikel einer To-do-Liste als Kacheln mit Symbol.
 *
 * Usage / Nutzung:  type: custom:shopping-tiles-card
 *                   entity: todo.shopping_list
 *
 * https://github.com/plerzelwupp/shopping-tiles-card – MIT License, (c) 2026 plerzelwupp
 */
const STC_VERSION = "1.5.0";

// Reihenfolge zählt: genauere Begriffe vor allgemeinen. "=wort" trifft nur ganze Wörter.
const EK_ICONS = [
  // englische Wörter, die sonst einen deutschen Begriff treffen / English words that would hit a German keyword
  ["chocolate", "mdi:candy"], ["lemonade", "mdi:bottle-soda"], ["cornflakes", "mdi:grain"],
  // Ausnahmen für die folgenden Begriffe / exceptions for the keywords below
  ["banana", "mdi:food-apple"], ["frühlingszwiebel", "mdi:leaf"], ["lauchzwiebel", "mdi:leaf"], ["spring onion", "mdi:leaf"], ["green onion", "mdi:leaf"], ["scallion", "mdi:leaf"],
  ["kartoffelchips", "mdi:popcorn"], ["erdnussbutter", "mdi:peanut"], ["peanut butter", "mdi:peanut"], ["butterkeks", "mdi:cookie"],
  ["buttermilch", "mdi:cup"], ["buttermilk", "mdi:cup"], ["honigmelone", "mdi:fruit-watermelon"], ["honeydew", "mdi:fruit-watermelon"],
  ["olivenöl", "mdi:bottle-tonic"], ["olive oil", "mdi:bottle-tonic"], ["kaffeebohne", "mdi:coffee"], ["leberkäse", "mdi:sausage"],
  ["grillkohle", "mdi:grill"], ["holzkohle", "mdi:grill"], ["charcoal", "mdi:grill"], ["kontaktlinse", "mdi:eye"],
  // eigene Symbole (stc:) und weitere MDI-Symbole / own icons (stc:) and more MDI icons
  ["kartoffel", "stc:kartoffel"], ["pommes", "mdi:french-fries"], ["tomate", "stc:tomate"], ["gurke", "stc:gurke"], ["zucchini", "stc:gurke"],
  ["aubergine", "stc:aubergine"], ["avocado", "stc:avocado"], ["kohl", "stc:kohl"], ["sauerkraut", "stc:kohl"], ["wirsing", "stc:kohl"],
  ["zwiebel", "stc:zwiebel"], ["schalotte", "stc:zwiebel"], ["knoblauch", "stc:knoblauch"],
  ["ingwer", "stc:ingwer"], ["kichererbse", "stc:huelsenfruechte"], ["erbse", "stc:huelsenfruechte"], ["linse", "stc:huelsenfruechte"],
  ["bohne", "stc:huelsenfruechte"], ["hülsenfr", "stc:huelsenfruechte"], ["olive", "stc:oliven"],
  ["pfirsich", "stc:pfirsich"], ["nektarine", "stc:pfirsich"], ["aprikose", "stc:pfirsich"], ["mango", "stc:pfirsich"],
  ["pflaume", "stc:pfirsich"], ["zwetsch", "stc:pfirsich"], ["kiwi", "stc:kiwi"],
  ["butter", "stc:butter"], ["margarine", "stc:butter"], ["tofu", "stc:tofu"],
  ["garnele", "stc:garnele"], ["shrimp", "stc:garnele"], ["scampi", "stc:garnele"], ["krabbe", "stc:garnele"],
  ["honig", "stc:honig"], ["marmelade", "stc:marmelade"], ["konfitüre", "stc:marmelade"], ["nutella", "stc:marmelade"], ["aufstrich", "stc:marmelade"],
  ["dose", "stc:dose"], ["konserve", "stc:dose"], ["wrap", "stc:wrap"], ["tortilla", "stc:wrap"],
  ["folie", "stc:folie"], ["backpapier", "stc:folie"], ["schwamm", "stc:schwamm"], ["schwämm", "stc:schwamm"],
  ["pesto", "stc:marmelade"], ["kakao", "mdi:coffee"], ["porree", "mdi:leaf"], ["energy", "mdi:bottle-soda"],
  ["putzmittel", "mdi:spray-bottle"], ["reiniger", "mdi:spray-bottle"], ["rasier", "mdi:razor-single-edge"],
  ["zucker", "mdi:spoon-sugar"], ["kürbis", "mdi:pumpkin"],
  ["feta", "mdi:cheese"], ["mozzarella", "mdi:cheese"], ["parmesan", "mdi:cheese"], ["gouda", "mdi:cheese"], ["emmentaler", "mdi:cheese"], ["camembert", "mdi:cheese"],
  ["gnocchi", "mdi:pasta"], ["maultasche", "mdi:pasta"], ["tortellini", "mdi:pasta"], ["ravioli", "mdi:pasta"],
  ["salami", "mdi:sausage"], ["aufschnitt", "mdi:sausage"], ["mortadella", "mdi:sausage"], ["schinken", "mdi:food-steak"], ["frikadelle", "mdi:food-steak"],
  ["teelicht", "mdi:candle"], ["kerze", "mdi:candle"], ["glühbirne", "mdi:lightbulb"], ["leuchtmittel", "mdi:lightbulb"],
  ["katze", "mdi:cat"], ["hund", "mdi:dog"],
  ["weichspüler", "mdi:washing-machine"], ["waschmittel", "mdi:washing-machine"], ["spül", "mdi:dishwasher"],
  ["klopapier", "mdi:paper-roll"], ["toilettenpapier", "mdi:paper-roll"], ["küchenrolle", "mdi:paper-roll"], ["taschentü", "mdi:paper-roll"],
  ["zahnpasta", "mdi:toothbrush-paste"], ["zahnbürste", "mdi:toothbrush"], ["deo", "mdi:spray"],
  ["seife", "mdi:hand-wash"], ["duschgel", "mdi:shower"], ["shampoo", "mdi:shower"],
  ["müllbeutel", "mdi:trash-can"], ["batterie", "mdi:battery"], ["schnürsenkel", "mdi:shoe-sneaker"],
  ["windel", "mdi:baby-bottle-outline"], ["baby", "mdi:baby-bottle-outline"],
  ["tablette", "mdi:pill"], ["medikament", "mdi:pill"], ["ibuprofen", "mdi:pill"], ["paracetamol", "mdi:pill"], ["aspirin", "mdi:pill"],
  ["pflaster", "mdi:bandage"], ["blume", "mdi:flower"],
  ["tiefkühl", "mdi:snowflake"], ["eiscreme", "mdi:ice-cream"], ["speiseeis", "mdi:ice-cream"], ["=eis", "mdi:ice-cream"],
  ["milch", "mdi:cup"], ["joghurt", "mdi:cup"], ["sahne", "mdi:cup"], ["quark", "mdi:cup"],
  ["käse", "mdi:cheese"], ["eier", "mdi:egg"],
  ["croissant", "mdi:food-croissant"], ["brezel", "mdi:food-croissant"], ["laugen", "mdi:food-croissant"], ["baguette", "mdi:baguette"],
  ["brot", "mdi:bread-slice"], ["brötchen", "mdi:bread-slice"], ["toast", "mdi:bread-slice"],
  ["muffin", "mdi:muffin"], ["kuchen", "mdi:cupcake"], ["pizza", "mdi:pizza"],
  ["mehl", "mdi:grain"], ["hefe", "mdi:grain"], ["müsli", "mdi:grain"], ["haferflocken", "mdi:grain"],
  ["nudel", "mdi:pasta"], ["pasta", "mdi:pasta"], ["spaghetti", "mdi:pasta"], ["lasagne", "mdi:pasta"],
  ["preiselbeer", "mdi:fruit-cherries"], ["reis", "mdi:rice"], ["risotto", "mdi:rice"],
  ["schwein", "mdi:food-steak"], ["wurst", "mdi:sausage"], ["würstchen", "mdi:sausage"],
  ["speck", "mdi:food-steak"], ["fleisch", "mdi:food-steak"], ["hack", "mdi:food-steak"], ["steak", "mdi:food-steak"], ["schnitzel", "mdi:food-steak"],
  ["hähnchen", "mdi:food-drumstick"], ["geflügel", "mdi:food-drumstick"], ["huhn", "mdi:food-drumstick"], ["pute", "mdi:food-drumstick"],
  ["fisch", "mdi:fish"], ["lachs", "mdi:fish"],
  ["salz", "mdi:shaker-outline"], ["pfeffer", "mdi:shaker-outline"], ["gewürz", "mdi:shaker-outline"],
  ["ketchup", "mdi:bottle-tonic"], ["senf", "mdi:bottle-tonic"], ["mayo", "mdi:bottle-tonic"], ["essig", "mdi:bottle-tonic"], ["öl", "mdi:bottle-tonic"],
  ["zitrone", "mdi:fruit-citrus"], ["limette", "mdi:fruit-citrus"], ["orange", "mdi:fruit-citrus"], ["mandarine", "mdi:fruit-citrus"], ["clementine", "mdi:fruit-citrus"],
  ["traube", "mdi:fruit-grapes"], ["birne", "mdi:fruit-pear"], ["ananas", "mdi:fruit-pineapple"], ["melone", "mdi:fruit-watermelon"],
  ["kirsch", "mdi:fruit-cherries"], ["beere", "mdi:fruit-cherries"],
  ["apfel", "mdi:food-apple"], ["äpfel", "mdi:food-apple"], ["banane", "mdi:food-apple"], ["obst", "mdi:food-apple"],
  ["pilz", "mdi:mushroom"], ["champignon", "mdi:mushroom"], ["paprika", "mdi:chili-hot"], ["chili", "mdi:chili-hot"], ["mais", "mdi:corn"],
  ["karotte", "mdi:carrot"], ["möhre", "mdi:carrot"], ["gemüse", "mdi:carrot"],
  ["zwiebel", "mdi:leaf"], ["lauch", "mdi:leaf"], ["salat", "mdi:leaf"], ["kräuter", "mdi:leaf"], ["petersilie", "mdi:leaf"],
  ["schnittlauch", "mdi:leaf"], ["basilikum", "mdi:leaf"], ["spinat", "mdi:leaf"], ["brokkoli", "mdi:leaf"],
  ["chips", "mdi:popcorn"], ["popcorn", "mdi:popcorn"], ["flips", "mdi:popcorn"],
  ["nüsse", "mdi:peanut"], ["nuss", "mdi:peanut"], ["mandel", "mdi:peanut"],
  ["schoko", "mdi:candy"], ["süß", "mdi:candy"], ["bonbon", "mdi:candy"], ["gummibär", "mdi:candy"], ["gums", "mdi:candy"],
  ["keks", "mdi:cookie"],
  ["kaffee", "mdi:coffee"], ["tee", "mdi:tea"], ["bier", "mdi:beer"], ["sekt", "mdi:glass-wine"], ["wein", "mdi:glass-wine"],
  ["wasser", "mdi:water"], ["sprudel", "mdi:water"], ["limo", "mdi:bottle-soda"], ["cola", "mdi:bottle-soda"], ["saft", "mdi:bottle-soda"],
];

// English keywords (checked after the German ones)
const EK_ICONS_EN = [
  ["potato", "stc:kartoffel"], ["fries", "mdi:french-fries"], ["tomato", "stc:tomate"], ["cucumber", "stc:gurke"], ["courgette", "stc:gurke"],
  ["eggplant", "stc:aubergine"], ["cabbage", "stc:kohl"], ["kale", "stc:kohl"], ["ginger", "stc:ingwer"], ["onion", "stc:zwiebel"], ["shallot", "stc:zwiebel"], ["garlic", "stc:knoblauch"], ["chickpea", "stc:huelsenfruechte"],
  ["=peas", "stc:huelsenfruechte"], ["=beans", "stc:huelsenfruechte"], ["lentil", "stc:huelsenfruechte"], ["peach", "stc:pfirsich"],
  ["apricot", "stc:pfirsich"], ["=plum", "stc:pfirsich"], ["=plums", "stc:pfirsich"], ["prawn", "stc:garnele"], ["honey", "stc:honig"],
  ["=jam", "stc:marmelade"], ["marmalade", "stc:marmelade"], ["canned", "stc:dose"], ["=tin", "stc:dose"], ["=tins", "stc:dose"],
  ["cling film", "stc:folie"], ["=foil", "stc:folie"], ["baking paper", "stc:folie"], ["sponge", "stc:schwamm"],
  ["cleaner", "mdi:spray-bottle"], ["razor", "mdi:razor-single-edge"], ["sugar", "mdi:spoon-sugar"], ["pumpkin", "mdi:pumpkin"],
  ["cheddar", "mdi:cheese"], ["pepperoni", "mdi:sausage"],
  ["candle", "mdi:candle"], ["light bulb", "mdi:lightbulb"], ["lightbulb", "mdi:lightbulb"],
  ["hot dog", "mdi:sausage"], ["hotdog", "mdi:sausage"], ["cat ", "mdi:cat"], ["=cat", "mdi:cat"], ["=dog", "mdi:dog"], ["dog food", "mdi:dog"],
  ["fabric softener", "mdi:washing-machine"], ["laundry", "mdi:washing-machine"], ["detergent", "mdi:washing-machine"], ["dish", "mdi:dishwasher"],
  ["toilet paper", "mdi:paper-roll"], ["toilet roll", "mdi:paper-roll"], ["paper towel", "mdi:paper-roll"], ["kitchen roll", "mdi:paper-roll"], ["tissue", "mdi:paper-roll"],
  ["toothpaste", "mdi:toothbrush-paste"], ["toothbrush", "mdi:toothbrush"], ["deodorant", "mdi:spray"],
  ["soap", "mdi:hand-wash"], ["shower gel", "mdi:shower"], ["body wash", "mdi:shower"],
  ["trash bag", "mdi:trash-can"], ["bin bag", "mdi:trash-can"], ["garbage bag", "mdi:trash-can"],
  ["diaper", "mdi:baby-bottle-outline"], ["nappies", "mdi:baby-bottle-outline"], ["nappy", "mdi:baby-bottle-outline"],
  ["pill", "mdi:pill"], ["medicine", "mdi:pill"], ["painkiller", "mdi:pill"], ["band-aid", "mdi:bandage"], ["bandage", "mdi:bandage"],
  ["flower", "mdi:flower"], ["frozen", "mdi:snowflake"], ["ice tea", "mdi:tea"], ["iced tea", "mdi:tea"], ["ice cream", "mdi:ice-cream"], ["=ice", "mdi:ice-cream"],
  ["cream cheese", "mdi:cheese"], ["milk", "mdi:cup"], ["yogurt", "mdi:cup"], ["yoghurt", "mdi:cup"], ["cream", "mdi:cup"],
  ["cheese", "mdi:cheese"], ["=egg", "mdi:egg"], ["=eggs", "mdi:egg"],
  ["croissant", "mdi:food-croissant"], ["pretzel", "mdi:food-croissant"], ["bread", "mdi:bread-slice"], ["=roll", "mdi:bread-slice"], ["=rolls", "mdi:bread-slice"], ["bagel", "mdi:bread-slice"],
  ["cupcake", "mdi:cupcake"], ["=cake", "mdi:cupcake"],
  ["flour", "mdi:grain"], ["yeast", "mdi:grain"], ["cereal", "mdi:grain"], ["oats", "mdi:grain"], ["oatmeal", "mdi:grain"],
  ["noodle", "mdi:pasta"], ["=rice", "mdi:rice"],
  ["sausage", "mdi:sausage"], ["bacon", "mdi:food-steak"], ["=ham", "mdi:food-steak"], ["beef", "mdi:food-steak"], ["pork", "mdi:food-steak"], ["meat", "mdi:food-steak"], ["mince", "mdi:food-steak"],
  ["chicken", "mdi:food-drumstick"], ["turkey", "mdi:food-drumstick"],
  ["fish", "mdi:fish"], ["salmon", "mdi:fish"], ["tuna", "mdi:fish"],
  ["=salt", "mdi:shaker-outline"], ["black pepper", "mdi:shaker-outline"], ["spice", "mdi:shaker-outline"],
  ["mustard", "mdi:bottle-tonic"], ["vinegar", "mdi:bottle-tonic"], ["=oil", "mdi:bottle-tonic"], ["olive oil", "mdi:bottle-tonic"],
  ["lemon", "mdi:fruit-citrus"], ["=lime", "mdi:fruit-citrus"], ["=limes", "mdi:fruit-citrus"], ["tangerine", "mdi:fruit-citrus"],
  ["grape", "mdi:fruit-grapes"], ["=pear", "mdi:fruit-pear"], ["=pears", "mdi:fruit-pear"], ["pineapple", "mdi:fruit-pineapple"], ["melon", "mdi:fruit-watermelon"],
  ["cherr", "mdi:fruit-cherries"], ["berr", "mdi:fruit-cherries"],
  ["apple", "mdi:food-apple"], ["banana", "mdi:food-apple"], ["fruit", "mdi:food-apple"],
  ["mushroom", "mdi:mushroom"], ["bell pepper", "mdi:chili-hot"], ["=peppers", "mdi:chili-hot"], ["=corn", "mdi:corn"], ["sweetcorn", "mdi:corn"],
  ["carrot", "mdi:carrot"], ["vegetable", "mdi:carrot"], ["veggie", "mdi:carrot"],
  ["onion", "mdi:leaf"], ["leek", "mdi:leaf"], ["lettuce", "mdi:leaf"], ["salad", "mdi:leaf"], ["=herbs", "mdi:leaf"], ["parsley", "mdi:leaf"], ["basil", "mdi:leaf"], ["spinach", "mdi:leaf"], ["broccoli", "mdi:leaf"],
  ["crisps", "mdi:popcorn"], ["=nuts", "mdi:peanut"], ["peanut", "mdi:peanut"], ["almond", "mdi:peanut"],
  ["chocolate", "mdi:candy"], ["candy", "mdi:candy"], ["sweets", "mdi:candy"], ["gummy", "mdi:candy"],
  ["cookie", "mdi:cookie"], ["biscuit", "mdi:cookie"],
  ["coffee", "mdi:coffee"], ["teabag", "mdi:tea"], ["=tea", "mdi:tea"], ["beer", "mdi:beer"], ["wine", "mdi:glass-wine"], ["prosecco", "mdi:glass-wine"], ["champagne", "mdi:glass-wine"],
  ["water", "mdi:water"], ["lemonade", "mdi:bottle-soda"], ["soda", "mdi:bottle-soda"], ["coke", "mdi:bottle-soda"], ["juice", "mdi:bottle-soda"],
];

const EK_TEXT = {
  de: {
    title: "Einkaufsliste", open: (n) => `${n} offen`, more: "weitere", showAll: "Alle anzeigen",
    showAllItems: "Alle offenen Artikel anzeigen", allOpen: "alle offenen", add: "Artikel hinzufügen", addBtn: "Hinzufügen",
    undo: "Rückgängig", done: (n) => `„${n}“ abgehakt.`, empty: "Alles eingekauft 🎉", loading: "Lade …",
    error: "Liste nicht lesbar", unavailable: "Liste nicht verfügbar", close: "Schließen", tap: "Antippen zum Abhaken",
    needEntity: "Bitte eine todo-Entität angeben (z. B. todo.zuhause)",
    needFavEntity: "favorites_entity muss eine todo-Entität sein (z. B. todo.favoriten)",
    recent: "Zuletzt:", recentTitle: "Zuletzt gekauft", readd: "Antippen, um wieder auf die Liste zu setzen",
    favTitle: "Favoriten", favAdd: "Antippen, um auf die Liste zu setzen",
    favAddBtn: "Zu Favoriten hinzufügen", favRemove: "Aus Favoriten entfernen", favItem: "Favorit", favFail: "Favoriten-Liste nicht erreichbar",
    hold: "lange drücken zum Bearbeiten", edit: "Artikel bearbeiten", name: "Name", desc: "Angabe (z. B. 1 kg, Bio)",
    save: "Speichern", del: "Löschen", cancel: "Abbrechen", saveFail: "Speichern nicht möglich", undoFail: "Rückgängig hat nicht geklappt",
    deleted: (n) => `„${n}“ gelöscht.`, doneN: (n) => `${n} Artikel abgehakt.`, changes: (n) => `${n} Änderungen.`,
    keys: "Enter: abhaken, F2 oder Kontextmenü-Taste: bearbeiten",
  },
  en: {
    title: "Shopping list", open: (n) => `${n} open`, more: "more", showAll: "Show all",
    showAllItems: "Show all open items", allOpen: "all open", add: "Add item", addBtn: "Add",
    undo: "Undo", done: (n) => `“${n}” checked off.`, empty: "All done 🎉", loading: "Loading …",
    error: "Could not read the list", unavailable: "List not available", close: "Close", tap: "Tap to check off",
    needEntity: "Please set a todo entity (e.g. todo.shopping_list)",
    needFavEntity: "favorites_entity must be a todo entity (e.g. todo.favorites)",
    recent: "Recent:", recentTitle: "Recently bought", readd: "Tap to add it to the list again",
    favTitle: "Favorites", favAdd: "Tap to add it to the list",
    favAddBtn: "Add to favorites", favRemove: "Remove from favorites", favItem: "Favorite", favFail: "Favorites list not reachable",
    hold: "long press to edit", edit: "Edit item", name: "Name", desc: "Details (e.g. 1 kg, organic)",
    save: "Save", del: "Delete", cancel: "Cancel", saveFail: "Could not save", undoFail: "Undo failed",
    deleted: (n) => `“${n}” deleted.`, doneN: (n) => `${n} items checked off.`, changes: (n) => `${n} changes.`,
    keys: "Enter: check off, F2 or context menu key: edit",
  },
};

// Bereiche mit Farbe je Symbol / categories with a colour per icon
const EK_BEREICHE = [
  ["green", "76,175,80", ["fruit-citrus", "fruit-grapes", "fruit-pear", "fruit-pineapple", "fruit-watermelon", "fruit-cherries",
    "food-apple", "mushroom", "chili-hot", "corn", "carrot", "leaf", "pumpkin",
    "kartoffel", "tomate", "gurke", "aubergine", "avocado", "kohl", "ingwer", "huelsenfruechte", "oliven", "pfirsich", "kiwi", "zwiebel", "knoblauch"]],
  ["blue", "33,150,243", ["cup", "cheese", "egg", "ice-cream", "snowflake", "butter", "tofu"]],
  ["red", "244,67,54", ["sausage", "food-steak", "food-drumstick", "fish", "garnele"]],
  ["amber", "255,152,0", ["bread-slice", "food-croissant", "baguette", "muffin", "pizza", "grain", "pasta", "rice", "shaker-outline", "bottle-tonic",
    "french-fries", "spoon-sugar", "honig", "marmelade", "dose", "wrap"]],
  ["purple", "156,39,176", ["paper-roll", "toothbrush-paste", "toothbrush", "spray", "hand-wash", "shower", "washing-machine", "dishwasher",
    "trash-can", "battery", "baby-bottle-outline", "pill", "bandage", "candle", "lightbulb", "shoe-sneaker",
    "spray-bottle", "razor-single-edge", "grill", "eye", "folie", "schwamm"]],
  ["teal", "0,150,136", ["coffee", "tea", "beer", "glass-wine", "water", "bottle-soda"]],
  ["pink", "233,30,99", ["candy", "cookie", "cupcake", "popcorn", "peanut"]],
];

// Eigene Symbole (stc:…), einfarbige Pfade 24 × 24, eigene Entwürfe unter MIT-Lizenz.
// Als Symbolsatz registriert – nutzbar auch in anderen Karten, z. B. icon: stc:kartoffel
// Own icons (stc:…), single-colour 24 × 24 paths, original designs under the MIT license.
// Registered as an icon set – also usable in other cards, e.g. icon: stc:kartoffel
const STC_ICONS = {
  kartoffel: "M10 3C14 2 20 5 21 10C23 16 17 21 11 21C6 22 2 18 2 14C2 10 6 4 10 3ZM9 11a1 1 0 1 0 -2 0a1 1 0 1 0 2 0ZM16 8a1 1 0 1 0 -2 0a1 1 0 1 0 2 0ZM15 16a1 1 0 1 0 -2 0a1 1 0 1 0 2 0Z",
  tomate: "M9 7L12 8L15 7C19 7 22 10 22 14C22 19 18 22 12 22C6 22 2 19 2 14C2 10 5 7 9 7ZM11 2H13V5L18 4L15 7L12 6L9 7L6 4L11 5Z",
  gurke: "M6.15 21.25L5.23 21.77L4.19 21.89L3.17 21.61L2.35 20.95L1.83 20.03L1.71 18.99L1.99 17.97L2.28 17.18L2.59 16.40L2.92 15.64L3.29 14.89L3.68 14.17L4.09 13.46L4.52 12.77L4.97 12.10L5.45 11.45L5.94 10.81L6.44 10.19L6.97 9.59L7.50 9L8.05 8.43L8.61 7.88L9.19 7.34L9.77 6.82L10.37 6.31L10.99 5.83L11.62 5.36L12.27 4.92L12.93 4.50L13.61 4.11L14.30 3.74L15.01 3.40L15.73 3.09L16.46 2.82L17.21 2.57L18.23 2.31L19.28 2.45L20.19 2.98L20.83 3.81L21.09 4.83L20.95 5.88L20.42 6.79L19.59 7.43L19.06 7.82L18.54 8.22L18.03 8.61L17.52 8.99L17.02 9.38L16.52 9.77L16.03 10.16L15.55 10.55L15.06 10.95L14.59 11.35L14.12 11.77L13.66 12.19L13.20 12.62L12.75 13.07L12.31 13.52L11.88 13.99L11.45 14.48L11.03 14.97L10.61 15.47L10.19 15.98L9.78 16.50L9.37 17.04L8.95 17.58L8.53 18.13L8.11 18.69L7.68 19.26L7.25 19.84L6.81 20.43ZM20.03 3.32L22.05 2.44L22.66 3.70L20.73 4.75ZM8.23 15.37L8.07 15.13L7.82 14.96L7.54 14.91L7.25 14.96L7.01 15.13L6.84 15.37L6.79 15.66L6.84 15.94L7.01 16.19L7.25 16.35L7.54 16.41L7.82 16.35L8.07 16.19L8.23 15.94L8.29 15.66ZM9.25 10.97L9.09 10.73L8.84 10.56L8.56 10.51L8.27 10.56L8.03 10.73L7.86 10.97L7.81 11.26L7.86 11.54L8.03 11.79L8.27 11.95L8.56 12.01L8.84 11.95L9.09 11.79L9.25 11.54L9.31 11.26ZM13.42 9.52L13.26 9.27L13.01 9.11L12.73 9.06L12.44 9.11L12.20 9.27L12.03 9.52L11.98 9.81L12.03 10.09L12.20 10.34L12.44 10.50L12.73 10.56L13.01 10.50L13.26 10.34L13.42 10.09L13.48 9.81ZM15.21 6.02L15.05 5.78L14.80 5.62L14.52 5.56L14.23 5.62L13.99 5.78L13.82 6.02L13.77 6.31L13.82 6.60L13.99 6.84L14.23 7L14.52 7.06L14.80 7L15.05 6.84L15.21 6.60L15.27 6.31Z",
  aubergine: "M10 7L14 9L18 8C20 13 18 18 14 21C11 23 6 22 4 19C1 15 4 10 10 7ZM14 2H16C16 4 15 5 15 6L20 6L18 10L15 8L13 11L11 8L8 8L12 5C13 4 14 4 14 2Z",
  avocado: "M12 2C15 2 16 6 18 9C20 12 22 15 20 18C18 23 6 23 4 18C2 15 4 12 6 9C8 6 9 2 12 2ZM16 15a4 4 0 1 0 -8 0a4 4 0 1 0 8 0Z",
  kohl: "M12 2C18 2 22 7 22 13C22 18 18 22 12 22C6 22 2 18 2 13C2 7 6 2 12 2ZM11 6V13L7 9L5.5 10.5L11 16V20H13V16L18.5 10.5L17 9L13 13V6ZM4 13C4 17 6 19 9 20V18C7 17 6 15 6 13ZM18 13C18 15 17 17 15 18V20C18 19 20 17 20 13Z",
  ingwer: "M6 9V6C6 3 10 3 10 6V9H12L13 6C14 4 18 4 18 7V10C20 10 22 11 22 13C22 15 21 17 18 17H16V20C16 23 12 23 11 20L10 18H7C4 18 2 16 2 13C2 11 3 9 6 9ZM7 11L5.8 14.5L7.3 15L8.5 11.5ZM15.2 11L14 14.5L15.5 15L16.7 11.5Z",
  huelsenfruechte: "M2.86 18.95L2.54 18.16L2.38 17.41L2.28 16.67L2.23 15.94L2.23 15.21L2.26 14.49L2.34 13.77L2.45 13.07L2.61 12.37L2.80 11.69L3.03 11.01L3.30 10.36L3.60 9.72L3.95 9.10L4.32 8.50L4.74 7.93L5.18 7.38L5.66 6.86L6.17 6.37L6.71 5.91L7.27 5.48L7.87 5.09L8.48 4.72L9.12 4.40L9.78 4.11L10.45 3.85L11.14 3.64L11.85 3.46L12.57 3.31L13.29 3.21L14.03 3.13L14.78 3.10L15.53 3.10L16.30 3.14L17.06 3.21L17.83 3.33L18.60 3.48L19.38 3.68L20.17 3.93L20.97 4.35L21.03 4.65L20.45 5.33L19.87 5.87L19.31 6.38L18.77 6.86L18.25 7.33L17.75 7.79L17.28 8.23L16.82 8.66L16.38 9.08L15.96 9.48L15.55 9.87L15.15 10.25L14.77 10.62L14.40 10.97L14.04 11.31L13.68 11.64L13.33 11.96L12.98 12.26L12.64 12.56L12.29 12.84L11.94 13.12L11.59 13.39L11.23 13.65L10.86 13.91L10.49 14.17L10.10 14.43L9.71 14.69L9.30 14.95L8.88 15.22L8.45 15.50L8 15.79L7.55 16.09L7.07 16.41L6.59 16.74L6.08 17.08L5.57 17.45L5.03 17.83L4.47 18.23L3.88 18.65L3.14 19.05ZM3.90 16.70L4.43 16.41L4.84 16.09L5.22 15.77L5.59 15.45L5.94 15.14L6.29 14.84L6.64 14.54L6.97 14.25L7.31 13.96L7.64 13.68L7.97 13.40L8.29 13.13L8.62 12.87L8.94 12.60L9.26 12.34L9.57 12.08L9.89 11.82L10.21 11.56L10.53 11.31L10.85 11.05L11.17 10.79L11.49 10.53L11.82 10.27L12.15 10.01L12.48 9.74L12.82 9.47L13.17 9.20L13.52 8.93L13.87 8.65L14.24 8.37L14.61 8.09L14.99 7.80L15.38 7.51L15.77 7.21L16.18 6.91L16.59 6.60L17.02 6.28L17.45 5.95L17.88 5.58L18.30 5.10L18.30 5.09L17.68 4.89L17.11 4.82L16.54 4.80L15.98 4.81L15.42 4.85L14.88 4.91L14.34 4.99L13.80 5.08L13.28 5.20L12.76 5.34L12.25 5.49L11.75 5.67L11.26 5.86L10.78 6.07L10.32 6.30L9.86 6.55L9.41 6.81L8.98 7.09L8.56 7.39L8.15 7.70L7.76 8.03L7.38 8.38L7.02 8.74L6.67 9.11L6.34 9.50L6.03 9.90L5.74 10.32L5.46 10.74L5.20 11.18L4.96 11.63L4.74 12.09L4.54 12.56L4.36 13.04L4.20 13.52L4.06 14.02L3.94 14.52L3.85 15.04L3.79 15.56L3.78 16.10L3.90 16.70ZM8.05 12.65L7.96 13.20L7.72 13.68L7.33 14.07L6.84 14.32L6.30 14.40L5.76 14.32L5.27 14.07L4.88 13.68L4.64 13.20L4.55 12.65L4.64 12.11L4.88 11.63L5.27 11.24L5.76 10.99L6.30 10.90L6.84 10.99L7.33 11.24L7.72 11.63L7.96 12.11ZM11.25 9.38L11.16 9.92L10.92 10.40L10.53 10.79L10.04 11.04L9.50 11.12L8.96 11.04L8.47 10.79L8.08 10.40L7.84 9.92L7.75 9.38L7.84 8.83L8.08 8.35L8.47 7.96L8.96 7.71L9.50 7.62L10.04 7.71L10.53 7.96L10.92 8.35L11.16 8.83ZM15.25 6.86L15.16 7.40L14.92 7.88L14.53 8.27L14.04 8.52L13.50 8.61L12.96 8.52L12.47 8.27L12.08 7.88L11.84 7.40L11.75 6.86L11.84 6.31L12.08 5.83L12.47 5.44L12.96 5.19L13.50 5.11L14.04 5.19L14.53 5.44L14.92 5.83L15.16 6.31ZM20.20 4.30L22.60 2.20L23 2.80L21 5.20Z",
  oliven: "M11 2H13V6L18 10L17 12L12 8L8 12L6 11L11 6ZM14 3C18 2 21 3 22 6C18 7 15 6 14 3ZM7 11C10 11 11 14 10 17C9 20 7 22 4 21C1 20 2 16 3 14C4 12 5 11 7 11ZM17 12C20 12 22 14 22 17C22 20 20 22 17 22C14 22 13 20 13 17C13 14 14 12 17 12Z",
  pfirsich: "M11 7C12 6 14 6 16 7C21 8 22 12 21 16C20 20 16 21 12 22C8 21 4 20 3 16C2 12 3 8 8 7H9C7 10 7 14 10 18L11.5 17C9 13 9 10 11 7ZM12 5C13 2 17 2 20 2C19 5 16 7 12 5Z",
  kiwi: "M12 2C18 2 22 6 22 12C22 18 18 22 12 22C6 22 2 18 2 12C2 6 6 2 12 2ZM14 12a2 2 0 1 0 -4 0a2 2 0 1 0 4 0ZM18.35 12a0.85 0.85 0 1 0 -1.7 0a0.85 0.85 0 1 0 1.7 0ZM16.7391 15.8891a0.85 0.85 0 1 0 -1.7 0a0.85 0.85 0 1 0 1.7 0ZM12.85 17.5a0.85 0.85 0 1 0 -1.7 0a0.85 0.85 0 1 0 1.7 0ZM8.96091 15.8891a0.85 0.85 0 1 0 -1.7 0a0.85 0.85 0 1 0 1.7 0ZM7.35 12a0.85 0.85 0 1 0 -1.7 0a0.85 0.85 0 1 0 1.7 0ZM8.96091 8.11091a0.85 0.85 0 1 0 -1.7 0a0.85 0.85 0 1 0 1.7 0ZM12.85 6.5a0.85 0.85 0 1 0 -1.7 0a0.85 0.85 0 1 0 1.7 0ZM16.7391 8.11091a0.85 0.85 0 1 0 -1.7 0a0.85 0.85 0 1 0 1.7 0Z",
  zwiebel: "M13.39 3.29L13.10 3.62L12.87 3.97L18.31 8.73L18.95 9.43L19.50 10.18L19.80 10.71L20.06 11.26L20.37 12.14L20.49 12.70L20.57 13.29L20.60 13.89L20.57 14.49L20.50 15.08L20.37 15.66L20.18 16.24L19.95 16.80L19.67 17.34L19.34 17.86L18.96 18.36L18.55 18.83L18.09 19.27L17.59 19.67L17.05 20.05L16.49 20.38L15.90 20.68L15.28 20.92L14.65 21.13L13.90 21.31L14.34 22.53L14.31 22.79L14.21 22.93L14.06 23.02L13.88 23.05L13.71 23.01L13.52 22.84L12.99 21.45L12.45 21.49L12.44 23.09L12.37 23.25L12.25 23.37L12.00 23.45L11.75 23.37L11.63 23.25L11.56 23.09L11.55 21.49L11.01 21.45L10.48 22.84L10.29 23.01L10.12 23.05L9.94 23.02L9.79 22.93L9.69 22.79L9.66 22.53L10.10 21.31L9.35 21.13L8.70 20.92L8.09 20.67L7.23 20.22L6.68 19.87L6.15 19.47L5.68 19.05L5.05 18.37L4.66 17.86L4.33 17.34L4.05 16.80L3.73 15.97L3.56 15.37L3.46 14.78L3.41 14.19L3.43 13.31L3.50 12.72L3.63 12.14L3.82 11.56L4.05 11.00L4.33 10.46L4.66 9.94L5.04 9.44L5.45 8.97L5.92 8.52L11.37 3.76L11.61 3.59L11.93 3.51L12.13 3.16L12.37 2.84L12.65 2.54L12.96 2.27L13.33 2.01L13.88 1.73L14.08 1.68L14.28 1.71L14.37 1.75L14.52 1.89L14.61 2.07L14.62 2.28L14.55 2.47L14.41 2.62L13.87 2.91ZM10.84 7.03L10.21 7.67L9.67 8.30L9.21 8.90L8.79 9.52L8.43 10.16L8.10 10.83L7.86 11.46L7.66 12.12L7.52 12.79L7.43 13.51L7.40 14.19L7.42 14.85L7.51 15.58L7.65 16.28L7.84 16.98L8.08 17.66L8.40 18.40L8.76 19.12L9.17 19.84L9.68 20.61L9.82 20.71L9.99 20.75L10.16 20.72L10.37 20.56L10.44 20.40L10.44 20.22L10.38 20.06L9.93 19.36L9.54 18.68L9.21 18.01L8.93 17.35L8.70 16.70L8.52 16.05L8.40 15.42L8.32 14.79L8.30 14.17L8.32 13.56L8.40 12.96L8.53 12.36L8.71 11.77L8.94 11.18L9.22 10.59L9.55 10.01L9.94 9.43L10.38 8.86L10.87 8.29L11.42 7.71L11.52 7.56L11.54 7.30L11.41 7.08L11.26 6.98L11.09 6.95ZM12.58 7.71L13.13 8.29L13.62 8.86L14.06 9.43L14.45 10.01L14.78 10.59L15.06 11.18L15.29 11.77L15.47 12.36L15.60 12.96L15.68 13.56L15.70 14.17L15.68 14.79L15.60 15.42L15.48 16.05L15.30 16.70L15.07 17.35L14.79 18.01L14.46 18.68L14.07 19.36L13.62 20.06L13.56 20.22L13.59 20.48L13.69 20.62L13.84 20.72L14.01 20.75L14.18 20.71L14.32 20.61L14.83 19.84L15.24 19.12L15.60 18.40L15.92 17.66L16.16 16.98L16.35 16.28L16.50 15.54L16.57 14.88L16.60 14.19L16.57 13.47L16.48 12.79L16.35 12.15L16.14 11.46L15.88 10.80L15.57 10.16L15.21 9.52L14.80 8.92L14.33 8.30L13.80 7.69L13.22 7.09L13.08 6.99L12.91 6.95L12.74 6.98L12.53 7.14L12.46 7.30L12.46 7.48Z",
  knoblauch: "M2.06 14.09L2.15 13.91L2.16 13.89L2.25 13.71L2.26 13.69L2.37 13.52L2.38 13.50L2.50 13.34L2.50 13.34L2.51 13.32L2.51 13.31L2.51 13.30L2.50 13.01L2.50 12.99L2.51 12.70L2.51 12.68L2.53 12.39L2.53 12.38L2.57 12.08L2.57 12.07L2.62 11.78L2.62 11.76L2.69 11.48L2.69 11.46L2.77 11.18L2.77 11.16L2.87 10.88L2.87 10.87L2.98 10.60L2.98 10.58L3.10 10.31L3.11 10.30L3.24 10.04L3.25 10.02L3.39 9.77L3.40 9.75L3.56 9.51L3.57 9.49L3.74 9.25L3.74 9.24L7.89 3.91L7.90 3.89L7.90 3.88L7.90 2.90L7.91 2.84L7.92 2.79L7.95 2.73L7.99 2.69L8.03 2.65L8.09 2.62L8.14 2.61L8.20 2.60L9.40 2.60L9.46 2.61L9.51 2.62L9.57 2.65L9.61 2.69L9.65 2.73L9.68 2.79L9.69 2.84L9.70 2.90L9.70 3.88L9.70 3.89L9.71 3.91L13.86 9.24L13.86 9.25L14.03 9.49L14.04 9.51L14.20 9.75L14.21 9.77L14.35 10.02L14.36 10.04L14.49 10.30L14.50 10.31L14.62 10.58L14.62 10.60L14.73 10.87L14.73 10.88L14.83 11.16L14.83 11.18L14.91 11.46L14.91 11.48L14.98 11.76L14.98 11.78L15.03 12.07L15.03 12.08L15.07 12.38L15.07 12.39L15.09 12.68L15.09 12.70L15.10 12.99L15.10 13.01L15.09 13.30L15.09 13.31L15.09 13.32L15.10 13.34L15.10 13.34L15.22 13.50L15.23 13.52L15.34 13.69L15.35 13.71L15.44 13.89L15.45 13.91L15.54 14.09L15.54 14.11L15.62 14.30L15.62 14.32L15.68 14.51L15.69 14.53L15.73 14.73L15.74 14.75L15.77 14.95L15.77 14.97L15.79 15.17L15.79 15.19L15.80 15.39L15.80 15.41L15.79 15.61L15.79 15.63L15.77 15.83L15.77 15.85L15.74 16.05L15.73 16.07L15.69 16.27L15.68 16.29L15.62 16.48L15.62 16.50L15.54 16.69L15.54 16.71L15.45 16.89L15.44 16.91L15.35 17.09L15.34 17.11L15.23 17.28L15.22 17.30L15.10 17.46L15.09 17.48L14.96 17.63L14.95 17.65L14.81 17.80L14.80 17.81L14.65 17.95L14.63 17.96L14.48 18.09L14.46 18.10L14.30 18.22L14.28 18.23L14.11 18.34L14.09 18.35L13.91 18.44L13.89 18.45L13.71 18.54L13.69 18.54L13.50 18.62L13.48 18.62L13.29 18.68L13.27 18.69L13.07 18.73L13.05 18.74L12.85 18.77L12.83 18.77L12.63 18.79L12.61 18.79L12.41 18.80L12.39 18.80L12.19 18.79L12.17 18.79L11.97 18.77L11.95 18.77L11.75 18.74L11.73 18.73L11.53 18.69L11.51 18.68L11.32 18.62L11.30 18.62L11.31 18.58L11.31 18.57L11.51 17.85L11.51 17.84L11.68 17.13L11.68 17.11L11.82 16.41L11.83 16.40L11.94 15.71L11.94 15.70L12.02 15.03L12.03 15.01L12.08 14.35L12.08 14.33L12.11 13.68L12.11 13.66L12.11 13.02L12.11 13.01L12.07 12.38L12.07 12.36L12.01 11.75L12.01 11.73L11.92 11.13L11.92 11.11L11.80 10.52L11.80 10.50L11.66 9.92L11.65 9.90L11.48 9.33L11.47 9.31L11.27 8.76L11.26 8.74L11.03 8.20L11.02 8.18L10.76 7.65L10.75 7.63L10.47 7.11L10.46 7.09L10.14 6.59L10.09 6.53L10.03 6.47L9.96 6.44L9.89 6.41L9.81 6.40L9.73 6.41L9.66 6.43L9.59 6.46L9.53 6.51L9.47 6.57L9.44 6.64L9.41 6.71L9.40 6.79L9.41 6.87L9.43 6.94L9.46 7.01L9.77 7.51L10.05 8.01L10.30 8.52L10.52 9.04L10.71 9.58L10.88 10.12L11.02 10.68L11.13 11.25L11.22 11.83L11.28 12.43L11.31 13.04L11.31 13.66L11.28 14.29L11.23 14.93L11.15 15.59L11.04 16.26L10.90 16.95L10.74 17.65L10.54 18.35L10.32 19.08L10.30 19.16L10.37 19.20L10.42 19.26L10.46 19.32L10.49 19.40L10.99 21.30L11.00 21.38L11.00 21.45L10.98 21.53L10.95 21.60L10.90 21.67L10.84 21.72L10.78 21.76L10.70 21.79L10.62 21.80L10.55 21.80L10.47 21.78L10.40 21.75L10.33 21.70L10.28 21.64L10.24 21.58L10.21 21.50L9.71 19.60L9.70 19.52L9.70 19.48L9.51 19.53L9.49 19.53L9.28 19.57L9.26 19.57L9.18 19.58L9.19 19.62L9.20 19.70L9.20 21.80L9.19 21.88L9.17 21.95L9.13 22.02L9.08 22.08L9.02 22.13L8.95 22.17L8.88 22.19L8.80 22.20L8.72 22.19L8.65 22.17L8.58 22.13L8.52 22.08L8.47 22.02L8.43 21.95L8.41 21.88L8.40 21.80L8.40 19.70L8.41 19.62L8.42 19.58L8.34 19.57L8.32 19.57L8.11 19.53L8.09 19.53L7.90 19.48L7.90 19.52L7.89 19.60L7.39 21.50L7.36 21.58L7.32 21.64L7.27 21.70L7.20 21.75L7.13 21.78L7.05 21.80L6.98 21.80L6.90 21.79L6.82 21.76L6.76 21.72L6.70 21.67L6.65 21.60L6.62 21.53L6.60 21.45L6.60 21.38L6.61 21.30L7.11 19.40L7.14 19.32L7.18 19.26L7.23 19.20L7.30 19.16L7.28 19.08L7.06 18.35L6.86 17.65L6.70 16.95L6.56 16.26L6.45 15.59L6.37 14.93L6.32 14.29L6.29 13.66L6.29 13.04L6.32 12.43L6.38 11.83L6.47 11.25L6.58 10.68L6.72 10.12L6.89 9.58L7.08 9.04L7.30 8.52L7.55 8.01L7.83 7.51L8.14 7.01L8.17 6.94L8.19 6.87L8.20 6.79L8.19 6.71L8.16 6.64L8.13 6.57L8.07 6.51L8.01 6.46L7.94 6.43L7.87 6.41L7.79 6.40L7.71 6.41L7.64 6.44L7.57 6.47L7.51 6.53L7.46 6.59L7.14 7.09L7.13 7.11L6.85 7.63L6.84 7.65L6.58 8.18L6.57 8.20L6.34 8.74L6.33 8.76L6.13 9.31L6.12 9.33L5.95 9.90L5.94 9.92L5.80 10.50L5.80 10.52L5.68 11.11L5.68 11.13L5.59 11.73L5.59 11.75L5.53 12.36L5.53 12.38L5.49 13.01L5.49 13.02L5.49 13.66L5.49 13.68L5.52 14.33L5.52 14.35L5.57 15.01L5.58 15.03L5.66 15.70L5.66 15.71L5.77 16.40L5.78 16.41L5.92 17.11L5.92 17.13L6.09 17.84L6.09 17.85L6.29 18.57L6.29 18.58L6.30 18.62L6.28 18.62L6.09 18.68L6.07 18.69L5.87 18.73L5.85 18.74L5.65 18.77L5.63 18.77L5.43 18.79L5.41 18.79L5.21 18.80L5.19 18.80L4.99 18.79L4.97 18.79L4.77 18.77L4.75 18.77L4.55 18.74L4.53 18.73L4.33 18.69L4.31 18.68L4.12 18.62L4.10 18.62L3.91 18.54L3.89 18.54L3.71 18.45L3.69 18.44L3.51 18.35L3.49 18.34L3.32 18.23L3.30 18.22L3.14 18.10L3.12 18.09L2.97 17.96L2.95 17.95L2.80 17.81L2.79 17.80L2.65 17.65L2.64 17.63L2.51 17.48L2.50 17.46L2.38 17.30L2.37 17.28L2.26 17.11L2.25 17.09L2.16 16.91L2.15 16.89L2.06 16.71L2.06 16.69L1.98 16.50L1.98 16.48L1.92 16.29L1.91 16.27L1.87 16.07L1.86 16.05L1.83 15.85L1.83 15.83L1.81 15.63L1.81 15.61L1.80 15.41L1.80 15.39L1.81 15.19L1.81 15.17L1.83 14.97L1.83 14.95L1.86 14.75L1.87 14.73L1.91 14.53L1.92 14.51L1.98 14.32L1.98 14.30L2.06 14.11ZM22.31 11.42L22.37 11.41L22.38 11.41L22.44 11.41L22.45 11.41L22.50 11.42L22.51 11.43L22.57 11.45L22.58 11.45L22.62 11.49L22.63 11.49L22.67 11.54L22.68 11.54L22.71 11.59L22.71 11.60L22.74 11.66L22.74 11.67L22.75 11.72L22.75 11.73L22.75 11.79L22.16 17.14L22.16 17.14L22.15 17.27L22.14 17.29L22.12 17.41L22.12 17.43L22.09 17.55L22.08 17.57L22.04 17.69L22.04 17.71L21.99 17.82L21.98 17.84L21.93 17.95L21.92 17.97L21.86 18.08L21.85 18.10L21.79 18.20L21.77 18.22L21.70 18.32L21.69 18.33L21.61 18.43L21.60 18.44L21.51 18.53L21.50 18.55L21.40 18.63L21.39 18.64L21.29 18.72L21.28 18.73L21.17 18.80L21.16 18.82L21.05 18.88L21.03 18.89L20.92 18.95L20.91 18.95L20.79 19.00L20.77 19.01L20.66 19.05L20.64 19.06L20.52 19.09L20.50 19.10L20.38 19.13L20.36 19.13L20.24 19.15L20.22 19.15L20.09 19.16L20.07 19.16L19.95 19.16L19.93 19.16L19.80 19.16L19.78 19.16L19.66 19.14L19.64 19.14L19.52 19.12L19.50 19.11L19.38 19.08L19.36 19.08L19.24 19.04L19.22 19.04L19.11 18.99L19.09 18.98L18.98 18.93L18.96 18.92L18.85 18.86L18.83 18.85L18.73 18.78L18.71 18.77L18.61 18.70L18.60 18.69L18.50 18.61L18.49 18.59L18.40 18.51L18.38 18.49L18.30 18.40L18.29 18.39L18.21 18.29L18.20 18.27L18.13 18.17L18.12 18.15L18.05 18.05L18.04 18.03L17.99 17.92L17.98 17.90L17.93 17.79L17.92 17.77L17.88 17.65L17.87 17.64L17.84 17.52L17.83 17.50L17.81 17.38L17.80 17.36L17.78 17.23L17.78 17.21L17.77 17.09L17.77 17.07L17.77 16.95L17.77 16.93L17.77 16.80L17.78 16.78L17.79 16.66L17.79 16.64L17.81 16.52L17.82 16.50L17.85 16.38L17.85 16.36L17.89 16.24L17.90 16.22L17.94 16.11L17.95 16.09L18.00 15.98L18.01 15.96L18.07 15.85L18.08 15.83L18.15 15.73L18.16 15.71L18.23 15.61L18.25 15.60L18.33 15.50L18.34 15.49L22.15 11.52L22.17 11.49L22.19 11.48L22.24 11.45L22.25 11.45L22.30 11.42ZM22.11 21.55L22.12 21.56L22.15 21.60L22.15 21.61L22.17 21.66L22.18 21.67L22.19 21.73L22.19 21.74L22.19 21.79L22.18 21.80L22.17 21.86L22.17 21.86L22.15 21.91L22.14 21.92L22.11 21.97L22.10 21.98L22.06 22.01L22.06 22.02L22.01 22.05L22.00 22.05L21.95 22.07L17.03 23.46L17.03 23.46L16.91 23.49L16.89 23.50L16.78 23.52L16.76 23.52L16.64 23.54L16.62 23.54L16.50 23.55L16.48 23.55L16.37 23.55L16.35 23.55L16.23 23.55L16.21 23.54L16.09 23.53L16.08 23.53L15.96 23.51L15.94 23.50L15.83 23.47L15.81 23.47L15.70 23.43L15.68 23.42L15.57 23.38L15.55 23.37L15.45 23.32L15.43 23.31L15.33 23.26L15.31 23.25L15.21 23.18L15.20 23.17L15.10 23.10L15.09 23.09L15.00 23.01L14.98 23.00L14.90 22.92L14.89 22.90L14.81 22.81L14.80 22.80L14.72 22.71L14.71 22.69L14.65 22.59L14.64 22.58L14.58 22.48L14.57 22.46L14.51 22.36L14.51 22.34L14.46 22.23L14.45 22.21L14.41 22.10L14.41 22.08L14.38 21.97L14.37 21.95L14.35 21.84L14.34 21.82L14.33 21.70L14.32 21.68L14.32 21.56L14.31 21.55L14.31 21.43L14.31 21.41L14.32 21.29L14.32 21.27L14.34 21.16L14.34 21.14L14.36 21.02L14.36 21.00L14.39 20.89L14.40 20.87L14.44 20.76L14.44 20.74L14.49 20.63L14.49 20.61L14.55 20.51L14.55 20.49L14.61 20.39L14.62 20.37L14.69 20.27L14.70 20.26L14.77 20.16L14.78 20.15L14.86 20.06L14.87 20.05L14.95 19.96L14.96 19.95L15.05 19.87L15.07 19.86L15.16 19.78L15.17 19.77L15.27 19.71L15.29 19.70L15.39 19.64L15.41 19.63L15.51 19.57L15.53 19.57L15.64 19.52L15.65 19.51L15.77 19.47L15.78 19.47L15.90 19.44L15.92 19.43L16.03 19.41L16.05 19.40L16.17 19.39L16.18 19.39L16.30 19.38L16.32 19.38L16.44 19.37L16.46 19.37L16.58 19.38L16.59 19.38L16.71 19.40L16.73 19.40L16.85 19.42L16.86 19.43L16.98 19.46L17.00 19.46L17.11 19.50L17.13 19.50L21.97 21.45L22.01 21.46L22.02 21.47L22.07 21.50L22.08 21.51Z",
  butter: "M20.52 1.50L20.57 1.36L20.61 1.23L20.64 1.09L20.65 0.94L20.65 0.80L20.63 0.66L20.62 0.60L17.40 0.60L13.21 4.54L13.11 4.65L13.02 4.76L12.94 4.88L12.88 5L12.83 5.14L12.79 5.27L12.76 5.41L12.75 5.56L12.75 5.70L12.75 5.70L8.93 9.53L8.87 9.60L8.81 9.67L8.76 9.75L8.72 9.84L8.69 9.92L8.67 10.01L8.65 10.11L8.65 10.20L8.65 10.29L8.67 10.39L8.69 10.48L8.72 10.56L8.76 10.65L8.81 10.73L8.87 10.80L8.93 10.87L9 10.93L9.07 10.99L9.15 11.04L9.24 11.08L9.32 11.11L9.41 11.13L9.51 11.15L9.60 11.15L9.69 11.15L9.79 11.13L9.88 11.11L9.96 11.08L10.05 11.04L10.13 10.99L10.20 10.93L10.27 10.87L14.10 7.04L14.16 7.05L14.30 7.05L14.44 7.03L14.58 7L14.71 6.96L14.84 6.90L14.97 6.83L15.08 6.75L15.19 6.66L20.19 1.96L20.29 1.85L20.38 1.74L20.46 1.62ZM7.95 11.03L7.91 10.95L7.87 10.87L7.84 10.78L7.82 10.69L7.80 10.60L7.78 10.52L7.76 10.43L7.76 10.34L7.75 10.24L7.75 10.16L7.76 10.06L7.76 9.97L7.78 9.88L7.80 9.80L7.82 9.71L7.84 9.62L7.87 9.53L7.91 9.45L7.95 9.37L7.99 9.29L8.04 9.21L8.09 9.14L8.14 9.06L8.20 8.99L8.26 8.92L8.29 8.89L8.98 8.20L5.80 8.20L2.68 11.15L8.01 11.15L7.99 11.11ZM11.27 11.15L16.22 11.15L19.34 8.20L14.22 8.20ZM16.85 17.18L20 14.20L20 8.82L16.85 11.79ZM2.20 17.60L15.95 17.60L15.95 12.05L2.20 12.05ZM1.57 18.85L1.34 19.04L1.15 19.27L1.04 19.55L1 19.85L1.04 20.15L1.15 20.43L1.34 20.66L1.58 20.85L1.85 20.96L2.15 21L21.85 21L22.15 20.96L22.43 20.85L22.66 20.66L22.85 20.43L22.96 20.15L23 19.85L22.96 19.55L22.85 19.27L22.66 19.04L22.43 18.85L22.15 18.74L21.85 18.70L2.15 18.70L1.85 18.74Z",
  tofu: "M10 2L19 6V12.5L22 14V20L17 22L12 19.5L10 21L2 17V6ZM4 8.7L9.4 11.4L9.4 18.5L11 18.5L11 11.2L17 8.2L17 6.5L10 10L4 7ZM13.5 16.2L16.2 17.5L16.2 20L17.8 20L17.8 17.5L20.5 16.2L20.5 14.5L17 16.2L13.5 14.5Z",
  garnele: "M 8 3 L 6 1 L 5 2 L 7 4 L 3 3 L 2 4 L 6 6 C 9 5 12 6 15 8 C 18 10 20 13 20 16 C 20 19 18 22 15 22 L 17 24 L 14 23.5 L 12 24 L 13 20 L 12 19 L 13 18 L 11.5 17 L 12.5 16 L 10.5 15 L 11.5 14 L 9.5 13 L 10.5 12 L 8.5 11 L 9 10 L 7 9 L 6.5 6 Z M 7 7 A 1 1 0 1 0 9 7 A 1 1 0 1 0 7 7 Z",
  honig: "M7 2H17Q18 2 18 3V5H6V3Q6 2 7 2ZM6 7H18L20 10V20Q20 22 18 22H6Q4 22 4 20V10ZM12 10C11 12 8 14 8 16C8 18.2 9.8 20 12 20C14.2 20 16 18.2 16 16C16 14 13 12 12 10Z",
  marmelade: "M6 8H18L20 11V20Q20 22 18 22H6Q4 22 4 20V11ZM7 13V18H17V13ZM6 2H18L21 7L18 6L15 8L12 6L9 8L6 6L3 7ZM10 8H14V10H10Z",
  dose: "M4.40 5.40L4.47 5.09L4.66 4.78L4.98 4.48L5.42 4.20L5.97 3.94L6.63 3.70L7.37 3.50L8.20 3.32L9.09 3.18L10.03 3.08L11.01 3.02L12 3L12.99 3.02L13.97 3.08L14.91 3.18L15.80 3.32L16.63 3.50L17.37 3.70L18.03 3.94L18.58 4.20L19.02 4.48L19.34 4.78L19.53 5.09L19.60 5.40L19.60 19.20L19.53 19.51L19.34 19.82L19.02 20.12L18.58 20.40L18.03 20.66L17.37 20.90L16.63 21.10L15.80 21.28L14.91 21.42L13.97 21.52L12.99 21.58L12 21.60L11.01 21.58L10.03 21.52L9.09 21.42L8.20 21.28L7.37 21.10L6.63 20.90L5.97 20.66L5.42 20.40L4.98 20.12L4.66 19.82L4.47 19.51L4.40 19.20ZM18.57 5.07L18.19 4.75L17.57 4.46L16.74 4.20L15.72 3.99L14.56 3.83L13.31 3.73L12 3.70L10.69 3.73L9.44 3.83L8.28 3.99L7.26 4.20L6.43 4.46L5.81 4.75L5.43 5.07L5.30 5.40L5.43 5.73L5.81 6.05L6.43 6.34L7.26 6.60L8.28 6.81L9.44 6.97L10.69 7.07L12 7.10L13.31 7.07L14.56 6.97L15.72 6.81L16.74 6.60L17.57 6.34L18.19 6.05L18.57 5.73L18.70 5.40ZM17.70 5.40L17.59 5.64L17.27 5.88L16.74 6.09L16.03 6.28L15.17 6.44L14.18 6.55L13.11 6.63L12 6.65L10.89 6.63L9.82 6.55L8.83 6.44L7.97 6.28L7.26 6.09L6.73 5.88L6.41 5.64L6.30 5.40L6.41 5.16L6.73 4.92L7.26 4.71L7.97 4.52L8.83 4.36L9.82 4.25L10.89 4.17L12 4.15L13.11 4.17L14.18 4.25L15.17 4.36L16.03 4.52L16.74 4.71L17.27 4.92L17.59 5.16ZM16.20 5.09L15.92 4.91L15.50 4.79L15 4.75L14.50 4.79L14.08 4.91L13.80 5.09L13.70 5.30L13.80 5.51L14.08 5.69L14.50 5.81L15 5.85L15.50 5.81L15.92 5.69L16.20 5.51L16.30 5.30ZM6.48 15.85L6.75 16.10L7.12 16.33L7.61 16.55L8.19 16.74L8.85 16.90L9.57 17.03L10.35 17.12L11.17 17.18L12 17.20L12.83 17.18L13.65 17.12L14.43 17.03L15.15 16.90L15.81 16.74L16.39 16.55L16.88 16.33L17.25 16.10L17.52 15.85L17.52 9.85L17.25 10.10L16.88 10.33L16.39 10.55L15.81 10.74L15.15 10.90L14.43 11.03L13.65 11.12L12.83 11.18L12 11.20L11.17 11.18L10.35 11.12L9.57 11.03L8.85 10.90L8.19 10.74L7.61 10.55L7.12 10.33L6.75 10.10L6.48 9.85Z",
  wrap: "M5 8.5H18C20.5 8.5 22 9.5 22 12C22 14.5 20.5 15.5 18 15.5H5C3 15.5 2 14.5 2 12C2 9.5 3 8.5 5 8.5ZM10.5 10L8.5 14H13L15 10ZM4.5 10.25V13.75L6.75 12ZM19.5 10.25L17.25 12L19.5 13.75Z",
  folie: "M2 8L5 3H21Q22 3 22 4V12Q22 13 21 13H18V21Q18 22 17 22H7Q6 22 6 21V13H3Q2 13 2 12ZM4.7 6.5L20 6.5L20 5L5.6 5ZM4 10L6 11.5L8 10L10 11.5L12 10L14 11.5L16 10L18 11.5L20 10L20 8.5L4 8.5Z",
  schwamm: "M19.10 10L19.72 10.08L20.30 10.32L20.80 10.70L21.18 11.20L21.42 11.78L21.50 12.40L21.50 18.10L21.42 18.72L21.18 19.30L20.80 19.80L20.30 20.18L19.72 20.42L19.10 20.50L4.90 20.50L4.28 20.42L3.70 20.18L3.20 19.80L2.82 19.30L2.58 18.72L2.50 18.10L2.50 12.40L2.58 11.78L2.82 11.20L3.20 10.70L3.70 10.32L4.28 10.08L4.90 10ZM2.60 13.90L21.40 13.90L21.40 12.90L2.60 12.90ZM6.95 16.29L6.81 16.01L6.59 15.79L6.31 15.65L6 15.60L5.69 15.65L5.41 15.79L5.19 16.01L5.05 16.29L5 16.60L5.05 16.91L5.19 17.19L5.41 17.41L5.69 17.55L6 17.60L6.31 17.55L6.59 17.41L6.81 17.19L6.95 16.91L7 16.60ZM11.11 17.97L11.01 17.76L10.84 17.59L10.63 17.49L10.40 17.45L10.17 17.49L9.96 17.59L9.79 17.76L9.69 17.97L9.65 18.20L9.69 18.43L9.79 18.64L9.96 18.81L10.17 18.91L10.40 18.95L10.63 18.91L10.84 18.81L11.01 18.64L11.11 18.43L11.15 18.20ZM14.30 15.58L14.15 15.28L13.92 15.05L13.62 14.90L13.30 14.85L12.98 14.90L12.68 15.05L12.45 15.28L12.30 15.58L12.25 15.90L12.30 16.22L12.45 16.52L12.68 16.75L12.98 16.90L13.30 16.95L13.62 16.90L13.92 16.75L14.15 16.52L14.30 16.22L14.35 15.90ZM18.36 17.65L18.25 17.43L18.07 17.25L17.85 17.14L17.60 17.10L17.35 17.14L17.13 17.25L16.95 17.43L16.84 17.65L16.80 17.90L16.84 18.15L16.95 18.37L17.13 18.55L17.35 18.66L17.60 18.70L17.85 18.66L18.07 18.55L18.25 18.37L18.36 18.15L18.40 17.90ZM19.57 15.21L19.49 15.05L19.35 14.91L19.19 14.83L19 14.80L18.81 14.83L18.65 14.91L18.51 15.05L18.43 15.21L18.40 15.40L18.43 15.59L18.51 15.75L18.65 15.89L18.81 15.97L19 16L19.19 15.97L19.35 15.89L19.49 15.75L19.57 15.59L19.60 15.40ZM8.42 18.83L8.34 18.68L8.22 18.56L8.07 18.48L7.90 18.45L7.73 18.48L7.58 18.56L7.46 18.68L7.38 18.83L7.35 19L7.38 19.17L7.46 19.32L7.58 19.44L7.73 19.52L7.90 19.55L8.07 19.52L8.22 19.44L8.34 19.32L8.42 19.17L8.45 19ZM19.50 5.20L19.35 6.13L18.93 6.96L18.26 7.63L17.43 8.05L16.50 8.20L15.57 8.05L14.74 7.63L14.07 6.96L13.65 6.13L13.50 5.20L13.65 4.27L14.07 3.44L14.74 2.77L15.57 2.35L16.50 2.20L17.43 2.35L18.26 2.77L18.93 3.44L19.35 4.27ZM18.40 4.58L18.12 4.02L17.68 3.58L17.12 3.30L16.50 3.20L15.88 3.30L15.32 3.58L14.88 4.02L14.60 4.58L14.50 5.20L14.60 5.82L14.88 6.38L15.32 6.82L15.88 7.10L16.50 7.20L17.12 7.10L17.68 6.82L18.12 6.38L18.40 5.82L18.50 5.20ZM11.90 6.20L11.82 6.73L11.58 7.20L11.20 7.58L10.73 7.82L10.20 7.90L9.67 7.82L9.20 7.58L8.82 7.20L8.58 6.73L8.50 6.20L8.58 5.67L8.82 5.20L9.20 4.82L9.67 4.58L10.20 4.50L10.73 4.58L11.20 4.82L11.58 5.20L11.82 5.67ZM11.01 5.94L10.89 5.70L10.70 5.51L10.46 5.39L10.20 5.35L9.94 5.39L9.70 5.51L9.51 5.70L9.39 5.94L9.35 6.20L9.39 6.46L9.51 6.70L9.70 6.89L9.94 7.01L10.20 7.05L10.46 7.01L10.70 6.89L10.89 6.70L11.01 6.46L11.05 6.20Z",
};
window.customIcons = window.customIcons || {};
window.customIcons.stc = {
  getIcon: async (name) => ({ path: STC_ICONS[name] || "" }),
  getIconList: async () => Object.keys(STC_ICONS).map((name) => ({ name })),
};
window.customIconsets = window.customIconsets || {};
window.customIconsets.stc = async (name) => ({ path: STC_ICONS[name] || "" });

// Reihenfolge der Bereiche für sort: category (typischer Weg durch den Laden)
// order of categories for sort: category (typical route through a shop)
const EK_WEG = ["green", "amber", "red", "blue", "pink", "teal", "purple"];
const ekRang = (icon) => {
  const name = String(icon).replace(/^(mdi|stc):/, "");
  const b = EK_BEREICHE.find(([, , liste]) => liste.includes(name));
  const i = b ? EK_WEG.indexOf(b[0]) : -1;
  return i < 0 ? EK_WEG.length : i;
};

const ekFarbe = (icon) => {
  const name = String(icon).replace(/^(mdi|stc):/, "");
  const b = EK_BEREICHE.find(([, , liste]) => liste.includes(name));
  return b ? `var(--rgb-${b[0]}-color, ${b[1]})` : "var(--rgb-grey-color, 158,158,158)";
};

// alle Stichworte in Suchreihenfolge, einmal angelegt / all keywords in search order, built once
const EK_ALLE = [...EK_ICONS, ...EK_ICONS_EN];

const ekEsc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const ekGross = (s) => { const t = String(s ?? ""); return t.charAt(0).toLocaleUpperCase("de") + t.slice(1); };

class ShoppingTilesCard extends HTMLElement {
  setConfig(config) {
    if (!config.entity || !config.entity.startsWith("todo.")) {
      throw new Error(`${EK_TEXT.de.needEntity} / ${EK_TEXT.en.needEntity}`);
    }
    if (config.favorites_entity && !String(config.favorites_entity).startsWith("todo.")) {
      throw new Error(`${EK_TEXT.de.needFavEntity} / ${EK_TEXT.en.needFavEntity}`);
    }
    const alteListe = this._config?.entity;
    this._config = { ...config };
    this._iconCache = null;
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    if (alteListe !== this._config.entity) {
      // andere Liste gewählt: laufende Anmeldung ungültig machen, neu abonnieren
      // other list: invalidate a pending subscription, subscribe again
      this._aboNr = (this._aboNr || 0) + 1;
      this._unsubscribe();
      this._items = null;
      this._undoListe = [];
      this._fehler = null;
      this._weg = undefined;
      this._aboFehlerZeit = 0;
    }
    if (this._favEntity !== this._config.favorites_entity) {
      this._favWeg();
      this._favEntity = this._config.favorites_entity;
    }
    this._built = false;
    if (this._hass) {
      // Änderungen sofort zeigen (z. B. Vorschau im Editor) / apply changes right away
      this._build();
      this._render();
      this._abo();
      this._favAbo();
    }
  }

  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    if (!this._built) this._build();
    this._abo();
    this._favAbo();
  }

  // Liste da und verfügbar? Sonst Karte sperren; kommt sie wieder, neu anmelden – nach dem Neuladen einer
  // Integration (z. B. Bring!) bleibt die alte Anmeldung stumm, ohne Fehler
  // list present and available? Otherwise lock the card; when it returns, subscribe again – after an
  // integration reload (e.g. Bring!) the old subscription stays silent, without an error
  _abo() {
    const st = this._hass.states[this._config.entity];
    const weg = !st || st.state === "unavailable";
    if (weg !== this._weg) {
      const zurueck = this._weg === true;
      this._weg = weg;
      this._aboNr = (this._aboNr || 0) + 1;
      this._unsubscribe();
      clearTimeout(this._retryTimer);
      this._aboFehlerZeit = 0;
      if (weg || zurueck) { this._items = null; this._fehler = null; this._render(); }
    }
    // nach einem Fehler 30 s Pause, sonst würde jedes hass-Update sofort neu anfragen
    // 30 s pause after an error, otherwise every hass update would ask again right away
    const pause = this._aboFehlerZeit && Date.now() - this._aboFehlerZeit < 30000;
    if (!weg && !this._unsub && !this._subscribing && !pause) this._subscribe();
  }

  connectedCallback() {
    if (this._hass) { this._abo(); this._favAbo(); }
    if (this._ro && this._grid) {
      this._ro.observe(this._grid);
      this._ro.observe(this.shadowRoot.querySelector("ha-card"));
    }
  }
  disconnectedCallback() {
    this._unsubscribe();
    clearTimeout(this._retryTimer);
    this._wartenLeeren();
    this._favWeg();
    clearTimeout(this._langTimer);
    if (this._undoListe?.length) { clearTimeout(this._undoTimer); this._undoEnde(); }
    if (this._ro) this._ro.disconnect();
  }

  // Favoriten aus einer eigenen To-do-Liste (favorites_entity): eigenes Abo, Fehler sperren die Karte nicht
  // favorites from a separate to-do list (favorites_entity): own subscription, errors do not lock the card
  _favAbo() {
    const fe = this._config?.favorites_entity;
    if (!fe || !this._hass) return;
    const st = this._hass.states[fe];
    if (!st || st.state === "unavailable") {
      if (this._favUnsub || this._favListe) { this._favWeg(); if (this._items) this._render(); }
      return;
    }
    if (this._favUnsub || this._favLaeuft || !this.isConnected) return;
    if (this._favFehlerZeit && Date.now() - this._favFehlerZeit < 30000) return;
    this._favLaeuft = true;
    const nr = this._favNr = (this._favNr || 0) + 1;
    this._hass.connection.subscribeMessage(
      (msg) => {
        if (nr !== this._favNr) return;
        this._favFehlerZeit = 0;
        this._favListe = msg.items || [];
        if (this._items) this._render();
        if (this._bDialog?.open) this._favKnopf();
      },
      { type: "todo/item/subscribe", entity_id: fe }
    ).then((unsub) => {
      if (nr !== this._favNr) { unsub(); return; }
      this._favLaeuft = false;
      if (!this.isConnected) { unsub(); return; }
      this._favUnsub = unsub;
    }).catch(() => {
      if (nr !== this._favNr) return;
      this._favLaeuft = false;
      this._favFehlerZeit = Date.now();
    });
  }

  _favWeg() {
    this._favNr = (this._favNr || 0) + 1;
    if (this._favUnsub) { this._favUnsub(); this._favUnsub = null; }
    this._favLaeuft = false;
    this._favListe = null;
  }

  _subscribe() {
    if (this._subscribing || !this._hass || this._weg) return;
    this._subscribing = true;
    // jede Anmeldung bekommt eine Nummer; veraltete Antworten werden verworfen
    // every subscription gets a number; stale answers are discarded
    const nr = this._aboNr = (this._aboNr || 0) + 1;
    this._hass.connection.subscribeMessage(
      (msg) => {
        if (nr !== this._aboNr) return;
        this._fehler = null; this._aboFehlerZeit = 0; this._items = msg.items || [];
        this._wartenLeeren(); this._render();
      },
      { type: "todo/item/subscribe", entity_id: this._config.entity }
    ).then((unsub) => {
      this._subscribing = false;
      if (nr !== this._aboNr) {
        // inzwischen andere Liste gewählt / another list was chosen meanwhile
        unsub();
        if (this.isConnected && !this._unsub) this._subscribe();
        return;
      }
      this._unsub = unsub;
      if (!this.isConnected) this._unsubscribe();
    }).catch((err) => {
      this._subscribing = false;
      if (nr !== this._aboNr) {
        if (this.isConnected && !this._unsub) this._subscribe();
        return;
      }
      // Fehler merken, damit _render ihn nicht überschreibt / keep the error so _render does not overwrite it
      this._fehler = `${this._t.error}: ${err.message || err}`;
      this._aboFehlerZeit = Date.now();
      this._render();
      // nach 30 s erneut versuchen, solange die Karte angezeigt wird / retry after 30 s while the card is shown
      clearTimeout(this._retryTimer);
      this._retryTimer = setTimeout(() => { if (this.isConnected && !this._unsub) this._abo(); }, 30000);
    });
  }

  _unsubscribe() {
    if (this._unsub) { this._unsub(); this._unsub = null; }
  }

  get _t() {
    const wahl = (this._config.language || this._hass?.locale?.language || this._hass?.language || "en").slice(0, 2);
    return EK_TEXT[wahl] || EK_TEXT.en;
  }

  get _titel() { return this._config.title || this._t.title; }

  // Ergebnis je Name zwischengespeichert; setConfig leert den Speicher (eigene icons können sich ändern)
  // result cached per name; setConfig clears the cache (custom icons may change)
  _icon(name) {
    const n = String(name).toLowerCase();
    if (!this._iconCache) this._iconCache = new Map();
    const da = this._iconCache.get(n);
    if (da) return da;
    let erg = "mdi:basket-outline";
    const own = this._config.icons || {};
    const eigen = Object.entries(own).find(([k]) => n.includes(String(k).toLowerCase()));
    if (eigen) erg = eigen[1];
    else {
      const woerter = n.split(/[^a-zäöüß]+/);
      const treffer = EK_ALLE.find(([k]) => (k.startsWith("=") ? woerter.includes(k.slice(1)) : n.includes(k)));
      if (treffer) erg = treffer[1];
    }
    if (this._iconCache.size > 2000) this._iconCache.clear();
    this._iconCache.set(n, erg);
    return erg;
  }

  _build() {
    if (this._ro) this._ro.disconnect();
    const t = this._t;
    this.shadowRoot.innerHTML = `
      <style>
        ha-card { padding: 12px 12px 12px; height:100%; box-sizing:border-box; display:flex; flex-direction:column; }
        .kopf { display:flex; align-items:center; gap:8px; margin-bottom:12px; }
        .kopf.aus { display:none; }
        .kopf ha-icon { color: var(--primary-color); }
        .titel { font-size: 16px; font-weight: 500; flex:1; }
        .zahl { font-size:12px; white-space:nowrap; padding:2px 10px; border-radius:12px; border:none; font-family:inherit;
                background: rgba(var(--rgb-primary-color, 3,169,244), 0.15); color: var(--primary-color); cursor:pointer; }
        .grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(92px, 1fr)); grid-auto-rows: 100px; gap:8px; }
        .kachel { background: var(--secondary-background-color); border-radius: 12px; padding: 12px 6px 10px;
                  text-align:center; cursor:pointer; user-select:none; transition: opacity .2s, transform .1s;
                  box-sizing:border-box; width:100%; height:100px; overflow:hidden;
                  display:flex; flex-direction:column; align-items:center; justify-content:center; }
        .kachel:active { transform: scale(0.96); }
        .kachel:focus-visible, .chip:focus-visible, .zahl:focus-visible, .undo button:focus-visible {
                  outline: 2px solid var(--primary-color); outline-offset: 2px; }
        .kreis { width:38px; height:38px; flex:none; border-radius:50%; display:flex; align-items:center; justify-content:center;
                 background: rgba(var(--k-rgb), 0.18); }
        .kreis ha-icon { --mdc-icon-size: 22px; color: rgb(var(--k-rgb)); }
        .kachel.zuletzt { opacity: 0.75; position: relative; }
        .kachel .zurueck, .kachel .stern { position:absolute; top:6px; right:6px; --mdc-icon-size: 16px; color: var(--secondary-text-color); }
        .mehr { background: rgba(var(--rgb-primary-color, 3,169,244), 0.15); color: var(--primary-color); }
        .mehr .plus { font-size: 24px; font-weight: 500; }
        .name { font-size: 13px; font-weight: 500; margin-top: 6px; line-height: 1.2; max-width:100%;
                overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; hyphens:auto; overflow-wrap:anywhere; }
        /* mit Angabe nur eine Namenszeile, sonst wird die Angabe abgeschnitten / with details one name line only */
        .kachel.mit-info .name { -webkit-line-clamp:1; overflow-wrap:normal; word-break:normal; white-space:nowrap; text-overflow:ellipsis; display:block; }
        .info { font-size: 11px; color: var(--secondary-text-color); margin-top: 2px; line-height: 1.2; max-width:100%;
                white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .zt-bereich[hidden] { display:none; }
        /* mit Kacheln: „X offen“ direkt unter den offenen Artikeln, dann Trennlinie und „Zuletzt gekauft“
           with tiles: "X open" right below the open items, then a divider and "recently bought" */
        .zt-bereich, .fav-bereich { flex:none; min-height:0; margin-top:8px; border-top:1px solid var(--divider-color); }
        .fav-bereich[hidden] { display:none; }
        .zt-titel { font-size:12px; line-height:14px; color: var(--secondary-text-color); margin: 6px 0 4px; }
        /* freier Platz über dem Eingabefeld / free space above the input field */
        .luecke { display:none; }
        ha-card.mit-zt .luecke { display:block; flex:1; }
        ha-card.mit-zt .status { flex:none; margin-top:8px; min-height:24px; }
        ha-card.mit-zt form { margin-top:8px; }
        /* gesperrt (Fehler, nicht verfügbar, lädt): nur die Meldung, keine alten Daten / locked: message only, no stale data */
        ha-card.gesperrt .status > *, ha-card.gesperrt .zt-bereich, ha-card.gesperrt .fav-bereich { visibility:hidden; }
        form button[type=submit]:disabled, input:disabled { opacity:.5; cursor:default; }
        .leer { grid-column: 1 / -1; color: var(--secondary-text-color); text-align:center; padding: 12px 0; }
        .undo.aus { position:absolute; width:1px; height:1px; overflow:hidden; clip-path: inset(50%); white-space:nowrap; }
        .undo { font-size:12px; color: var(--secondary-text-color); white-space:nowrap; }
        .undo button { font: inherit; background:none; border:none; padding:0; color: var(--primary-color); cursor:pointer; margin-left:6px; }
        form { display:flex; gap:8px; align-items:center; }
        .status { display:flex; align-items:center; gap:10px; flex:1; min-height:0; }
        .status .zahl { padding:4px 10px; }
        .chips { display:flex; align-items:center; gap:6px; flex:1; min-width:0; overflow:hidden; }
        .chips.aus, .status.undo-aktiv .chips { display:none; }
        .chips .etikett { font-size:12px; color: var(--secondary-text-color); white-space:nowrap; }
        .chip { font: inherit; font-size:12px; padding:3px 9px; border-radius:12px; cursor:pointer; white-space:nowrap; flex:none;
                border:1px solid var(--divider-color); background:none; color: var(--primary-text-color);
                display:flex; align-items:center; gap:4px; }
        .chip ha-icon { --mdc-icon-size: 14px; color: var(--secondary-text-color); }
        .chip.weg { display:none; }
        .undo { align-self:center; }
        input { flex:1; min-width:0; width:100%; box-sizing:border-box; font: inherit; padding: 8px 10px; border-radius: 8px;
                border: 1px solid var(--divider-color); background: var(--card-background-color);
                color: var(--primary-text-color); }
        form button[type=submit] { align-self:stretch; border:none; border-radius:8px; padding: 0 12px; cursor:pointer;
                 background: var(--primary-color); color: var(--text-primary-color, #fff); }
        dialog { border:none; border-radius: 16px; padding: 16px; width: min(92vw, 560px); max-height: 80vh;
                 background: var(--card-background-color); color: var(--primary-text-color);
                 box-shadow: 0 8px 32px rgba(0,0,0,.35); }
        dialog::backdrop { background: rgba(0,0,0,.45); }
        dialog .kopf { margin-bottom: 12px; }
        dialog .zu { margin-left:auto; background:none; border:none; cursor:pointer; color: var(--secondary-text-color); padding:4px; }
        dialog .inhalt { max-height: calc(80vh - 90px); overflow-y: auto; }
        dialog.bearbeiten { width: min(92vw, 380px); }
        dialog.bearbeiten form { display:block; }
        dialog.bearbeiten label { display:block; font-size:12px; color: var(--secondary-text-color); margin: 12px 0 4px; }
        dialog.bearbeiten input { width:100%; }
        dialog.bearbeiten .knoepfe { display:flex; gap:8px; margin-top:18px; }
        dialog.bearbeiten .knoepfe button { font: inherit; border:none; border-radius:8px; padding: 8px 14px; cursor:pointer; }
        dialog.bearbeiten .loeschen { background:none; color: var(--error-color, #db4437); margin-right:auto; }
        dialog.bearbeiten .abbrechen { background:none; color: var(--primary-color); }
        dialog.bearbeiten .speichern { background: var(--primary-color); color: var(--text-primary-color, #fff); }
        dialog.bearbeiten .favknopf { display:block; margin-top:14px; font: inherit; border:1px solid var(--divider-color, rgba(127,127,127,.4)); background:none;
          color: var(--primary-text-color); border-radius:8px; padding: 8px 12px; cursor:pointer; width:100%; text-align:left; }
        dialog.bearbeiten .favknopf[hidden], dialog.bearbeiten [hidden] { display:none; }
        dialog.bearbeiten .favknopf:disabled { opacity:.5; cursor:default; }
        dialog.bearbeiten .bfehler { margin-top:12px; color: var(--error-color, #db4437); font-size:13px; }
        dialog h3 { font-size: 14px; font-weight: 500; color: var(--secondary-text-color); margin: 16px 0 8px; }
      </style>
      <ha-card>
        <div class="kopf ${this._config.show_title === false ? "aus" : ""}">
          ${this._config.show_title === false ? "" : `<ha-icon icon="mdi:cart-outline"></ha-icon>`}
          ${this._config.show_title === false ? "" : `<span class="titel" role="heading" aria-level="2">${ekEsc(this._titel)}</span>`}
        </div>
        <div class="grid haupt"><div class="leer">${t.loading}</div></div>
        <div class="status">
          <button type="button" class="zahl" title="${t.showAll}"></button>
          <div class="undo aus" role="status"><span class="undotext"></span><button type="button" hidden>${t.undo}</button></div>
          <div class="chips aus"></div>
        </div>
        <div class="fav-bereich" hidden>
          <div class="zt-titel">${t.favTitle}</div>
          <div class="grid fav-haupt"></div>
        </div>
        <div class="zt-bereich" hidden>
          <div class="zt-titel">${t.recentTitle}</div>
          <div class="grid zuletzt-haupt"></div>
        </div>
        <div class="luecke"></div>
        <form>
          <input type="text" placeholder="${t.add}" aria-label="${t.add}">
          <button type="submit" aria-label="${t.addBtn}"><ha-icon icon="mdi:plus"></ha-icon></button>
        </form>
      </ha-card>
      <dialog aria-labelledby="stc-alle-titel">
        <div class="kopf">
          <ha-icon icon="mdi:cart-outline"></ha-icon>
          <span class="titel" id="stc-alle-titel">${ekEsc(this._titel)} – ${t.allOpen}</span>
          <button class="zu" aria-label="${t.close}"><ha-icon icon="mdi:close"></ha-icon></button>
        </div>
        <div class="inhalt">
          <div class="grid alle"></div>
          <h3 class="fav-titel" hidden>${t.favTitle}</h3>
          <div class="grid fav-alle"></div>
          <h3 class="zuletzt-titel" hidden>${t.recentTitle}</h3>
          <div class="grid zuletzt-alle"></div>
        </div>
      </dialog>
      <dialog class="bearbeiten" aria-labelledby="stc-bearb-titel">
        <div class="kopf">
          <ha-icon icon="mdi:pencil-outline"></ha-icon>
          <span class="titel" id="stc-bearb-titel">${t.edit}</span>
        </div>
        <form class="bform">
          <label for="bname">${t.name}</label>
          <input id="bname" type="text" required>
          <label for="bdesc">${t.desc}</label>
          <input id="bdesc" type="text">
          <button type="button" class="favknopf" hidden></button>
          <div class="bfehler" role="alert" hidden></div>
          <div class="knoepfe">
            <button type="button" class="loeschen">${t.del}</button>
            <button type="button" class="abbrechen">${t.cancel}</button>
            <button type="submit" class="speichern">${t.save}</button>
          </div>
        </form>
      </dialog>`;
    const r = this.shadowRoot;
    this._grid = r.querySelector(".grid.haupt");
    this._alle = r.querySelector(".grid.alle");
    this._dialog = r.querySelector("dialog:not(.bearbeiten)");
    this._bDialog = r.querySelector("dialog.bearbeiten");
    this._zahl = r.querySelector(".status .zahl");
    this._undo = r.querySelector(".undo");
    this._status = r.querySelector(".status");
    this._chips = r.querySelector(".chips");
    this._zuletztAlle = r.querySelector(".zuletzt-alle");
    this._zuletztTitel = r.querySelector(".zuletzt-titel");
    this._ztBereich = r.querySelector(".zt-bereich");
    this._ztGrid = r.querySelector(".zuletzt-haupt");
    this._favBereich = r.querySelector(".fav-bereich");
    this._favGrid = r.querySelector(".fav-haupt");
    this._favAlle = r.querySelector(".fav-alle");
    this._favTitel = r.querySelector(".fav-titel");
    const klick = (e) => {
      if (this._lang) { this._lang = false; return; }
      if (e.target.closest(".mehr")) { this._oeffnen(); return; }
      const f = e.target.closest(".fav");
      if (f) { this._favTippen(f); return; }
      const z = e.target.closest(".zuletzt, .chip");
      if (z) { this._wieder(z.dataset.uid, z); return; }
      const k = e.target.closest(".kachel");
      if (k) this._abhaken(k.dataset.uid, k.dataset.name, k);
    };
    this._grid.addEventListener("click", klick);
    this._alle.addEventListener("click", klick);
    this._zuletztAlle.addEventListener("click", klick);
    this._ztGrid.addEventListener("click", klick);
    this._favGrid.addEventListener("click", klick);
    this._favAlle.addEventListener("click", klick);
    this._chips.addEventListener("click", klick);
    this._zahl.addEventListener("click", () => this._oeffnen());
    r.querySelector(".zu").addEventListener("click", () => this._dialog.close());
    this._dialog.addEventListener("click", (e) => { if (e.target === this._dialog) this._dialog.close(); });
    this._bDialog.addEventListener("click", (e) => { if (e.target === this._bDialog) this._bDialog.close(); });
    r.querySelector(".abbrechen").addEventListener("click", () => this._bDialog.close());
    r.querySelector(".loeschen").addEventListener("click", () => this._loeschen());
    r.querySelector(".favknopf").addEventListener("click", () => this._favUmschalten());
    r.querySelector(".bform").addEventListener("submit", (e) => { e.preventDefault(); this._speichern(); });
    // lange drücken (Touch/Maus) oder Rechtsklick öffnet „Bearbeiten“ / long press or right click opens "edit"
    // offene Artikel: bearbeiten; Favoriten-Kacheln nur mit Favoriten-Liste: entfernen
    // open items: edit; favorite tiles only with a favorites list: remove
    const bearbeitbar = (k) => !!k && !k.classList.contains("mehr")
      && (!k.classList.contains("zuletzt") || (k.classList.contains("fav") && !!this._config.favorites_entity && !!this._favListe));
    const startLang = (e) => {
      const k = e.target.closest(".kachel");
      if (!bearbeitbar(k)) return;
      this._start = { x: e.clientX, y: e.clientY };
      clearTimeout(this._langTimer);
      this._langTimer = setTimeout(() => { this._lang = true; this._bearbeiten(k.dataset.uid, k.classList.contains("fav")); }, 550);
    };
    const stopLang = () => clearTimeout(this._langTimer);
    // jeder neue Druck beginnt ohne „lange gedrückt“-Merker / every new press starts without the long-press flag
    r.addEventListener("pointerdown", () => { this._lang = false; }, true);
    for (const g of [this._grid, this._alle, this._favGrid, this._favAlle]) {
      g.addEventListener("pointerdown", startLang);
      g.addEventListener("pointerup", stopLang);
      g.addEventListener("pointerleave", stopLang);
      g.addEventListener("pointercancel", stopLang);
      g.addEventListener("pointermove", (e) => {
        if (this._start && Math.hypot(e.clientX - this._start.x, e.clientY - this._start.y) > 10) stopLang();
      });
      g.addEventListener("contextmenu", (e) => {
        const k = e.target.closest(".kachel");
        if (!bearbeitbar(k)) return;
        e.preventDefault();
        stopLang();
        this._lang = true;
        this._bearbeiten(k.dataset.uid, k.classList.contains("fav"));
      });
    }
    // Tastatur: Enter/Leertaste wie Antippen, F2 oder Kontextmenü-Taste zum Bearbeiten
    // keyboard: Enter/Space like a tap, F2 or the context menu key to edit
    const taste = (e) => {
      const k = e.target.closest(".kachel");
      if (!k) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!k.classList.contains("mehr")) {
          // merken, wo abgehakt wurde, damit der Fokus danach weiterwandert
          // remember where the item was, so focus can move on afterwards
          const g = e.currentTarget;
          this._fokus = { grid: g, uid: k.dataset.uid, index: [...g.querySelectorAll(".kachel")].indexOf(k) };
        }
        this._lang = false;
        klick(e);
      } else if ((e.key === "F2" || e.key === "ContextMenu" || (e.key === "F10" && e.shiftKey))
                 && bearbeitbar(k)) {
        e.preventDefault();
        this._bearbeiten(k.dataset.uid, k.classList.contains("fav"));
      }
    };
    for (const g of [this._grid, this._alle, this._zuletztAlle, this._ztGrid, this._favGrid, this._favAlle]) g.addEventListener("keydown", taste);
    // nach dem Schließen von „Bearbeiten“ zurück zur Kachel / back to the tile after closing "edit"
    this._bDialog.addEventListener("close", () => {
      const uid = this._fokusUid;
      this._fokusUid = null;
      if (!uid) return;
      const k = [...this._grid.querySelectorAll(".kachel"), ...this._favGrid.querySelectorAll(".kachel")].find((x) => x.dataset.uid === uid);
      if (k) k.focus();
    });
    this._undo.querySelector("button").addEventListener("click", () => this._rueckgaengig());
    r.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      const inp = r.querySelector("input");
      const text = inp.value.trim();
      if (!text) return;
      inp.value = "";
      this._dienst("add_item", { item: text }).catch(() => { if (!inp.value) inp.value = text; });
    });
    this._spalten = 0;
    this._ro = new ResizeObserver(() => {
      const sp = this._messen();
      const ze = this._hoeheMessen();
      const frei = this._freiMess || 0;
      if (sp !== this._spalten || ze !== this._gemessen || Math.abs(frei - (this._frei || 0)) > 4) {
        this._spalten = sp; this._gemessen = ze; this._frei = frei; this._render();
      } else this._chipsKuerzen();
    });
    this._ro.observe(this._grid);
    this._ro.observe(r.querySelector("ha-card"));
    this._built = true;
    // Neuaufbau (z. B. geänderte Einstellung) während eines laufenden Rückgängig: Leiste wiederherstellen
    // rebuild (e.g. a changed setting) during a pending undo: restore the bar, the running timeout stays
    if (this._undoListe?.length) {
      this._undo.classList.remove("aus");
      this._undo.querySelector("button").hidden = false;
      this._status.classList.add("undo-aktiv");
      this._undoText();
    }
  }

  _zeilen() {
    // Kachelreihen: fest (rows: 1–5) oder automatisch aus der Kartenhöhe im Raster
    // Rows of tiles: fixed (rows: 1–5) or automatic from the card height in the grid
    const r = this._config.rows;
    if (r !== undefined && r !== "auto") return Math.min(5, Math.max(1, Number(r) || 1));
    if (this._gemessen) return this._gemessen;
    const g = this._config.grid_options?.rows;
    if (typeof g !== "number") return 1;
    const hoehe = g * 56 + (g - 1) * 8;
    const rest = 24 + 38 + 32 + (this._config.show_title === false ? 0 : 36);
    return Math.max(1, Math.floor((hoehe - rest + 8) / 108));
  }

  _hoeheMessen() {
    // Platz für Kacheln messen, wenn die Karte eine feste Höhe hat (sonst Rechnung als Rückfall)
    // measure the space for tiles when the card has a fixed height (otherwise fall back to the calculation)
    // gilt auch ohne feste Rasterhöhe (z. B. Vollbild-Ansicht); bei Höhe nach Inhalt verteilt die Karte
    // nur den Platz, den sie schon hat, und wächst dadurch nicht / also without a fixed grid height (e.g.
    // panel view); with content-based height the card only shares out the space it already has
    this._freiMess = 0;
    const r = this.shadowRoot;
    const karte = r.querySelector("ha-card");
    const h = karte?.getBoundingClientRect().height || 0;
    if (h < 120) return 0;
    const stil = getComputedStyle(karte);
    const innen = parseFloat(stil.paddingTop) + parseFloat(stil.paddingBottom);
    const kopf = r.querySelector(".kopf");
    const kopfH = kopf && getComputedStyle(kopf).display !== "none" ? kopf.getBoundingClientRect().height + 12 : 0;
    const formH = r.querySelector("ha-card form")?.getBoundingClientRect().height || 38;
    const frei = h - innen - kopfH - formH - 32;
    this._freiMess = frei;
    return Math.max(1, Math.floor((frei + 8) / 108));
  }

  _messen() {
    // Anzahl Spalten so, wie der Browser sie tatsächlich anlegt
    const spuren = getComputedStyle(this._grid).gridTemplateColumns.split(" ").filter((x) => x && x !== "none").length;
    const rechnung = Math.floor((this._grid.getBoundingClientRect().width + 8) / 100);
    return Math.max(1, spuren || 0, rechnung || 0);
  }

  _kachel(i, zuletzt = false, fav = false) {
    const name = ekGross(i.summary);
    const icon = this._icon(i.summary);
    const hinweis = fav ? this._t.favAdd : zuletzt ? this._t.readd : `${this._t.tap}, ${this._t.hold}`;
    return `
      <div class="kachel${zuletzt ? " zuletzt" : ""}${fav ? " fav" : ""}${i.description ? " mit-info" : ""}"${this._warten?.has(i.uid) ? ` style="opacity:0.3" aria-busy="true"` : ""} role="button" tabindex="0" lang="${this._t === EK_TEXT.de ? "de" : "en"}" data-uid="${ekEsc(i.uid)}" data-name="${ekEsc(name)}"
           aria-label="${ekEsc(name)}${i.description ? ", " + ekEsc(i.description) : ""}" aria-description="${fav ? this._t.favAdd : zuletzt ? this._t.readd : this._t.keys}"
           title="${ekEsc(name)}${i.description ? " – " + ekEsc(i.description) : ""} (${hinweis})">
        ${fav ? `<ha-icon class="stern" icon="mdi:star-outline"></ha-icon>` : zuletzt ? `<ha-icon class="zurueck" icon="mdi:restore"></ha-icon>` : ""}
        <div class="kreis" style="--k-rgb: ${ekFarbe(icon)}"><ha-icon icon="${ekEsc(icon)}"></ha-icon></div>
        <div class="name">${ekEsc(name)}</div>
        ${i.description ? `<div class="info">${ekEsc(i.description)}</div>` : ""}
      </div>`;
  }

  _render() {
    if (!this._grid) return;
    const t = this._t;
    const sperre = this._fehler || (this._weg ? t.unavailable : null) || (!this._items ? t.loading : null);
    this._sperren(!!sperre);
    if (sperre) {
      this._grid.innerHTML = `<div class="leer">${ekEsc(sperre)}</div>`;
      return;
    }
    const offen = this._sortieren(this._items.filter((i) => i.status === "needs_action"));
    this._zahl.textContent = t.open(offen.length);
    this._renderFavoriten(offen);
    this._renderZuletzt(offen);
    const { reihen, ztReihen, favReihen } = this._aufteilung(offen.length);
    this._renderFavKacheln(favReihen);
    this._renderZuletztKacheln(ztReihen);
    this.shadowRoot.querySelector("ha-card").classList.toggle("mit-zt", !this._favBereich.hidden || !this._ztBereich.hidden);
    if (!offen.length) {
      this._grid.innerHTML = `<div class="leer">${t.empty}</div>`;
      this._alle.innerHTML = `<div class="leer">${t.empty}</div>`;
      this._fokusSetzen();
      return;
    }
    const max = Math.max(1, (this._spalten || 4) * reihen);
    if (offen.length <= max || max < 2) {
      this._grid.innerHTML = offen.slice(0, max).map((i) => this._kachel(i)).join("");
    } else {
      const zeigen = offen.slice(0, max - 1);
      const rest = offen.length - zeigen.length;
      this._grid.innerHTML = zeigen.map((i) => this._kachel(i)).join("") + `
        <div class="kachel mehr" role="button" tabindex="0" aria-label="+${rest} ${t.more}, ${t.showAllItems}" title="${t.showAllItems}">
          <div class="plus">+${rest}</div>
          <div class="name">${t.more}</div>
        </div>`;
    }
    this._alle.innerHTML = offen.map((i) => this._kachel(i)).join("");
    this._fokusSetzen();
  }

  // Karte sperren, solange die Liste nicht lesbar ist: alte Daten, Fenster und Rückgängig weg, Eingabe aus
  // lock the card while the list cannot be read: stale data, dialogs and undo gone, input disabled
  _sperren(an) {
    const r = this.shadowRoot;
    r.querySelector("ha-card").classList.toggle("gesperrt", an);
    r.querySelectorAll("form input, form button").forEach((x) => { x.disabled = an; });
    if (!an) return;
    r.querySelector("ha-card").classList.remove("mit-zt");
    this._ztBereich.hidden = true;
    this._favBereich.hidden = true;
    this._favTitel.hidden = true;
    for (const g of [this._alle, this._zuletztAlle, this._ztGrid, this._chips, this._favGrid, this._favAlle]) g.innerHTML = "";
    this._chips.classList.add("aus");
    this._zahl.textContent = "";
    if (this._dialog.open) this._dialog.close();
    if (this._bDialog.open) this._bDialog.close();
    this._fokus = null;
    if (this._undoListe?.length) { clearTimeout(this._undoTimer); this._undoEnde(); }
  }

  // nach Abhaken per Tastatur die nächste Kachel im selben Bereich fokussieren (Karte oder Fenster)
  // after a keyboard check-off focus the next tile in the same area (card or dialog)
  _fokusSetzen() {
    const f = this._fokus;
    if (!f) return;
    const kacheln = [...f.grid.querySelectorAll(".kachel")];
    // Artikel noch da (Antwort steht aus): weiter warten / item still there (no answer yet): keep waiting
    if (kacheln.some((k) => k.dataset.uid === f.uid)) return;
    this._fokus = null;
    if (kacheln.length) kacheln[Math.min(f.index, kacheln.length - 1)].focus();
    else if (this._dialog.open) this.shadowRoot.querySelector(".zu").focus();
  }

  // Kachelreihen auf offene und zuletzt gekaufte Artikel aufteilen
  // split the rows of tiles between open and recently bought items
  // recent_style: "auto" = Kacheln nur, wenn nach allen offenen Artikeln Platz bleibt / tiles only if space is left
  //               "tiles" = immer mindestens eine Reihe / always at least one row, "chips" = nur Chips / chips only
  // offene Artikel sortieren: none = wie geliefert, category = nach Bereich (Einkaufsweg), alpha = alphabetisch
  // sort open items: none = as delivered, category = by category (shop route), alpha = alphabetical
  _sortieren(liste) {
    const art = this._config.sort || "none";
    if (art === "category") {
      return liste.map((i, n) => ({ i, n, r: ekRang(this._icon(i.summary)) }))
        .sort((a, b) => a.r - b.r || a.n - b.n).map((x) => x.i);
    }
    if (art === "alpha") {
      const sprache = this._t === EK_TEXT.de ? "de" : "en";
      return [...liste].sort((a, b) => String(a.summary).localeCompare(String(b.summary), sprache, { sensitivity: "base" }));
    }
    return liste;
  }

  // Favoriten bekommen freie Reihen zuerst, der Rest geht an „Zuletzt gekauft“
  // favorites get free rows first, the rest goes to "recently bought"
  _aufteilung(anzahl) {
    const zeilen = this._zeilen();
    const stil = this._config.recent_style || "auto";
    const ztMoeglich = this._config.show_recent !== false && !!this._zuletzt?.length && stil !== "chips";
    const favN = this._favs?.length || 0;
    if (!ztMoeglich && !favN) return { reihen: zeilen, ztReihen: 0, favReihen: 0 };
    const sp = this._spalten || 4;
    const benoetigt = Math.max(1, Math.ceil(anzahl / sp));
    const frei = this._frei || 0;
    if (!frei) return { reihen: zeilen, ztReihen: ztMoeglich && stil === "tiles" ? 1 : 0, favReihen: 0 };
    // Höhe: Kachelreihen je 100 px + 8 px Abstand; je Bereich (Linie, Überschrift, Abstand) 42 px
    // tile rows 100 px + 8 px gap; each section (divider, heading, gap) 42 px
    const platz = (k, bereiche) => Math.floor((frei - (k * 108 - 8) - bereiche * 42 + 8) / 108);
    let k = Math.max(1, Math.min(benoetigt, zeilen));
    if (ztMoeglich && stil === "tiles") while (k > 1 && platz(k, 1) < 1) k--;
    let fav = Math.min(Math.ceil(favN / sp), Math.max(0, platz(k, 1)));
    let zt = 0;
    if (ztMoeglich) {
      zt = Math.max(0, platz(k, fav ? 2 : 1) - fav);
      // „tiles“: mindestens eine Reihe „Zuletzt gekauft“ / at least one row of recently bought
      if (stil === "tiles" && zt < 1) {
        fav = Math.max(0, platz(k, 2) - 1);
        zt = Math.max(0, platz(k, fav ? 2 : 1) - fav);
      }
    }
    return { reihen: k, ztReihen: zt, favReihen: fav };
  }

  // Favoriten aus der Konfiguration (Text mit Kommas oder Liste); offene werden ausgeblendet
  // favorites from the config (comma-separated text or a list); open ones are hidden
  _favNamen() {
    const f = this._config.favorites;
    const roh = this._config.favorites_entity
      ? (this._favListe || []).map((i) => i.summary)
      : Array.isArray(f) ? f : String(f || "").split(/[,;\n]/);
    const gesehen = new Set();
    const namen = [];
    for (const x of roh) {
      const n = String(x ?? "").trim();
      const k = n.toLowerCase();
      if (!n || gesehen.has(k)) continue;
      gesehen.add(k);
      namen.push(n);
    }
    return namen;
  }

  _renderFavoriten(offen) {
    const offenNamen = new Set(offen.map((i) => String(i.summary).toLowerCase().trim()));
    // erledigter Eintrag gleichen Namens (z. B. Bring!s „Zuletzt verwendet“) wird wiederverwendet
    // a completed item with the same name (e.g. Bring!'s "recently used") is reused
    const erledigt = new Map();
    for (const i of this._items) {
      if (i.status === "completed") erledigt.set(String(i.summary).toLowerCase().trim(), i);
    }
    this._favs = this._favNamen()
      .filter((n) => !offenNamen.has(n.toLowerCase()))
      .map((n) => {
        const i = erledigt.get(n.toLowerCase());
        return { summary: n, uid: i ? i.uid : `fav:${n}`, description: i?.description || "" };
      });
    this._favTitel.hidden = !this._favs.length;
    this._favAlle.innerHTML = this._favs.map((i) => this._kachel(i, true, true)).join("");
  }

  _renderFavKacheln(favReihen) {
    const liste = (this._favs || []).slice(0, favReihen * (this._spalten || 4));
    this._favBereich.hidden = !liste.length;
    this._favGrid.innerHTML = liste.map((i) => this._kachel(i, true, true)).join("");
  }

  _favTippen(el) {
    const uid = el.dataset.uid || "";
    if (!uid.startsWith("fav:")) { this._wieder(uid, el); return; }
    if (!this._dimmen(uid, el)) return;
    this._dienst("add_item", { item: uid.slice(4) }).catch(() => {
      this._entgrauen(uid);
      if (this._fokus?.uid === uid) this._fokus = null;
    });
  }

  // Kachel abdunkeln, bis die Liste sich meldet (spätestens 8 s); weitere Taps solange ignorieren
  // dim a tile until the list reports back (8 s at most); ignore further taps meanwhile
  _dimmen(uid, el) {
    if (!this._warten) this._warten = new Map();
    if (this._warten.has(uid)) return false;
    this._warten.set(uid, setTimeout(() => this._entgrauen(uid), 8000));
    el.style.opacity = "0.3";
    el.setAttribute("aria-busy", "true");
    return true;
  }

  _entgrauen(uid) {
    const t = this._warten?.get(uid);
    if (t) clearTimeout(t);
    this._warten?.delete(uid);
    this.shadowRoot?.querySelectorAll("[data-uid]").forEach((k) => {
      if (k.dataset.uid === uid) { k.style.opacity = ""; k.removeAttribute("aria-busy"); }
    });
  }

  // neue Listendaten: alle Wartezustände enden, die Karte zeichnet ohnehin neu
  // new list data: every pending state ends, the card redraws anyway
  _wartenLeeren() {
    if (!this._warten) return;
    this._warten.forEach((t) => clearTimeout(t));
    this._warten.clear();
  }

  _renderZuletztKacheln(ztReihen) {
    const anzahl = ztReihen * (this._spalten || 4);
    const liste = (this._zuletzt || []).slice(0, anzahl);
    this._ztBereich.hidden = !liste.length;
    this._ztGrid.innerHTML = liste.map((i) => this._kachel(i, true)).join("");
    // Kacheln ersetzen die Chips / tiles replace the chips
    if (liste.length) this._chips.classList.add("aus");
  }

  _renderZuletzt(offen) {
    // zuletzt erledigte Artikel, ohne Doppelte und ohne gerade offene
    // recently completed items, without duplicates and without currently open ones
    const t = this._t;
    const offenNamen = new Set(offen.map((i) => String(i.summary).toLowerCase().trim()));
    // Favoriten erscheinen nicht zusätzlich unter „Zuletzt“ / favorites are not repeated under "recent"
    // (mit favorites_in_recent: true doch auch dort / unless favorites_in_recent: true)
    const gesehen = new Set(this._config.favorites_in_recent === true ? [] : this._favNamen().map((n) => n.toLowerCase()));
    const zuletzt = [];
    if (this._config.show_recent !== false) {
      for (const i of [...this._items].reverse()) {
        if (i.status !== "completed") continue;
        const k = String(i.summary).toLowerCase().trim();
        if (!k || offenNamen.has(k) || gesehen.has(k)) continue;
        gesehen.add(k);
        zuletzt.push(i);
        if (zuletzt.length >= 24) break;
      }
    }
    this._zuletzt = zuletzt;
    this._chips.classList.toggle("aus", !zuletzt.length);
    this._chips.innerHTML = zuletzt.length ? `<span class="etikett">${t.recent}</span>` + zuletzt.slice(0, 10).map((i) => `
      <button type="button" class="chip" data-uid="${ekEsc(i.uid)}" title="${ekEsc(ekGross(i.summary))} – ${t.readd}">
        <ha-icon icon="mdi:restore"></ha-icon>${ekEsc(ekGross(i.summary))}</button>`).join("") : "";
    this._zuletztTitel.hidden = !zuletzt.length;
    this._zuletztAlle.innerHTML = zuletzt.map((i) => this._kachel(i, true)).join("");
    requestAnimationFrame(() => this._chipsKuerzen());
  }

  _chipsKuerzen() {
    // nur Chips zeigen, die ganz in die Zeile passen / only show chips that fit completely
    if (!this._chips) return;
    const rechts = this._chips.getBoundingClientRect().right;
    let voll = false;
    this._chips.querySelectorAll(".chip").forEach((c) => {
      c.classList.remove("weg");
      if (voll || c.getBoundingClientRect().right > rechts + 0.5) { c.classList.add("weg"); voll = true; }
    });
  }

  _wieder(uid, el) {
    if (!uid || !this._dimmen(uid, el)) return;
    this._dienst("update_item", { item: uid, status: "needs_action" }).catch(() => {
      this._entgrauen(uid);
      if (this._fokus?.uid === uid) this._fokus = null;
    });
  }

  // Dienst aufrufen; die Fehlermeldung zeigt HA selbst, die Karte stellt nur die Anzeige zurück
  // call a service; HA shows the error toast itself, the card only restores its display
  _dienst(aktion, daten, liste = this._config.entity) {
    return this._hass.callService("todo", aktion, daten, { entity_id: liste });
  }

  _vibrieren(art) {
    this.dispatchEvent(new CustomEvent("haptic", { detail: art, bubbles: true, composed: true }));
  }

  _bearbeiten(uid, fav = false) {
    if (this._bDialog.open) return;
    // Favoriten-Kachel: nur Name zeigen und „Aus Favoriten entfernen“ anbieten
    // favorite tile: show the name only and offer "remove from favorites"
    const i = fav ? (this._favs || []).find((x) => x.uid === uid) : (this._items || []).find((x) => x.uid === uid);
    if (!i) return;
    this._vibrieren("medium");
    this._bUid = uid;
    this._bFav = fav;
    this._bName = i.summary || "";
    const r = this.shadowRoot;
    const name = r.querySelector("#bname");
    name.value = i.summary || "";
    name.readOnly = fav;
    r.querySelector("#bdesc").value = i.description || "";
    // nur anbieten, was die Liste kann: Angabe (64), Löschen (2), Umbenennen/Speichern (4)
    // offer only what the list supports: description (64), delete (2), rename/save (4)
    const m = this._merkmale();
    const zeigen = { "#bdesc": !fav && !!(m & 64), "label[for=bdesc]": !fav && !!(m & 64), ".loeschen": !fav && !!(m & 2), ".speichern": !fav && !!(m & 4) };
    for (const [sel, an] of Object.entries(zeigen)) r.querySelector(sel).hidden = !an;
    if (!fav && !(m & 4)) name.readOnly = true;
    const fehler = r.querySelector(".bfehler");
    fehler.hidden = true;
    fehler.textContent = "";
    r.querySelector("#stc-bearb-titel").textContent = fav ? this._t.favItem : this._t.edit;
    this._favKnopf();
    if (this._dialog.open) this._dialog.close();
    this._fokusUid = uid;
    this._bDialog.showModal();
    (fav ? r.querySelector(".favknopf") : name).focus();
  }

  _istFav(name) {
    const k = String(name || "").trim().toLowerCase();
    return (this._favListe || []).some((x) => String(x.summary || "").trim().toLowerCase() === k);
  }

  // Knopf „Zu Favoriten / Aus Favoriten“ – nur mit erreichbarer Favoriten-Liste
  // "add to / remove from favorites" button – only with a reachable favorites list
  _favKnopf() {
    const b = this.shadowRoot.querySelector(".favknopf");
    const an = !!(this._config.favorites_entity && this._favListe);
    b.hidden = !an;
    if (!an) return;
    const ist = this._istFav(this._bName);
    b.textContent = ist ? `★ ${this._t.favRemove}` : `☆ ${this._t.favAddBtn}`;
    b.setAttribute("aria-pressed", String(ist));
  }

  async _favUmschalten() {
    const fe = this._config.favorites_entity;
    const name = String(this._bName || "").trim();
    const uidVorher = this._bUid;
    let b = this.shadowRoot.querySelector(".favknopf");
    if (!fe || !name || this._favSchaltet) return;
    this._favSchaltet = true;
    b.disabled = true;
    const k = name.toLowerCase();
    // gilt die Antwort noch dem offenen Fenster? / does the answer still belong to the open dialog?
    const gleich = () => this._bDialog.open && this._bUid === uidVorher;
    try {
      if (this._istFav(name)) {
        const uids = (this._favListe || []).filter((x) => String(x.summary || "").trim().toLowerCase() === k).map((x) => x.uid);
        for (const uid of uids) await this._hass.callService("todo", "remove_item", { item: uid }, { entity_id: fe });
      } else {
        await this._hass.callService("todo", "add_item", { item: name }, { entity_id: fe });
      }
      if (this._bFav && gleich()) this._bDialog.close();
    } catch (err) {
      b = this.shadowRoot.querySelector(".favknopf");
      if (gleich()) b.textContent = `⚠ ${this._t.favFail}`;
    } finally {
      this._favSchaltet = false;
      this.shadowRoot.querySelector(".favknopf").disabled = false;
    }
  }

  _merkmale() {
    return Number(this._hass?.states[this._config.entity]?.attributes?.supported_features) || 0;
  }

  // Fenster erst nach erfolgreichem Speichern schließen; ein Fehler bleibt sichtbar im Fenster
  // close the dialog only after a successful save; an error stays visible in the dialog
  async _speichern() {
    if (this._bFav || this._bSpeichert) return;
    const r = this.shadowRoot;
    const i = (this._items || []).find((x) => x.uid === this._bUid);
    const name = r.querySelector("#bname").value.trim();
    const desc = r.querySelector("#bdesc").value.trim();
    const m = this._merkmale();
    if (!i || !name || !(m & 4)) return;
    const daten = { item: this._bUid };
    if (name !== i.summary) daten.rename = name;
    if ((m & 64) && desc !== (i.description || "")) daten.description = desc;
    if (Object.keys(daten).length < 2) { this._bDialog.close(); return; }
    const uidVorher = this._bUid;
    // gilt die Antwort noch dem offenen Fenster? / does the answer still belong to the open dialog?
    const gleich = () => this._bDialog.open && this._bUid === uidVorher;
    this._bSpeichert = true;
    r.querySelector(".speichern").disabled = true;
    try {
      await this._dienst("update_item", daten);
      if (gleich()) this._bDialog.close();
    } catch (err) {
      if (gleich()) {
        const fehler = this.shadowRoot.querySelector(".bfehler");
        fehler.textContent = `${this._t.saveFail}: ${err?.message || err}`;
        fehler.hidden = false;
      }
    } finally {
      this._bSpeichert = false;
      this.shadowRoot.querySelector(".speichern").disabled = false;
    }
  }

  _loeschen() {
    if (this._bFav) return;
    const uid = this._bUid;
    const i = (this._items || []).find((x) => x.uid === uid);
    this._fokusUid = null;
    this._bDialog.close();
    if (!uid || !i) return;
    const eintrag = { art: "del", uid, summary: i.summary, description: i.description || "", liste: this._config.entity };
    eintrag.loeschen = this._dienst("remove_item", { item: uid });
    eintrag.loeschen.catch(() => this._undoEntfernen(eintrag));
    this._undoZeigen(eintrag);
  }

  _oeffnen() {
    if (this._dialog && !this._dialog.open) this._dialog.showModal();
  }

  _abhaken(uid, name, el) {
    if (!uid || !this._dimmen(uid, el)) return;
    this._vibrieren("success");
    const eintrag = { art: "done", uid, summary: name, liste: this._config.entity };
    this._dienst("update_item", { item: uid, status: "completed" }).catch(() => {
      this._entgrauen(uid);
      if (this._fokus?.uid === uid) this._fokus = null;
      this._undoEntfernen(eintrag);
    });
    this._undoZeigen(eintrag);
  }

  // Rückgängig gilt für alle Aktionen der letzten 10 s / undo covers every action of the last 10 s
  _undoZeigen(eintrag) {
    this._undoListe = [...(this._undoListe || []), eintrag];
    // erst einblenden, dann Text setzen: die Live-Region bleibt immer im Barrierefreiheitsbaum
    // show first, then set the text: the live region always stays in the accessibility tree
    this._undo.classList.remove("aus");
    this._undo.querySelector("button").hidden = false;
    this._status.classList.add("undo-aktiv");
    this._undoText();
    clearTimeout(this._undoTimer);
    this._undoTimer = setTimeout(() => this._undoEnde(), 10000);
  }

  _undoEntfernen(eintrag) {
    this._undoListe = (this._undoListe || []).filter((x) => x !== eintrag);
    if (!this._undoListe.length) { clearTimeout(this._undoTimer); this._undoEnde(); } else this._undoText();
  }

  _undoText() {
    const t = this._t;
    const l = this._undoListe;
    const name = (x) => ekGross(x.summary);
    let text;
    if (l.length === 1) text = l[0].art === "del" ? t.deleted(name(l[0])) : t.done(name(l[0]));
    else if (l.every((x) => x.art === "done")) text = t.doneN(l.length);
    else text = t.changes(l.length);
    const feld = this._undo.querySelector(".undotext");
    if (feld.textContent !== text) feld.textContent = text;
  }

  // kurze Meldung im Rückgängig-Bereich (Live-Region), ohne Rückgängig-Knopf
  // short message in the undo area (live region), without the undo button
  // laufende Rückgängig-Einträge bleiben erhalten; dann nur der Text, Knopf und Ablaufzeit unverändert
  // pending undo entries are kept; then only the text changes, button and timeout stay as they are
  _meldung(text) {
    if (this._undoListe?.length) { this._undo.querySelector(".undotext").textContent = text; return; }
    this._undo.classList.remove("aus");
    this._undo.querySelector("button").hidden = true;
    this._status.classList.add("undo-aktiv");
    this._undo.querySelector(".undotext").textContent = text;
    clearTimeout(this._undoTimer);
    this._undoTimer = setTimeout(() => this._undoEnde(), 6000);
  }

  _undoEnde() {
    this._undo.classList.add("aus");
    this._undo.querySelector("button").hidden = true;
    this._undo.querySelector(".undotext").textContent = "";
    this._status.classList.remove("undo-aktiv");
    this._undoListe = [];
    requestAnimationFrame(() => this._chipsKuerzen());
  }

  _rueckgaengig() {
    const liste = this._undoListe || [];
    if (!liste.length) return;
    for (const x of liste) {
      if (x.art === "done") {
        this._dienst("update_item", { item: x.uid, status: "needs_action" }, x.liste).catch(() => this._meldung(this._t.undoFail));
      } else {
        // Gelöschtes neu anlegen; die Angabe nur, wenn die Liste sie kennt (Merkmal 64)
        // add a deleted item again; the description only if the list supports it (feature 64)
        const merkmale = this._hass.states[x.liste]?.attributes?.supported_features || 0;
        const daten = { item: x.summary };
        if (x.description && (merkmale & 64)) daten.description = x.description;
        // erst nach bestätigtem Löschen neu anlegen / add again only once the delete is confirmed
        // in die Liste, aus der gelöscht wurde, auch wenn inzwischen eine andere gewählt ist
        // into the list it was deleted from, even if another list has been chosen meanwhile
        x.loeschen.then(() => this._dienst("add_item", daten, x.liste).catch(() => this._meldung(this._t.undoFail)), () => {});
      }
    }
    clearTimeout(this._undoTimer);
    this._undoEnde();
  }

  getCardSize() { return 3; }
  getGridOptions() { return { columns: 12, rows: 4 }; }
  static getStubConfig(hass) {
    const todo = Object.keys(hass?.states || {}).find((id) => id.startsWith("todo."));
    return { entity: todo || "todo.shopping_list" };
  }

  static getConfigElement() { return document.createElement("shopping-tiles-card-editor"); }
}

// Grafischer Editor / visual editor
const EK_EDITOR_TEXT = {
  de: { entity: "Einkaufsliste (To-do-Liste)", rows: "Kachelreihen", rowsAuto: "Automatisch (nach Kartenhöhe)", show_recent: "Zuletzt gekaufte Artikel anzeigen", show_title: "Titel in der Karte anzeigen",
        recent_style: "Zuletzt gekaufte als", styleAuto: "Automatisch (Kacheln, wenn Platz frei ist)", styleChips: "Chips (eine Zeile)", styleTiles: "Kacheln",
        sort: "Sortierung der offenen Artikel", sortNone: "Wie in der Liste", sortCategory: "Nach Bereich (Weg durch den Laden)", sortAlpha: "Alphabetisch",
        favorites_entity: "Favoriten-Liste (gilt für alle Karten, Artikel per langem Drücken hinzufügen)",
        favorites: "Favoriten (durch Komma getrennt, z. B. Milch, Brot, Eier)",
        favorites_in_recent: "Favoriten auch unter „Zuletzt gekauft“ zeigen",
        favListName: "Favoriten", favCreate: "Favoriten-Liste anlegen", favMove: "Favoriten aus dem Textfeld in die Liste übernehmen",
        favCreateHint: "Legt in Home Assistant eine To-do-Liste „Favoriten“ an (Integration Local To-do) und wählt sie aus.",
        favBusy: "Einen Moment …", favCreated: (e) => `Favoriten-Liste ${e} angelegt und ausgewählt.`, favFound: (e) => `Favoriten-Liste ${e} gab es schon – ausgewählt.`, favMoved: (n) => `${n} Favoriten übernommen.`,
        favErr: "Hat nicht geklappt", favListHint: "Mit Favoriten-Liste wird das Textfeld nicht mehr verwendet.",
        title: "Titel", language: "Sprache", auto: "Automatisch (wie HA)",
        hint: "Eigene Symbole (icons) lassen sich im YAML-Modus festlegen." },
  en: { entity: "Shopping list (to-do list)", rows: "Rows of tiles", rowsAuto: "Automatic (from card height)", show_recent: "Show recently bought items", show_title: "Show title in card",
        recent_style: "Show recently bought as", styleAuto: "Automatic (tiles when there is free space)", styleChips: "Chips (one line)", styleTiles: "Tiles",
        sort: "Sort open items", sortNone: "As in the list", sortCategory: "By category (route through the shop)", sortAlpha: "Alphabetical",
        favorites_entity: "Favorites list (shared by all cards, add items with a long press)",
        favorites: "Favorites (comma-separated, e.g. milk, bread, eggs)",
        favorites_in_recent: "Also show favorites under “Recently bought”",
        favListName: "Favorites", favCreate: "Create favorites list", favMove: "Move the favorites from the text field into the list",
        favCreateHint: "Creates a to-do list “Favorites” in Home Assistant (Local To-do integration) and selects it.",
        favBusy: "One moment …", favCreated: (e) => `Favorites list ${e} created and selected.`, favFound: (e) => `Favorites list ${e} already existed – selected.`, favMoved: (n) => `${n} favorites moved.`,
        favErr: "That did not work", favListHint: "With a favorites list, the text field is no longer used.",
        title: "Title", language: "Language", auto: "Automatic (same as HA)",
        hint: "Custom icons (icons) can be set in YAML mode." },
};

class ShoppingTilesCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = { ...config };
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (this._form) this._form.hass = hass;
    else this._render();
  }

  get _txt() {
    const l = (this._hass?.locale?.language || this._hass?.language || "en").slice(0, 2);
    return EK_EDITOR_TEXT[l] || EK_EDITOR_TEXT.en;
  }

  _schema() {
    const x = this._txt;
    return [
      { name: "entity", required: true, selector: { entity: { domain: "todo" } } },
      { name: "rows", selector: { select: { mode: "dropdown", options: [
        { value: "auto", label: x.rowsAuto }, ...[1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: String(n) })),
      ] } } },
      { name: "show_recent", selector: { boolean: {} } },
      { name: "sort", selector: { select: { mode: "dropdown", options: [
        { value: "none", label: x.sortNone }, { value: "category", label: x.sortCategory }, { value: "alpha", label: x.sortAlpha },
      ] } } },
      { name: "recent_style", selector: { select: { mode: "dropdown", options: [
        { value: "auto", label: x.styleAuto }, { value: "chips", label: x.styleChips }, { value: "tiles", label: x.styleTiles },
      ] } } },
      { name: "favorites_entity", selector: { entity: { domain: "todo" } } },
      // Textfeld nur ohne Favoriten-Liste – oder solange dort noch etwas steht (zum Übernehmen)
      // text field only without a favorites list – or while it still holds something (to move it over)
      ...(this._config.favorites_entity && !this._favText() ? [] : [{ name: "favorites", selector: { text: {} } }]),
      { name: "favorites_in_recent", selector: { boolean: {} } },
      { name: "show_title", selector: { boolean: {} } },
      { name: "title", selector: { text: {} } },
      { name: "language", selector: { select: { mode: "dropdown", options: [
        { value: "auto", label: x.auto }, { value: "de", label: "Deutsch" }, { value: "en", label: "English" },
      ] } } },
    ];
  }

  _render() {
    if (!this._hass || !this._config) return;
    if (!this._form) {
      this._form = document.createElement("ha-form");
      this._form.computeLabel = (s) => this._txt[s.name] || s.name;
      this._form.addEventListener("value-changed", (e) => this._changed(e.detail.value));
      this._hint = document.createElement("div");
      this._hint.style.cssText = "margin-top:12px;font-size:12px;color:var(--secondary-text-color)";
      this._favBox = document.createElement("div");
      this._favBox.style.cssText = "margin-top:12px;font-size:12px;color:var(--secondary-text-color)";
      this.append(this._form, this._favBox, this._hint);
    }
    this._hint.textContent = this._txt.hint;
    this._favBoxZeichnen();
    this._form.hass = this._hass;
    this._form.schema = this._schema();
    this._form.data = {
      show_title: true, show_recent: true, recent_style: "auto", language: "auto", title: "", favorites_in_recent: false, sort: "none",
      ...this._config,
      rows: this._config.rows === undefined ? "auto" : String(this._config.rows),
      favorites: Array.isArray(this._config.favorites) ? this._config.favorites.join(", ") : (this._config.favorites || ""),
    };
  }

  _favText() {
    const f = this._config.favorites;
    return (Array.isArray(f) ? f.join(", ") : String(f || "")).trim();
  }

  // Knöpfe „Favoriten-Liste anlegen“ / „übernehmen“ – nur für Administratoren (die dürfen Integrationen anlegen)
  // "create favorites list" / "move" buttons – admins only (they may add integrations)
  _favBoxZeichnen() {
    const x = this._txt;
    const box = this._favBox;
    const admin = !!this._hass?.user?.is_admin;
    const knopf = (text, fn) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = text;
      b.style.cssText = "font:inherit;font-size:13px;padding:6px 12px;border-radius:8px;border:1px solid var(--divider-color);background:none;color:var(--primary-color);cursor:pointer;margin-right:8px";
      b.addEventListener("click", () => { if (!this._favArbeit) fn(); });
      return b;
    };
    box.replaceChildren();
    if (admin && !this._config.favorites_entity) {
      box.append(knopf(x.favCreate, () => this._favListeAnlegen()));
      const t = document.createElement("div");
      t.style.marginTop = "6px";
      t.textContent = x.favCreateHint;
      box.append(t);
    } else if (this._config.favorites_entity && this._favText()) {
      box.append(knopf(x.favMove, () => this._favUebernehmen()));
      const t = document.createElement("div");
      t.style.marginTop = "6px";
      t.textContent = x.favListHint;
      box.append(t);
    }
    if (this._favMeldung) {
      const m = document.createElement("div");
      m.style.cssText = "margin-top:6px;color:var(--primary-text-color)";
      m.setAttribute("role", "status");
      m.textContent = this._favMeldung;
      box.append(m);
    }
  }

  _favStatus(text) {
    this._favMeldung = text;
    this._favBoxZeichnen();
  }

  async _favListeAnlegen() {
    const x = this._txt;
    this._favArbeit = true;
    this._favStatus(x.favBusy);
    try {
      const name = x.favListName;
      let r = await this._hass.callApi("POST", "config/config_entries/flow", { handler: "local_todo", show_advanced_options: false });
      if (r.type === "form") r = await this._hass.callApi("POST", `config/config_entries/flow/${r.flow_id}`, { todo_list_name: name });
      let eintrag = r.type === "create_entry" ? r.result?.entry_id : null;
      const neu = !!eintrag;
      if (!eintrag) {
        // gibt es schon (Abbruch „already_configured“): vorhandene Liste gleichen Namens nehmen
        // exists already (abort "already_configured"): use the existing list of that name
        const alle = await this._hass.callWS({ type: "config_entries/get", domain: "local_todo" });
        eintrag = alle.find((e) => e.title === name)?.entry_id;
      }
      let ent = null;
      for (let n = 0; n < 10 && !ent && eintrag; n++) {
        const reg = await this._hass.callWS({ type: "config/entity_registry/list" });
        ent = reg.find((e) => e.config_entry_id === eintrag && e.entity_id.startsWith("todo."))?.entity_id || null;
        if (!ent) await new Promise((ok) => setTimeout(ok, 500));
      }
      if (!ent) throw new Error("todo entity not found");
      this._favMeldung = neu ? x.favCreated(ent) : x.favFound(ent);
      this._changed({ favorites_entity: ent });
    } catch (err) {
      this._favMeldung = `${x.favErr}: ${err?.message || err?.body?.message || err}`;
    } finally {
      this._favArbeit = false;
      this._render();
    }
  }

  async _favUebernehmen() {
    const x = this._txt;
    const fe = this._config.favorites_entity;
    if (!fe) return;
    this._favArbeit = true;
    this._favStatus(x.favBusy);
    try {
      const vorhanden = await this._hass.callWS({ type: "todo/item/list", entity_id: fe });
      const da = new Set((vorhanden.items || []).map((i) => String(i.summary || "").trim().toLowerCase()));
      let n = 0;
      for (const roh of this._favText().split(/[,;\n]/)) {
        const name = roh.trim();
        if (!name || da.has(name.toLowerCase())) continue;
        await this._hass.callService("todo", "add_item", { item: name }, { entity_id: fe });
        da.add(name.toLowerCase());
        n++;
      }
      this._favMeldung = x.favMoved(n);
      this._changed({ favorites: "" });
    } catch (err) {
      this._favMeldung = `${x.favErr}: ${err?.message || err}`;
    } finally {
      this._favArbeit = false;
      this._render();
    }
  }

  _changed(werte) {
    const neu = { ...this._config, ...werte };
    if (!neu.language || neu.language === "auto") delete neu.language;
    if (!neu.title) delete neu.title;
    if (Array.isArray(neu.favorites)) neu.favorites = neu.favorites.join(", ");
    if (!String(neu.favorites || "").trim()) delete neu.favorites;
    if (neu.favorites_in_recent !== true) delete neu.favorites_in_recent;
    if (!neu.favorites_entity) delete neu.favorites_entity;
    if (neu.show_title !== false) delete neu.show_title;
    if (neu.show_recent !== false) delete neu.show_recent;
    if (!neu.recent_style || neu.recent_style === "auto") delete neu.recent_style;
    if (!neu.sort || neu.sort === "none") delete neu.sort;
    if (!neu.rows || neu.rows === "auto") delete neu.rows;
    else neu.rows = Number(neu.rows);
    this._config = neu;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: neu }, bubbles: true, composed: true }));
  }
}

if (!customElements.get("shopping-tiles-card")) {
  customElements.define("shopping-tiles-card", ShoppingTilesCard);
  customElements.define("shopping-tiles-card-editor", ShoppingTilesCardEditor);
}
console.info(`%c SHOPPING-TILES-CARD %c v${STC_VERSION} `, "color:#fff;background:#03a9f4;font-weight:600", "color:#03a9f4");
window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === "shopping-tiles-card")) window.customCards.push({
  type: "shopping-tiles-card",
  preview: true,
  name: "Shopping Tiles Card",
  description: "Open items of a to-do list as icon tiles – tap to check off. / Offene Artikel als Kacheln – Antippen hakt ab.",
  documentationURL: "https://github.com/plerzelwupp/shopping-tiles-card",
});
