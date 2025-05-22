import React, { useRef, useEffect, useState } from "react";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import "@tensorflow/tfjs-backend-webgl";
import DraggableGuide from "./DraggableGuide";
import { computeDSD, DSDParams } from "../utils/dsd";

// Types for overlays
type Props = {
  image: string;
  onLandmarksDetected: (lms: number[][]) => void;
  onDsdParamsChange: (params: DSDParams) => void;
  toggles: Record<string, boolean>;
  presentation: boolean;
};

const FaceCanvas: React.FC<Props> = ({
  image,
  onLandmarksDetected,
  onDsdParamsChange,
  toggles,
  presentation,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [landmarks, setLandmarks] = useState<number[][]>([]);
  const [handles, setHandles] = useState<number[][]>([]);

  // Detect face landmarks on load
  useEffect(() => {
    const detect = async () => {
      const img = new window.Image();
      img.src = image;
      await new Promise((res) => {
        img.onload = res;
      });
      const model = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
      );
      const predictions = await model.estimateFaces({ input: img });
      if (predictions[0] && predictions[0].scaledMesh) {
        setLandmarks(predictions[0].scaledMesh as number[][]);
        setHandles(predictions[0].scaledMesh as number[][]);
        onLandmarksDetected(predictions[0].scaledMesh as number[][]);
        const dsd = computeDSD(predictions[0].scaledMesh as number[][]);
        onDsdParamsChange(dsd);
      }
    };
    detect();
  }, [image, onLandmarksDetected, onDsdParamsChange]);

  // Draw overlays on canvas
  useEffect(() => {
    if (!canvasRef.current || !handles.length) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const img = new window.Image();
    img.src = image;
    img.onload = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);

      // Overlay: Draw DSD guides from utils/dsd.ts
      const dsd = computeDSD(handles);

      ctx.strokeStyle = "#C9B037";
      ctx.lineWidth = 2;

      // Only draw overlays if toggled
      if (toggles.facialAnalysis) {
        // Facial midline
        ctx.beginPath();
        ctx.moveTo(dsd.facialMidline[0][0], dsd.facialMidline[0][1]);
        ctx.lineTo(dsd.facialMidline[1][0], dsd.facialMidline[1][1]);
        ctx.stroke();
      }
      if (toggles.dentalMidline) {
        // Dental midline
        ctx.beginPath();
        ctx.moveTo(dsd.dentalMidline[0][0], dsd.dentalMidline[0][1]);
        ctx.lineTo(dsd.dentalMidline[1][0], dsd.dentalMidline[1][1]);
        ctx.stroke();
      }
      if (toggles.smileCurve) {
        // Smile curve
        ctx.beginPath();
        dsd.smileCurve.forEach(([x, y], i) => {
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();
      }
      if (toggles.gingivalZeniths) {
        // Gingival zeniths
        dsd.gingivalZeniths.forEach(([x, y]) => {
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, 2 * Math.PI);
          ctx.fillStyle = "#C9B037";
          ctx.fill();
        });
      }
      if (toggles.incisalAngulation) {
        // Draw incisal angulation lines (dummy example)
        ctx.strokeStyle = "#FFD700";
        dsd.smileCurve.forEach(([x, y], i) => {
          if (i % 2 === 0) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y - 20);
            ctx.stroke();
          }
        });
      }
      // Add other overlays as needed (zAnalysis, facialFlow, etc.)
    };
  }, [image, handles, toggles]);

  // Handle drag events
  const handleDrag = (idx: number, x: number, y: number) => {
    const newHandles = handles.map((pt, i) => (i === idx ? [x, y, pt[2]] : pt));
    setHandles(newHandles);
    onLandmarksDetected(newHandles);
    onDsdParamsChange(computeDSD(newHandles));
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={480}
        height={640}
        className="rounded-lg border-4 border-gold"
      />
      {/* Draggable handles for key landmarks/guides (hidden in presentation mode) */}
      {!presentation &&
        handles.slice(0, 10).map((pt, idx) => (
          <DraggableGuide
            key={idx}
            x={pt[0]}
            y={pt[1]}
            idx={idx}
            onDrag={handleDrag}
          />
        ))}
    </div>
  );
};

export default FaceCanvas;