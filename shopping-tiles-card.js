/*
 * Shopping Tiles Card – shows the open items of a Home Assistant to-do list as icon tiles.
 * Einkaufsliste als Kacheln – zeigt die offenen Artikel einer To-do-Liste als Kacheln mit Symbol.
 *
 * Usage / Nutzung:  type: custom:shopping-tiles-card
 *                   entity: todo.shopping_list
 *
 * https://github.com/plerzelwupp/shopping-tiles-card – MIT License, (c) 2026 plerzelwupp
 */
const STC_VERSION = "1.2.1";

// Reihenfolge zählt: genauere Begriffe vor allgemeinen. "=wort" trifft nur ganze Wörter.
const EK_ICONS = [
  // englische Wörter, die sonst einen deutschen Begriff treffen / English words that would hit a German keyword
  ["chocolate", "mdi:candy"], ["lemonade", "mdi:bottle-soda"], ["cornflakes", "mdi:grain"],
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
    error: "Liste nicht lesbar", close: "Schließen", tap: "Antippen zum Abhaken",
    needEntity: "Bitte eine todo-Entität angeben (z. B. todo.zuhause)",
    recent: "Zuletzt:", recentTitle: "Zuletzt gekauft", readd: "Antippen, um wieder auf die Liste zu setzen",
    hold: "lange drücken zum Bearbeiten", edit: "Artikel bearbeiten", name: "Name", desc: "Angabe (z. B. 1 kg, Bio)",
    save: "Speichern", del: "Löschen", cancel: "Abbrechen",
    deleted: (n) => `„${n}“ gelöscht.`, doneN: (n) => `${n} Artikel abgehakt.`, changes: (n) => `${n} Änderungen.`,
    keys: "Enter: abhaken, F2 oder Kontextmenü-Taste: bearbeiten",
  },
  en: {
    title: "Shopping list", open: (n) => `${n} open`, more: "more", showAll: "Show all",
    showAllItems: "Show all open items", allOpen: "all open", add: "Add item", addBtn: "Add",
    undo: "Undo", done: (n) => `“${n}” checked off.`, empty: "All done 🎉", loading: "Loading …",
    error: "Could not read the list", close: "Close", tap: "Tap to check off",
    needEntity: "Please set a todo entity (e.g. todo.shopping_list)",
    recent: "Recent:", recentTitle: "Recently bought", readd: "Tap to add it to the list again",
    hold: "long press to edit", edit: "Edit item", name: "Name", desc: "Details (e.g. 1 kg, organic)",
    save: "Save", del: "Delete", cancel: "Cancel",
    deleted: (n) => `“${n}” deleted.`, doneN: (n) => `${n} items checked off.`, changes: (n) => `${n} changes.`,
    keys: "Enter: check off, F2 or context menu key: edit",
  },
};

// Bereiche mit Farbe je Symbol / categories with a colour per icon
const EK_BEREICHE = [
  ["green", "76,175,80", ["fruit-citrus", "fruit-grapes", "fruit-pear", "fruit-pineapple", "fruit-watermelon", "fruit-cherries",
    "food-apple", "mushroom", "chili-hot", "corn", "carrot", "leaf"]],
  ["blue", "33,150,243", ["cup", "cheese", "egg", "ice-cream", "snowflake"]],
  ["red", "244,67,54", ["sausage", "food-steak", "food-drumstick", "fish"]],
  ["amber", "255,152,0", ["bread-slice", "food-croissant", "baguette", "muffin", "pizza", "grain", "pasta", "rice", "shaker-outline", "bottle-tonic"]],
  ["purple", "156,39,176", ["paper-roll", "toothbrush-paste", "toothbrush", "spray", "hand-wash", "shower", "washing-machine", "dishwasher",
    "trash-can", "battery", "baby-bottle-outline", "pill", "bandage", "candle", "lightbulb", "shoe-sneaker"]],
  ["teal", "0,150,136", ["coffee", "tea", "beer", "glass-wine", "water", "bottle-soda"]],
  ["pink", "233,30,99", ["candy", "cookie", "cupcake", "popcorn", "peanut"]],
];

const ekFarbe = (icon) => {
  const name = String(icon).replace("mdi:", "");
  const b = EK_BEREICHE.find(([, , liste]) => liste.includes(name));
  return b ? `var(--rgb-${b[0]}-color, ${b[1]})` : "var(--rgb-grey-color, 158,158,158)";
};

const ekEsc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const ekGross = (s) => { const t = String(s ?? ""); return t.charAt(0).toLocaleUpperCase("de") + t.slice(1); };

class ShoppingTilesCard extends HTMLElement {
  setConfig(config) {
    if (!config.entity || !config.entity.startsWith("todo.")) {
      throw new Error(`${EK_TEXT.de.needEntity} / ${EK_TEXT.en.needEntity}`);
    }
    const alteListe = this._config?.entity;
    this._config = { ...config };
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    if (alteListe !== this._config.entity) {
      // andere Liste gewählt: laufende Anmeldung ungültig machen, neu abonnieren
      // other list: invalidate a pending subscription, subscribe again
      this._aboNr = (this._aboNr || 0) + 1;
      this._unsubscribe();
      this._items = [];
      this._undoListe = [];
      this._fehler = null;
    }
    this._built = false;
    if (this._hass) {
      // Änderungen sofort zeigen (z. B. Vorschau im Editor) / apply changes right away
      this._build();
      this._render();
      if (!this._unsub) this._subscribe();
    }
  }

  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    if (!this._built) this._build();
    if (first || !this._unsub) this._subscribe();
  }

  connectedCallback() {
    if (this._hass && !this._unsub) this._subscribe();
    if (this._ro && this._grid) {
      this._ro.observe(this._grid);
      this._ro.observe(this.shadowRoot.querySelector("ha-card"));
    }
  }
  disconnectedCallback() {
    this._unsubscribe();
    clearTimeout(this._retryTimer);
    if (this._ro) this._ro.disconnect();
  }

  _subscribe() {
    if (this._subscribing || !this._hass) return;
    this._subscribing = true;
    // jede Anmeldung bekommt eine Nummer; veraltete Antworten werden verworfen
    // every subscription gets a number; stale answers are discarded
    const nr = this._aboNr = (this._aboNr || 0) + 1;
    this._hass.connection.subscribeMessage(
      (msg) => {
        if (nr !== this._aboNr) return;
        this._fehler = null; this._items = msg.items || []; this._render();
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
      this._render();
      // nach 30 s erneut versuchen, solange die Karte angezeigt wird / retry after 30 s while the card is shown
      clearTimeout(this._retryTimer);
      this._retryTimer = setTimeout(() => { if (this.isConnected && !this._unsub) this._subscribe(); }, 30000);
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

  _icon(name) {
    const own = this._config.icons || {};
    const n = String(name).toLowerCase();
    for (const [k, v] of Object.entries(own)) if (n.includes(k.toLowerCase())) return v;
    const woerter = n.split(/[^a-zäöüß]+/);
    for (const [k, v] of [...EK_ICONS, ...EK_ICONS_EN]) {
      if (k.startsWith("=") ? woerter.includes(k.slice(1)) : n.includes(k)) return v;
    }
    return "mdi:basket-outline";
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
        .kachel .zurueck { position:absolute; top:6px; right:6px; --mdc-icon-size: 16px; color: var(--secondary-text-color); }
        .mehr { background: rgba(var(--rgb-primary-color, 3,169,244), 0.15); color: var(--primary-color); }
        .mehr .plus { font-size: 24px; font-weight: 500; }
        .name { font-size: 13px; font-weight: 500; margin-top: 6px; line-height: 1.2; max-width:100%;
                overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; hyphens:auto; overflow-wrap:anywhere; }
        .info { font-size: 11px; color: var(--secondary-text-color); margin-top: 2px; line-height: 1.2; max-width:100%;
                white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .zt-bereich[hidden] { display:none; }
        /* mit Kacheln: „X offen“ direkt unter den offenen Artikeln, dann Trennlinie und „Zuletzt gekauft“
           with tiles: "X open" right below the open items, then a divider and "recently bought" */
        .zt-bereich { flex:1; min-height:0; margin-top:8px; border-top:1px solid var(--divider-color); }
        .zt-titel { font-size:12px; line-height:14px; color: var(--secondary-text-color); margin: 6px 0 4px; }
        ha-card.mit-zt .status { flex:none; margin-top:8px; min-height:24px; }
        ha-card.mit-zt form { margin-top:8px; }
        .leer { grid-column: 1 / -1; color: var(--secondary-text-color); text-align:center; padding: 12px 0; }
        .undo { display:none; font-size:12px; color: var(--secondary-text-color); white-space:nowrap; }
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
        dialog h3 { font-size: 14px; font-weight: 500; color: var(--secondary-text-color); margin: 16px 0 8px; }
      </style>
      <ha-card>
        <div class="kopf ${this._config.show_title === false ? "aus" : ""}">
          ${this._config.show_title === false ? "" : `<ha-icon icon="mdi:cart-outline"></ha-icon>`}
          <span class="titel">${this._config.show_title === false ? "" : ekEsc(this._titel)}</span>
        </div>
        <div class="grid haupt"><div class="leer">${t.loading}</div></div>
        <div class="status">
          <button type="button" class="zahl" title="${t.showAll}"></button>
          <div class="undo" role="status"><span class="undotext"></span><button type="button">${t.undo}</button></div>
          <div class="chips aus"></div>
        </div>
        <div class="zt-bereich" hidden>
          <div class="zt-titel">${t.recentTitle}</div>
          <div class="grid zuletzt-haupt"></div>
        </div>
        <form>
          <input type="text" placeholder="${t.add}" aria-label="${t.add}">
          <button type="submit" aria-label="${t.addBtn}"><ha-icon icon="mdi:plus"></ha-icon></button>
        </form>
      </ha-card>
      <dialog>
        <div class="kopf">
          <ha-icon icon="mdi:cart-outline"></ha-icon>
          <span class="titel">${ekEsc(this._titel)} – ${t.allOpen}</span>
          <button class="zu" aria-label="${t.close}"><ha-icon icon="mdi:close"></ha-icon></button>
        </div>
        <div class="inhalt">
          <div class="grid alle"></div>
          <h3 class="zuletzt-titel" hidden>${t.recentTitle}</h3>
          <div class="grid zuletzt-alle"></div>
        </div>
      </dialog>
      <dialog class="bearbeiten">
        <div class="kopf">
          <ha-icon icon="mdi:pencil-outline"></ha-icon>
          <span class="titel">${t.edit}</span>
        </div>
        <form class="bform">
          <label for="bname">${t.name}</label>
          <input id="bname" type="text" required>
          <label for="bdesc">${t.desc}</label>
          <input id="bdesc" type="text">
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
    const klick = (e) => {
      if (this._lang) { this._lang = false; return; }
      if (e.target.closest(".mehr")) { this._oeffnen(); return; }
      const z = e.target.closest(".zuletzt, .chip");
      if (z) { this._wieder(z.dataset.uid, z); return; }
      const k = e.target.closest(".kachel");
      if (k) this._abhaken(k.dataset.uid, k.dataset.name, k);
    };
    this._grid.addEventListener("click", klick);
    this._alle.addEventListener("click", klick);
    this._zuletztAlle.addEventListener("click", klick);
    this._ztGrid.addEventListener("click", klick);
    this._chips.addEventListener("click", klick);
    this._zahl.addEventListener("click", () => this._oeffnen());
    r.querySelector(".zu").addEventListener("click", () => this._dialog.close());
    this._dialog.addEventListener("click", (e) => { if (e.target === this._dialog) this._dialog.close(); });
    this._bDialog.addEventListener("click", (e) => { if (e.target === this._bDialog) this._bDialog.close(); });
    r.querySelector(".abbrechen").addEventListener("click", () => this._bDialog.close());
    r.querySelector(".loeschen").addEventListener("click", () => this._loeschen());
    r.querySelector(".bform").addEventListener("submit", (e) => { e.preventDefault(); this._speichern(); });
    // lange drücken (Touch/Maus) oder Rechtsklick öffnet „Bearbeiten“ / long press or right click opens "edit"
    const startLang = (e) => {
      const k = e.target.closest(".kachel");
      if (!k || k.classList.contains("mehr") || k.classList.contains("zuletzt")) return;
      this._start = { x: e.clientX, y: e.clientY };
      clearTimeout(this._langTimer);
      this._langTimer = setTimeout(() => { this._lang = true; this._bearbeiten(k.dataset.uid); }, 550);
    };
    const stopLang = () => clearTimeout(this._langTimer);
    // jeder neue Druck beginnt ohne „lange gedrückt“-Merker / every new press starts without the long-press flag
    r.addEventListener("pointerdown", () => { this._lang = false; }, true);
    for (const g of [this._grid, this._alle]) {
      g.addEventListener("pointerdown", startLang);
      g.addEventListener("pointerup", stopLang);
      g.addEventListener("pointerleave", stopLang);
      g.addEventListener("pointercancel", stopLang);
      g.addEventListener("pointermove", (e) => {
        if (this._start && Math.hypot(e.clientX - this._start.x, e.clientY - this._start.y) > 10) stopLang();
      });
      g.addEventListener("contextmenu", (e) => {
        const k = e.target.closest(".kachel");
        if (!k || k.classList.contains("mehr") || k.classList.contains("zuletzt")) return;
        e.preventDefault();
        stopLang();
        this._lang = true;
        this._bearbeiten(k.dataset.uid);
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
                 && !k.classList.contains("mehr") && !k.classList.contains("zuletzt")) {
        e.preventDefault();
        this._bearbeiten(k.dataset.uid);
      }
    };
    for (const g of [this._grid, this._alle, this._zuletztAlle, this._ztGrid]) g.addEventListener("keydown", taste);
    // nach dem Schließen von „Bearbeiten“ zurück zur Kachel / back to the tile after closing "edit"
    this._bDialog.addEventListener("close", () => {
      const uid = this._fokusUid;
      this._fokusUid = null;
      if (!uid) return;
      const k = [...this._grid.querySelectorAll(".kachel")].find((x) => x.dataset.uid === uid);
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

  _kachel(i, zuletzt = false) {
    const name = ekGross(i.summary);
    const icon = this._icon(i.summary);
    const hinweis = zuletzt ? this._t.readd : `${this._t.tap}, ${this._t.hold}`;
    return `
      <div class="kachel${zuletzt ? " zuletzt" : ""}" role="button" tabindex="0" lang="${this._t === EK_TEXT.de ? "de" : "en"}" data-uid="${ekEsc(i.uid)}" data-name="${ekEsc(name)}"
           aria-label="${ekEsc(name)}${i.description ? ", " + ekEsc(i.description) : ""}" aria-description="${zuletzt ? this._t.readd : this._t.keys}"
           title="${ekEsc(name)}${i.description ? " – " + ekEsc(i.description) : ""} (${hinweis})">
        ${zuletzt ? `<ha-icon class="zurueck" icon="mdi:restore"></ha-icon>` : ""}
        <div class="kreis" style="--k-rgb: ${ekFarbe(icon)}"><ha-icon icon="${ekEsc(icon)}"></ha-icon></div>
        <div class="name">${ekEsc(name)}</div>
        ${i.description ? `<div class="info">${ekEsc(i.description)}</div>` : ""}
      </div>`;
  }

  _render() {
    if (!this._grid) return;
    const t = this._t;
    if (this._fehler) {
      this._grid.innerHTML = `<div class="leer">${ekEsc(this._fehler)}</div>`;
      return;
    }
    const offen = this._items.filter((i) => i.status === "needs_action");
    this._zahl.textContent = t.open(offen.length);
    this._renderZuletzt(offen);
    const { reihen, ztReihen } = this._aufteilung(offen.length);
    this._renderZuletztKacheln(ztReihen);
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
  _aufteilung(anzahl) {
    const zeilen = this._zeilen();
    const stil = this._config.recent_style || "auto";
    if (this._config.show_recent === false || !this._zuletzt?.length || stil === "chips") {
      return { reihen: zeilen, ztReihen: 0 };
    }
    const sp = this._spalten || 4;
    const benoetigt = Math.max(1, Math.ceil(anzahl / sp));
    const frei = this._frei || 0;
    // Höhe: Kachelreihen je 100 px + 8 px Abstand; Bereich „Zuletzt gekauft“ mit Linie, Überschrift und
    // Abstand zum Eingabefeld 42 px / tile rows 100 px + 8 px gap; recent section incl. divider, heading, gap 42 px
    const rest = (k) => Math.floor((frei - (k * 108 - 8) - 42 + 8) / 108);
    if (!frei) return stil === "tiles" ? { reihen: zeilen, ztReihen: 1 } : { reihen: zeilen, ztReihen: 0 };
    let k = Math.max(1, Math.min(benoetigt, zeilen));
    if (stil === "tiles") while (k > 1 && rest(k) < 1) k--;
    return { reihen: k, ztReihen: Math.max(0, rest(k)) };
  }

  _renderZuletztKacheln(ztReihen) {
    const anzahl = ztReihen * (this._spalten || 4);
    const liste = (this._zuletzt || []).slice(0, anzahl);
    this._ztBereich.hidden = !liste.length;
    this.shadowRoot.querySelector("ha-card").classList.toggle("mit-zt", !!liste.length);
    this._ztGrid.innerHTML = liste.map((i) => this._kachel(i, true)).join("");
    // Kacheln ersetzen die Chips / tiles replace the chips
    if (liste.length) this._chips.classList.add("aus");
  }

  _renderZuletzt(offen) {
    // zuletzt erledigte Artikel, ohne Doppelte und ohne gerade offene
    // recently completed items, without duplicates and without currently open ones
    const t = this._t;
    const offenNamen = new Set(offen.map((i) => String(i.summary).toLowerCase().trim()));
    const gesehen = new Set();
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
    if (!uid) return;
    el.style.opacity = "0.3";
    this._dienst("update_item", { item: uid, status: "needs_action" }).catch(() => {
      el.style.opacity = "";
      if (this._fokus?.uid === uid) this._fokus = null;
    });
  }

  // Dienst aufrufen; die Fehlermeldung zeigt HA selbst, die Karte stellt nur die Anzeige zurück
  // call a service; HA shows the error toast itself, the card only restores its display
  _dienst(aktion, daten) {
    return this._hass.callService("todo", aktion, daten, { entity_id: this._config.entity });
  }

  _vibrieren(art) {
    this.dispatchEvent(new CustomEvent("haptic", { detail: art, bubbles: true, composed: true }));
  }

  _bearbeiten(uid) {
    const i = this._items.find((x) => x.uid === uid);
    if (!i || this._bDialog.open) return;
    this._vibrieren("medium");
    this._bUid = uid;
    const r = this.shadowRoot;
    r.querySelector("#bname").value = i.summary || "";
    r.querySelector("#bdesc").value = i.description || "";
    if (this._dialog.open) this._dialog.close();
    this._fokusUid = uid;
    this._bDialog.showModal();
    r.querySelector("#bname").focus();
  }

  _speichern() {
    const r = this.shadowRoot;
    const i = this._items.find((x) => x.uid === this._bUid);
    const name = r.querySelector("#bname").value.trim();
    const desc = r.querySelector("#bdesc").value.trim();
    if (!i || !name) return;
    const daten = { item: this._bUid };
    if (name !== i.summary) daten.rename = name;
    if (desc !== (i.description || "")) daten.description = desc;
    this._bDialog.close();
    if (Object.keys(daten).length > 1) this._dienst("update_item", daten).catch(() => {});
  }

  _loeschen() {
    const uid = this._bUid;
    const i = this._items.find((x) => x.uid === uid);
    this._fokusUid = null;
    this._bDialog.close();
    if (!uid || !i) return;
    const eintrag = { art: "del", uid, summary: i.summary, description: i.description || "" };
    eintrag.loeschen = this._dienst("remove_item", { item: uid });
    eintrag.loeschen.catch(() => this._undoEntfernen(eintrag));
    this._undoZeigen(eintrag);
  }

  _oeffnen() {
    if (this._dialog && !this._dialog.open) this._dialog.showModal();
  }

  _abhaken(uid, name, el) {
    if (!uid) return;
    el.style.opacity = "0.3";
    this._vibrieren("success");
    const eintrag = { art: "done", uid, summary: name };
    this._dienst("update_item", { item: uid, status: "completed" }).catch(() => {
      el.style.opacity = "";
      if (this._fokus?.uid === uid) this._fokus = null;
      this._undoEntfernen(eintrag);
    });
    this._undoZeigen(eintrag);
  }

  // Rückgängig gilt für alle Aktionen der letzten 10 s / undo covers every action of the last 10 s
  _undoZeigen(eintrag) {
    this._undoListe = [...(this._undoListe || []), eintrag];
    this._undoText();
    this._undo.style.display = "block";
    this._status.classList.add("undo-aktiv");
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
    this._undo.querySelector(".undotext").textContent = text;
  }

  _undoEnde() {
    this._undo.style.display = "none";
    this._status.classList.remove("undo-aktiv");
    this._undoListe = [];
    requestAnimationFrame(() => this._chipsKuerzen());
  }

  _rueckgaengig() {
    const liste = this._undoListe || [];
    if (!liste.length) return;
    for (const x of liste) {
      if (x.art === "done") {
        this._dienst("update_item", { item: x.uid, status: "needs_action" }).catch(() => {});
      } else {
        // Gelöschtes neu anlegen; die Angabe nur, wenn die Liste sie kennt (Merkmal 64)
        // add a deleted item again; the description only if the list supports it (feature 64)
        const merkmale = this._hass.states[this._config.entity]?.attributes?.supported_features || 0;
        const daten = { item: x.summary };
        if (x.description && (merkmale & 64)) daten.description = x.description;
        // erst nach bestätigtem Löschen neu anlegen / add again only once the delete is confirmed
        x.loeschen.then(() => this._dienst("add_item", daten).catch(() => {}), () => {});
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
        title: "Titel", language: "Sprache", auto: "Automatisch (wie HA)",
        hint: "Eigene Symbole (icons) lassen sich im YAML-Modus festlegen." },
  en: { entity: "Shopping list (to-do list)", rows: "Rows of tiles", rowsAuto: "Automatic (from card height)", show_recent: "Show recently bought items", show_title: "Show title in card",
        recent_style: "Show recently bought as", styleAuto: "Automatic (tiles when there is free space)", styleChips: "Chips (one line)", styleTiles: "Tiles",
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
      { name: "recent_style", selector: { select: { mode: "dropdown", options: [
        { value: "auto", label: x.styleAuto }, { value: "chips", label: x.styleChips }, { value: "tiles", label: x.styleTiles },
      ] } } },
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
      this.append(this._form, this._hint);
    }
    this._hint.textContent = this._txt.hint;
    this._form.hass = this._hass;
    this._form.schema = this._schema();
    this._form.data = {
      show_title: true, show_recent: true, recent_style: "auto", language: "auto", title: "",
      ...this._config,
      rows: this._config.rows === undefined ? "auto" : String(this._config.rows),
    };
  }

  _changed(werte) {
    const neu = { ...this._config, ...werte };
    if (!neu.language || neu.language === "auto") delete neu.language;
    if (!neu.title) delete neu.title;
    if (neu.show_title !== false) delete neu.show_title;
    if (neu.show_recent !== false) delete neu.show_recent;
    if (!neu.recent_style || neu.recent_style === "auto") delete neu.recent_style;
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
window.customCards.push({
  type: "shopping-tiles-card",
  preview: true,
  name: "Shopping Tiles Card",
  description: "Open items of a to-do list as icon tiles – tap to check off. / Offene Artikel als Kacheln – Antippen hakt ab.",
  documentationURL: "https://github.com/plerzelwupp/shopping-tiles-card",
});
