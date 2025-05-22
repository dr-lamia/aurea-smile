# Aurea Smile

A Next.js digital smile design app with Mediapipe Face Mesh, DSD overlays, and FastAPI 3D proposal.

## Features

- Upload a frontal smile photo.
- Detect 468 facial landmarks with MediaPipe Face Mesh (TF.js).
- Visualize DSD guides: facial/dental midlines, smile curve, golden ratio widths, gingival zeniths.
- Draggable, real-time React handles for guides.
- Download styled PDF report.
- API integration with FastAPI for 3D proposal (STL+JSON).

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Run the Next.js app:**
   ```sh
   npm run dev
   ```

3. **Backend:**
   - Install Python dependencies: `pip install -r backend/requirements.txt`
   - Run FastAPI backend:
     ```
     uvicorn backend.main:app --reload
     ```

4. **Configuration:**
   - Ensure backend runs at `localhost:8000` or update the URL in `/pages/api/propose-teeth.ts`.

## Notes

- For Exocad/ShapeJS integration, see `backend/exocad_client.py`.
- All major functions are commented for clarity.

## Styling

- Uses Tailwind CSS, ivory/gold palette.
- Components and overlays styled for clarity and aesthetics.

---

**For more details, see the code comments in individual files.**