# fastapi_backend/main.py
import sys, os

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
AGENTS_DIR = os.path.join(CURRENT_DIR, "AGENTS")  
sys.path.insert(0, AGENTS_DIR)

import json
import tempfile
import uuid
from typing import Optional

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

from ROUTER_AGENT.run import send_message
from FARM_INSIGHTS_AGENT.service import getFarmInsights

from pydantic import BaseModel

class FarmInsightsRequest(BaseModel):
    lat: float
    lng: float
    language: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)


def parse_list_field(value: Optional[str]):
    if not value:
        return None
    value = value.strip()
    if value.startswith("["):
        try:
            return json.loads(value)
        except Exception:
            pass
    return [v.strip() for v in value.split(",") if v.strip()]


@app.post("/ask")
async def ask(
    thread_id: str = Form(...),
    query: Optional[str] = Form(None),
    language: str = Form("english"),
    crops: Optional[str] = Form(None),
    previous_crops: Optional[str] = Form(None),
    state: Optional[str] = Form(None),
    district: Optional[str] = Form(None),
    soil_type: Optional[str] = Form(None),
    season: Optional[str] = Form(None),
    water_sources: Optional[str] = Form(None),
    farm_size: Optional[float] = Form(None),
    lat: Optional[float] = Form(None),
    lng: Optional[float] = Form(None),
    file: Optional[UploadFile] = File(None),
):
    tmp_path = None

    try:
        if file is not None:
            suffix = os.path.splitext(file.filename)[1] or ".jpg"
            tmp_path = os.path.join(tempfile.gettempdir(), f"{uuid.uuid4()}{suffix}")
            contents = await file.read()
            with open(tmp_path, "wb") as f:
                f.write(contents)

        result = send_message(
            thread_id=thread_id,
            query=query,
            language=language,
            crops=parse_list_field(crops),
            previous_crops=parse_list_field(previous_crops),
            state=state,
            district=district,
            soil_type=soil_type,
            season=season,
            water_sources=parse_list_field(water_sources),
            farm_size=farm_size,
            lat=lat,
            lng=lng,
            image_path=tmp_path,
        )

        agent = result.get("selected_agent")
        return {
            "selected_agent": agent,
            "result": result.get(f"{agent}_result"),
        }

    finally:
        if tmp_path and os.path.exists(tmp_path):
            os.remove(tmp_path)


@app.post("/farm/insights")
async def farm_insights(req: FarmInsightsRequest):
    try:
        res = getFarmInsights(
            lat=req.lat,
            lng=req.lng,
            language=req.language,
        )
        return {"success": True, "result": res}
    except Exception as e:
        return {"success": False, "error": str(e)}


@app.get("/health")
def health():
    return {"status": "ok"}