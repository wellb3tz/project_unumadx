<<<<<<< HEAD
# backend/app/models.py
from sqlalchemy import Column, Integer, String, Float, JSON, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    telegram_id = Column(Integer, unique=True)
    username = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    inventory = relationship("Item", back_populates="owner")
    worlds = relationship("World", back_populates="owner")

class Item(Base):
    __tablename__ = "items"

    id = Column(String, primary_key=True)
    name = Column(String)
    rarity = Column(String)
    attributes = Column(JSON)
    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    owner = relationship("User", back_populates="inventory")

class World(Base):
    __tablename__ = "worlds"

    id = Column(String, primary_key=True)
    name = Column(String)
    description = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    owner = relationship("User", back_populates="worlds")
    items = relationship("Item", secondary="world_items")

class WorldItem(Base):
    __tablename__ = "world_items"

    world_id = Column(String, ForeignKey("worlds.id"), primary_key=True)
=======
# backend/app/models.py
from sqlalchemy import Column, Integer, String, Float, JSON, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    telegram_id = Column(Integer, unique=True)
    username = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    inventory = relationship("Item", back_populates="owner")
    worlds = relationship("World", back_populates="owner")

class Item(Base):
    __tablename__ = "items"

    id = Column(String, primary_key=True)
    name = Column(String)
    rarity = Column(String)
    attributes = Column(JSON)
    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    owner = relationship("User", back_populates="inventory")

class World(Base):
    __tablename__ = "worlds"

    id = Column(String, primary_key=True)
    name = Column(String)
    description = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    owner = relationship("User", back_populates="worlds")
    items = relationship("Item", secondary="world_items")

class WorldItem(Base):
    __tablename__ = "world_items"

    world_id = Column(String, ForeignKey("worlds.id"), primary_key=True)
>>>>>>> c5ddd412e7966043910823035b0bfaf2b578edcf
    item_id = Column(String, ForeignKey("items.id"), primary_key=True)