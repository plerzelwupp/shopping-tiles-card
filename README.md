# Shopping Tiles Card

A small Home Assistant dashboard card that shows the open items of a to-do list as tiles with an icon — a bit more visual than the standard list, closer to what shopping-list apps look like.

It started as a personal project to give a Bring! shopping list in Home Assistant a friendlier look, using only Home Assistant's own building blocks.

[![Open your Home Assistant instance and show this repository in the Marketplace.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=plerzelwupp&repository=shopping-tiles-card&category=plugin)

*Deutsche Beschreibung: [README.de.md](README.de.md)*

![Shopping Tiles Card](images/card-en.png)

## What it does

- **Open items as tiles** – icon, name and the item's details (e.g. "1 kg, organic") in one line below.
- **Icons are picked automatically** from the item name. About 140 German and 140 English keywords map to 61 icons from Home Assistant's built-in icon set (Material Design Icons). Items without a match get a basket icon. You can add your own mappings.
- **Colours by category** – fruit & vegetables, dairy, meat & fish, bakery & pantry, household, drinks, sweets & snacks. The colours come from your Home Assistant theme, so light and dark mode both work.
- **Tap to check off**, with a short "Undo" – it also covers several quick check-offs at once.
- **Long press (or right-click) to edit** – rename, change the details or delete an item (deleting can be undone too).
- **Keyboard support** – Tab moves between tiles (also in the "all items" dialog), Enter or Space checks off, F2 or the context menu key opens "Edit". Tiles carry labels for screen readers (not yet tested with a screen reader).
- **Recently bought** – recently checked-off items appear as small chips; one tap puts them back on the list. On a tall card (e.g. a wall display or a full-screen panel view), free rows are filled with "recently bought" tiles instead (marked with a small ↺).
- **"+N more"** – if not everything fits, the last tile opens a pop-up with all open items and the recently bought ones.
- **Fits the sections grid** – all tiles have the same size; the number of tile rows follows the card's height.
- **Add items** directly in the card.
- **Visual editor** and German/English texts (follows the Home Assistant language).
- **No dependencies** – one JavaScript file, no Mushroom, button-card or card-mod needed.

| Pop-up with all items | Edit an item |
|---|---|
| ![Pop-up](images/popup-de.png) | ![Edit](images/edit-de.png) |

## Works with

Any Home Assistant to-do list (`todo.*`) – for example the **Bring!** integration, the built-in **Shopping List** or **Local To-do**.
Editing the details only works if the list supports descriptions (Bring! does).

**Using it with Bring!:** add the built-in Bring! integration (*Settings → Devices & services → Add integration → Bring!*). Each Bring! list becomes a `todo.*` entity you can pick in the card. If you sign in to Bring! with Google or Apple, you first need to set a password in your Bring! account. Changes made in Home Assistant appear in the Bring! app right away; changes made in the app can take up to about 90 seconds to show up in Home Assistant (polling interval of the integration).

## Installation

**Marketplace / HACS (custom repository)**
Easiest: use the button at the top of this page. Or manually:
1. Add this repository as a custom repository, type *Dashboard* (Marketplace: *Add from link* – this needs a GitHub account connected in the Marketplace; HACS: *Custom repositories*).
2. Install *Shopping Tiles Card* and reload the browser.

**Manual**
1. Copy `shopping-tiles-card.js` to `/config/www/`.
2. *Settings → Dashboards → ⋮ → Resources → Add resource*: URL `/local/shopping-tiles-card.js`, type *JavaScript module*.
3. Reload the browser.

## Configuration

Add the card via *Add card → Shopping Tiles Card* and use the visual editor, or in YAML:

```yaml
type: custom:shopping-tiles-card
entity: todo.shopping_list
```

| Option | Description | Default |
|---|---|---|
| `entity` | The to-do list | – (required) |
| `rows` | Number of tile rows (1–5). Leave out for automatic (fits the card height). | automatic |
| `show_recent` | Show recently bought items | `true` |
| `recent_style` | How to show recently bought items: `auto` (tiles if rows are left after all open items, otherwise chips), `tiles` (always at least one row of tiles, if the card is tall enough) or `chips` | `auto` |
| `show_title` | Show a title inside the card | `true` |
| `title` | Title text | "Shopping list" |
| `language` | `de` or `en` (default: Home Assistant language, otherwise English) | automatic |
| `icons` | Your own keyword → icon mapping (YAML only) | – |

Example with your own icons (keywords are matched anywhere in the item name, case-insensitive):

```yaml
type: custom:shopping-tiles-card
entity: todo.shopping_list
icons:
  tomato: mdi:fruit-cherries
  kartoffel: mdi:sprout
```

## Good to know

- The icon set has no matching icon for some common items (potatoes, tomatoes, butter, honey, jam, …) – they get the basket unless you add your own mapping.
- "Recently bought" uses the order in which the list provides completed items. Bring! does not provide a timestamp, so the order is only approximate.
- Tested with Home Assistant 2026.11 in Chrome on Windows and on an Android phone (light and dark theme), with the Bring! integration, Local To-do and the built-in Shopping List. Older versions may work but have not been tested. Community feedback: also looks good on an iPhone.
- If the list cannot be read (e.g. the entity was removed), the card shows the error and tries again every 30 seconds.
- This is a hobby project. Feedback and issues are welcome.

## Support

If the card is useful to you and you'd like to say thanks, you can buy me a coffee – completely optional, feedback is just as welcome.

[![Donate via PayPal](https://img.shields.io/badge/Donate-PayPal-00457C?logo=paypal&logoColor=white)](https://paypal.me/plerzelwupp)

## Disclaimer

This project is not affiliated with, endorsed by or connected to Bring! Labs AG. "Bring!" is a trademark of its respective owner. No Bring! artwork is used – all icons come from the Material Design Icons set included in Home Assistant.

## License

[MIT](LICENSE) © 2026 plerzelwupp
