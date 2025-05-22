from fastapi import FastAPI, File, UploadFile, Request
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
from exocad_client import compute_tooth_setup
import tempfile, json, os

app = FastAPI()

class LandmarkPayload(BaseModel):
    landmarks: list

@app.post("/propose-teeth")
async def propose_teeth(payload: LandmarkPayload):
    # Compute 3D tooth setup using Exocad/ShapeJS
    stl_path, summary = compute_tooth_setup(payload.landmarks)
    # Return STL and summary as JSON
    return JSONResponse({"stl_path": stl_path, "summary": summary})

@app.get("/download-stl")
async def download_stl(stl_path: str):
    return FileResponse(stl_path, media_type='application/sla', filename="tooth_setup.stl")