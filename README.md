# Quiet Hands

A long-range wind trainer set in Maupin / Deschutes canyon country.

## What changed in this pass
- Replaced the faux-SVG scenic treatment with generated painted scene plates
- Simplified the UI so it reads more like a game sim and less like a glossy concept dashboard
- Added a visible first-run tutorial with clear 3-step instructions
- Swapped in a grounded **6.5 PRC rifle card** based on a 24” rifle shooting **143gr Hornady ELD-X at 2960 fps** with a 200-yard zero
- Added a more realistic ballistic solver: baseline dope, density-altitude effect, slope effect, impact velocity, impact energy, and time-of-flight
- Added a clearer course loop: 4 Maupin-style stages, 3 rounds each, one 8-point hit to clear

## How to play
1. Read the three clue blocks: **Mirage**, **Flags**, and **Terrain**
2. Start from the rifle card's **Base dope**
3. Set **Wind call** and **Elevation trim**
4. Hold the shot button
5. Release while the breath indicator is in the green band
6. Read the after-action panel to understand the wind miss, ballistic miss, and execution miss separately

## Run locally
From this folder:

```bash
python3 -m http.server 4173
```

Then open:

- http://127.0.0.1:4173

## Files
- `index.html` — layout and tutorial shell
- `styles.css` — restrained game-sim presentation
- `app.js` — scenarios, 6.5 PRC ballistics, shot logic, replay, persistence, tutorial state
- `assets/scene-*.png` — generated Maupin scene plates
- `quiet-hands.png` — earlier verification screenshot
