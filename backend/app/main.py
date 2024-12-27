# backend/app/main.py
from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from typing import Dict, List
import random
import uuid
from .auth.validator import TelegramValidator
from config import settings

app = FastAPI()
telegram_validator = TelegramValidator(settings.BOT_TOKEN)

class Item(BaseModel):
    id: str
    name: str
    rarity: str
    attributes: Dict[str, float]

class World(BaseModel):
    id: str
    name: str
    description: str
    items: List[Item]

# Item generation parameters
RARITIES = ["Common", "Uncommon", "Rare", "Epic", "Legendary"]
ATTRIBUTES = ["Power", "Defense", "Speed", "Luck"]


@app.post("/auth/validate")
async def validate_telegram_data(init_data: str):
    return telegram_validator.validate_telegram_data(init_data)

def generate_item() -> Item:
    rarity = random.choices(
        RARITIES, 
        weights=[0.5, 0.25, 0.15, 0.08, 0.02]
    )[0]
    
    return Item(
        id=str(uuid.uuid4()),
        name=f"{random.choice(['Ancient', 'Mystic', 'Divine'])} {random.choice(['Sword', 'Shield', 'Amulet'])}",
        rarity=rarity,
        attributes={
            attr: round(random.uniform(1, 100) * (RARITIES.index(rarity) + 1), 2)
            for attr in ATTRIBUTES
        }
    )

@app.post("/api/world/generate")
async def generate_world(user_id: int):
    world = World(
        id=str(uuid.uuid4()),
        name=f"Realm of {random.choice(['Shadows', 'Light', 'Chaos'])}",
        description="A mysterious realm filled with ancient artifacts...",
        items=[generate_item() for _ in range(random.randint(3, 7))]
    )
    return world

@app.post("/api/items/trade")
async def trade_item(item_id: str, from_user: int, to_user: int):
    # Implement trading logic
    pass