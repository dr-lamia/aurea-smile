import React from 'react';
import { DSDParams } from '../utils/dsd';

type Props = { dsdParams: DSDParams };

const MeasurementTable: React.FC<Props> = ({ dsdParams }) => (
  <div className="mt-6 bg-white rounded-lg shadow p-4 w-full max-w-md border-2 border-gold">
    <h2 className="text-xl font-bold text-gold mb-2">Measurements</h2>
    <table className="table-auto w-full">
      <tbody>
        <tr>
          <td>Facial Midline</td>
          <td>{JSON.stringify(dsdParams.facialMidline)}</td>
        </tr>
        <tr>
          <td>Dental Midline</td>
          <td>{JSON.stringify(dsdParams.dentalMidline)}</td>
        </tr>
        <tr>
          <td>Smile Curve</td>
          <td>{dsdParams.smileCurve.map(([x, y]) => `(${x.toFixed(1)},${y.toFixed(1)})`).join(", ")}</td>
        </tr>
        <tr>
          <td>Tooth Widths (mm)</td>
          <td>{dsdParams.toothWidths.map(w => w.toFixed(2)).join(", ")}</td>
        </tr>
        <tr>
          <td>Gingival Zeniths</td>
          <td>{dsdParams.gingivalZeniths.map(([x, y]) => `(${x.toFixed(1)},${y.toFixed(1)})`).join(", ")}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default MeasurementTable;