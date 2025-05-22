import React from "react";
import { exportMeasurementsCSV } from "../utils/measurements";

type Props = {
  onAdd: () => void;
  onDelete: () => void;
  onHideAll: () => void;
  onSetRatio: () => void;
  dsdParams?: any;
};

const MeasurementTools: React.FC<Props> = ({
  onAdd,
  onDelete,
  onHideAll,
  onSetRatio,
  dsdParams,
}) => (
  <div className="bg-gray-900 text-ivory p-4 rounded-lg border-4 border-gold w-full max-w-sm mt-4">
    <h2 className="text-lg font-bold text-gold mb-2">Measurement Tools</h2>
    <div className="flex flex-wrap gap-2 mb-2">
      <button onClick={onAdd} className="bg-gold text-ivory px-2 py-1 rounded">Set</button>
      <button onClick={onSetRatio} className="bg-gold text-ivory px-2 py-1 rounded">Ratio</button>
      <button onClick={onDelete} className="bg-gray-800 px-2 py-1 rounded">Delete</button>
      <button onClick={onHideAll} className="bg-gray-800 px-2 py-1 rounded">Hide All</button>
      <button
        className="bg-gold text-ivory px-2 py-1 rounded"
        onClick={() => dsdParams && exportMeasurementsCSV(dsdParams)}
      >
        Export CSV
      </button>
    </div>
  </div>
);

export default MeasurementTools;