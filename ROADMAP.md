# Tiny Empires API – Development Roadmap

This document tracks the development progress of the core gameplay systems for the Tiny Empires backend.

---

# Phase A — Match Setup
**Goal:** Ensure a match can be created and initialized correctly.

- Lobby creation ✅  
  - Endpoint implemented: `POST /matches/createMatch`

- Join match ❌  
  - Allow players to join an existing match

- Start match ✅  
  - Endpoint implemented: `POST /matches/startMatch`

- Generate map ✅  
  - Initial map generation logic implemented: `POST /matches/startMatch`

- Capital cities generation ✅  
  - Capital city is created for each player during match setup: `POST /matches/startMatch`

- Neutral cities ❌  
  - Currently only one of each type is generated: `POST /matches/startMatch`
  - Need to add more cities to create a balanced map

- City connections ❌  
  - Cities still need to be connected (map graph)

---

# Phase B — City System
**Goal:** Cities should be fully manageable and provide gameplay value.

- List cities ✅  
  - Endpoint implemented: `GET /matches/:matchId/cities`

- City details ❌  
  - Define the complete city state response  
  - (buildings, owner, defense, etc.)

- Build building ❌  
  - Allow construction of buildings in a city

- Upgrade building ❌  
  - Allow upgrading existing buildings

---

# Phase C — Economy System
**Goal:** Implement the resource system that powers gameplay.

- Resource costs ❌  
  - Define costs for buildings and units

- Resource production per turn ❌  
  - Cities produce resources based on buildings

- Player resources ❌  
  - Track player resources (`gold`, `food`, `iron`)

- End turn ❌  
  - Process resource production and advance turn order

---

# Phase D — Units System
**Goal:** Introduce military gameplay.

- Train units ❌  
  - Units are created in cities with `BARRACKS`

- Station units in cities ❌  
  - Units should belong to a city/location

- Move units between connected cities ❌  
  - Movement only allowed through city connections

---

# Phase E — Combat System
**Goal:** Enable conquest and strategic warfare.

- Combat resolution ❌  
  - Units fight when attacking cities or other units

- City conquest ❌  
  - Allow players to capture cities

---

# Future Systems (Post-MVP)

Possible systems for future development after the core gameplay loop is working:

- Barbarian cities
- AI factions
- Fog of war
- City specialization
- Technology / research system
- Match events