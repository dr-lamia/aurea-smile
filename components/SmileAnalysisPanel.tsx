import React from "react";

type Props = {
  toggles: Record<string, boolean>;
  setToggles: (t: Record<string, boolean>) => void;
  onReset: () => void;
  onUndo: () => void;
  onRedo: () => void;
};

const SmileAnalysisPanel: React.FC<Props> = ({
  toggles,
  setToggles,
  onReset,
  onUndo,
  onRedo,
}) => {
  // Toggle handler for all controls
  const handleToggle = (key: string) => {
    setToggles({ ...toggles, [key]: !toggles[key] });
  };

  return (
    <div className="bg-gray-900 text-ivory p-6 rounded-lg border-4 border-gold w-full max-w-sm">
      <h2 className="text-xl font-bold text-gold mb-3">Smile Analysis</h2>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => handleToggle("facialAnalysis")} className={`rounded px-2 py-1 ${toggles.facialAnalysis ? "bg-gold text-ivory" : "bg-gray-800"}`}>Facial Analysis</button>
        <button onClick={() => handleToggle("dentalMidline")} className={`rounded px-2 py-1 ${toggles.dentalMidline ? "bg-gold text-ivory" : "bg-gray-800"}`}>Dental Midline</button>
        <button onClick={() => handleToggle("smileCurve")} className={`rounded px-2 py-1 ${toggles.smileCurve ? "bg-gold text-ivory" : "bg-gray-800"}`}>Smile Curve</button>
        <button onClick={() => handleToggle("gingivalZeniths")} className={`rounded px-2 py-1 ${toggles.gingivalZeniths ? "bg-gold text-ivory" : "bg-gray-800"}`}>Gingival Zeniths</button>
        <button onClick={() => handleToggle("incisalAngulation")} className={`rounded px-2 py-1 ${toggles.incisalAngulation ? "bg-gold text-ivory" : "bg-gray-800"}`}>Incisal Angulation</button>
        <button onClick={() => handleToggle("zAnalysis")} className={`rounded px-2 py-1 ${toggles.zAnalysis ? "bg-gold text-ivory" : "bg-gray-800"}`}>3D Z-Analysis</button>
        <button onClick={() => handleToggle("facialFlow")} className={`rounded px-2 py-1 ${toggles.facialFlow ? "bg-gold text-ivory" : "bg-gray-800"}`}>Facial Flow</button>
        <button onClick={() => handleToggle("idealDesign")} className={`rounded px-2 py-1 ${toggles.idealDesign ? "bg-gold text-ivory" : "bg-gray-800"}`}>Ideal Design</button>
      </div>
      <div className="flex gap-2 mt-4">
        <button onClick={onReset} className="flex-1 bg-gold text-ivory px-2 py-1 rounded">Reset</button>
        <button onClick={onUndo} className="flex-1 bg-gray-800 px-2 py-1 rounded">Undo</button>
        <button onClick={onRedo} className="flex-1 bg-gray-800 px-2 py-1 rounded">Redo</button>
      </div>
    </div>
  );
};

export default SmileAnalysisPanel;