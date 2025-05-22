import Head from "next/head";
import { useState } from "react";
import FaceUploader from "../components/FaceUploader";
import FaceCanvas from "../components/FaceCanvas";
import ThreeDTeethViewer from "../components/ThreeDTeethViewer";
import SmileAnalysisPanel from "../components/SmileAnalysisPanel";
import MeasurementTools from "../components/MeasurementTools";
import MeasurementTable from "../components/MeasurementTable";
import DownloadReportButton from "../components/DownloadReportButton";
import PresentationMode from "../components/PresentationMode";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [landmarks, setLandmarks] = useState<number[][]>([]);
  const [dsdParams, setDsdParams] = useState<any>(null);

  // UI state for toggles
  const [toggles, setToggles] = useState({
    facialAnalysis: true,
    dentalMidline: true,
    smileCurve: true,
    gingivalZeniths: true,
    incisalAngulation: false,
    zAnalysis: false,
    facialFlow: false,
    idealDesign: false,
  });

  // History for undo/redo
  const [history, setHistory] = useState<any[]>([]);
  const [future, setFuture] = useState<any[]>([]);

  // Presentation mode
  const [presentation, setPresentation] = useState(false);

  const handleUndo = () => {
    if (history.length > 0) {
      setFuture([landmarks, ...future]);
      setLandmarks(history[history.length - 1]);
      setHistory(history.slice(0, -1));
    }
  };
  const handleRedo = () => {
    if (future.length > 0) {
      setHistory([...history, landmarks]);
      setLandmarks(future[0]);
      setFuture(future.slice(1));
    }
  };
  const handleReset = () => {
    setHistory([]);
    setFuture([]);
    setToggles({
      facialAnalysis: true,
      dentalMidline: true,
      smileCurve: true,
      gingivalZeniths: true,
      incisalAngulation: false,
      zAnalysis: false,
      facialFlow: false,
      idealDesign: false,
    });
  };

  // Measurement tool handlers (stub)
  const handleAddMeasurement = () => {};
  const handleDeleteMeasurement = () => {};
  const handleHideAllMeasurement = () => {};
  const handleSetRatio = () => {};
  const handleDownloadCSV = () => {};

  // Presentation mode toggling
  const togglePresentation = () => setPresentation((p) => !p);

  return (
    <>
      <Head>
        <title>Aurea Smile DSD</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center py-10 bg-ivory">
        <h1 className="text-4xl font-bold text-gold mb-4">Aurea Smile</h1>
        {!presentation && (
          <p className="mb-6 text-lg">
            Upload a frontal smile photo to begin your Digital Smile Design journey.
          </p>
        )}
        <PresentationMode enabled={presentation} onToggle={togglePresentation} />
        {!presentation && <FaceUploader onImageLoaded={setImage} />}
        {image && (
          <div
            className={`mt-6 flex flex-col md:flex-row gap-8 items-start w-full ${
              presentation ? "justify-center" : "justify-between"
            }`}
          >
            <div>
              <FaceCanvas
                image={image}
                onLandmarksDetected={setLandmarks}
                onDsdParamsChange={setDsdParams}
                toggles={toggles}
                presentation={presentation}
              />
              {!presentation && (
                <MeasurementTools
                  onAdd={handleAddMeasurement}
                  onDelete={handleDeleteMeasurement}
                  onHideAll={handleHideAllMeasurement}
                  onSetRatio={handleSetRatio}
                  onDownloadCSV={handleDownloadCSV}
                />
              )}
            </div>
            <div className="flex flex-col gap-6 items-center">
              <ThreeDTeethViewer />
              {!presentation && (
                <SmileAnalysisPanel
                  toggles={toggles}
                  setToggles={setToggles}
                  onReset={handleReset}
                  onUndo={handleUndo}
                  onRedo={handleRedo}
                />
              )}
              {dsdParams && <MeasurementTable dsdParams={dsdParams} />}
              {landmarks.length > 0 && (
                <DownloadReportButton
                  image={image}
                  dsdParams={dsdParams}
                  landmarks={landmarks}
                  imageNumber={1}
                />
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}