# backend/app/main.py
from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Dict, List, Optional
from pydantic import BaseModel
import random
import uuid
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import local modules
from app.database import get_db, engine, Base
from app.models import User, Item, World, WorldItem  # Import the models
from app.auth.validator import TelegramValidator

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Telegram validator
BOT_TOKEN = os.getenv("BOT_TOKEN")
telegram_validator = TelegramValidator(BOT_TOKEN)

# Schemas
class ItemBase(BaseModel):
    id: str
    name: str
    rarity: str
    attributes: Dict[str, float]

class WorldBase(BaseModel):
    id: str
    name: str
    description: str
    items: List[ItemBase]

# Create database tables
Base.metadata.create_all(bind=engine)

# Item generation parameters
RARITIES = ["Common", "Uncommon", "Rare", "Epic", "Legendary"]
ATTRIBUTES = ["Power", "Defense", "Speed", "Luck"]

def generate_item() -> ItemBase:
    rarity = random.choices(
        RARITIES, 
        weights=[0.5, 0.25, 0.15, 0.08, 0.02]
    )[0]
    
    return ItemBase(
        id=str(uuid.uuid4()),
        name=f"{random.choice(['Ancient', 'Mystic', 'Divine'])} {random.choice(['Sword', 'Shield', 'Amulet'])}",
        rarity=rarity,
        attributes={
            attr: round(random.uniform(1, 100) * (RARITIES.index(rarity) + 1), 2)
            for attr in ATTRIBUTES
        }
    )

@app.post("/auth/validate")
async def validate_telegram_data(init_data: str):
    return telegram_validator.validate_telegram_data(init_data)

@app.get("/api/inventory")
async def get_inventory(
    user_id: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    if not user_id:
        raise HTTPException(status_code=400, detail="User ID is required")
    
    # Get or create user
    user = db.query(User).filter(User.telegram_id == int(user_id)).first()
    if not user:
        user = User(telegram_id=int(user_id))
        db.add(user)
        db.commit()
        db.refresh(user)
    
    # Get user's inventory
    items = db.query(Item).filter(Item.owner_id == user.id).all()
    return items

@app.post("/api/world/generate")
async def generate_world(
    user_id: int,
    db: Session = Depends(get_db)
):
    # Get or create user
    user = db.query(User).filter(User.telegram_id == user_id).first()
    if not user:
        user = User(telegram_id=user_id)
        db.add(user)
        db.commit()
        db.refresh(user)
    
    # Generate new world
    world_items = [generate_item() for _ in range(random.randint(3, 7))]
    
    world = World(
        id=str(uuid.uuid4()),
        name=f"Realm of {random.choice(['Shadows', 'Light', 'Chaos'])}",
        description="A mysterious realm filled with ancient artifacts...",
        owner_id=user.id
    )
    
    db.add(world)
    
    # Add items to world
    for item_data in world_items:
        item = Item(
            id=item_data.id,
            name=item_data.name,
            rarity=item_data.rarity,
            attributes=item_data.attributes,
            owner_id=user.id
        )
        db.add(item)
        world_item = WorldItem(world_id=world.id, item_id=item.id)
        db.add(world_item)
    
    db.commit()
    db.refresh(world)
    
    return WorldBase(
        id=world.id,
        name=world.name,
        description=world.description,
        items=world_items
    )

@app.post("/api/items/collect/{item_id}")
async def collect_item(
    item_id: str,
    user_id: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    if not user_id:
        raise HTTPException(status_code=400, detail="User ID is required")
    
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    user = db.query(User).filter(User.telegram_id == int(user_id)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    item.owner_id = user.id
    db.commit()
    db.refresh(item)
    
    return item