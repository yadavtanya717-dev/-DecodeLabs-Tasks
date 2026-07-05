from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from gemini_api import generate_marketing_copy
from prompt_builder import build_prompt

app = FastAPI()

# CORS FIX (safe for dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# REQUEST MODEL
class CopyRequest(BaseModel):
    product_name: str
    product_description: str
    platform: str
    tone: str
    temperature: float = 0.7
    top_p: float = 0.9
    include_hashtags: bool = False


@app.get("/")
def home():
    return {"status": "ok", "message": "API running"}

@app.post("/generate")
def generate(data: CopyRequest):
    try:
        request_data = data.model_dump()

        prompt = build_prompt(request_data)

        result = generate_marketing_copy(
            prompt=prompt,
            temperature=request_data["temperature"],
            top_p=request_data["top_p"]
        )

        return {
            "success": True,
            "text": result
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))