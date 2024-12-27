# backend/app/auth/validator.py
from hashlib import sha256
import hmac
import json
from typing import Dict
from fastapi import HTTPException

class TelegramValidator:
    def __init__(self, bot_token: str):
        self.bot_token = bot_token
        self.token_hash = sha256(bot_token.encode('utf-8')).digest()

    def validate_telegram_data(self, init_data: str) -> Dict:
        try:
            # Parse the init_data string
            data_dict = dict(param.split('=') for param in init_data.split('&'))
            
            # Get hash for validation
            received_hash = data_dict.pop('hash', '')
            
            # Sort params alphabetically
            param_string = '\n'.join(f'{k}={v}' for k, v in sorted(data_dict.items()))
            
            # Generate secret key
            secret_key = hmac.new(
                key=b'WebAppData',
                msg=self.token_hash,
                digestmod=sha256
            ).digest()
            
            # Calculate hash
            calculated_hash = hmac.new(
                key=secret_key,
                msg=param_string.encode('utf-8'),
                digestmod=sha256
            ).hexdigest()
            
            if received_hash != calculated_hash:
                raise HTTPException(status_code=401, detail="Invalid authentication")
            
            return data_dict
            
        except Exception as e:
            raise HTTPException(status_code=401, detail=str(e))

