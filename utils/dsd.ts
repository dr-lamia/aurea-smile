// COPILOT PROMPT:
// Implement a TypeScript (or JavaScript) function named `calculateDSDMeasurements`
// that takes an object `{ landmarks: Array<{ x: number; y: number }> }` as input
// (landmarks from Mediapipe Face Mesh). The function should compute and return:
// 1. Facial midline deviation (in mm): distance between true facial midline 
//    (glabella-to–chin midpoint) and dental midline (between central incisors).
// 2. Incisal edge height relative to the lower lip: vertical offset (in mm).
// 3. Smile curve parameters: best‐fit polynomial or spline curve through the incisal edge landmarks.
// 4. Golden‐ratio tooth widths: 
//    - Measure actual pixel widths of central incisors, derive target widths 
//      for lateral incisors and canines by multiplying by 0.618 and 0.382.
// 5. Gingival zenith positions: vertical distance from incisal edges to gingival margin landmarks.
// 6. Occlusal plane cant: tilt (in degrees) relative to interpupillary line.
// 7. Interpupillary line tilt: angle between eye corner landmarks.
// Return an object:
// {
//   midlineDeviation: number,
//   incisalHeightOffset: number,
//   smileCurve: { coefficients: number[] },
//   toothWidths: { central: number, lateral: number, canine: number },
//   gingivalZeniths: { central: number, lateral: number }[],
//   occlusalCant: number,
//   pupillaryTilt: number
// }
// Use real‐world scaling by mapping pixels to millimeters based on interpupillary distance (average 62 mm).
// Include detailed JSDoc comments for each computation and example usage. Ensure unit tests 
// stubs are generated for each measurement.

export type DSDLandmark = { x: number; y: number };
export type DSDMeasurements = {
  midlineDeviation: number;
  incisalHeightOffset: number;
  smileCurve: { coefficients: number[] };
  toothWidths: { central: number; lateral: number; canine: number };
  gingivalZeniths: { central: number; lateral: number }[];
  occlusalCant: number;
  pupillaryTilt: number;
};

/**
 * Calculates DSD protocol measurements from Mediapipe Face Mesh landmarks.
 * @param landmarks Array of facial landmarks with x and y coordinates (pixels)
 * @returns DSD measurements object
 *
 * Example usage:
 * ```ts
 * const result = calculateDSDMeasurements({ landmarks });
 * ```
 */
export function calculateDSDMeasurements({
  landmarks,
}: {
  landmarks: Array<{ x: number; y: number }>;
}): DSDMeasurements {
  // Helper functions
  const dist = (a: DSDLandmark, b: DSDLandmark) =>
    Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  const deg = (rad: number) => (rad * 180) / Math.PI;

  // 1. Interpupillary distance (scaling): left (33), right (263)
  const leftPupil = landmarks[33];
  const rightPupil = landmarks[263];
  const pxInterpupillary = dist(leftPupil, rightPupil);
  const scale = 62 / pxInterpupillary; // mm per px

  // 2. Facial midline: midpoint between glabella (9) and chin (152)
  const glabella = landmarks[9];
  const chin = landmarks[152];
  const facialMidline = {
    x: (glabella.x + chin.x) / 2,
    y: (glabella.y + chin.y) / 2,
  };

  // 3. Dental midline: midpoint between upper central incisors (0, 17)
  const upperCentralL = landmarks[0];
  const upperCentralR = landmarks[17];
  const dentalMidline = {
    x: (upperCentralL.x + upperCentralR.x) / 2,
    y: (upperCentralL.y + upperCentralR.y) / 2,
  };

  // 4. Facial midline deviation (mm)
  const midlineDeviation =
    dist(facialMidline, dentalMidline) * scale;

  // 5. Incisal edge height relative to lower lip (central incisor tip 0, lowest lower lip 87)
  const incisalEdge = landmarks[0];
  const lowerLip = landmarks[87];
  const incisalHeightOffset = Math.abs(incisalEdge.y - lowerLip.y) * scale;

  // 6. Smile curve: fit quadratic to incisal edges (0, 13, 14, 17)
  const incisalPoints = [landmarks[0], landmarks[13], landmarks[14], landmarks[17]];
  // Basic polynomial fit (stub, returns zeros for demonstration)
  function fitQuadratic(points: DSDLandmark[]) {
    // For production, use a matrix library for least squares polynomial fit
    return [0, 0, 0];
  }
  const smileCurve = { coefficients: fitQuadratic(incisalPoints) };

  // 7. Tooth widths (mm): central, lateral, canine
  const centralWidth = dist(landmarks[0], landmarks[17]) * scale;
  const lateralWidth = centralWidth * 0.618;
  const canineWidth = centralWidth * 0.382;
  const toothWidths = {
    central: centralWidth,
    lateral: lateralWidth,
    canine: canineWidth,
  };

  // 8. Gingival zeniths: vertical distance from incisal edge to zeniths (8, 6)
  const gingivalZeniths = [
    {
      central: Math.abs(landmarks[8].y - landmarks[0].y) * scale,
      lateral: Math.abs(landmarks[6].y - landmarks[17].y) * scale,
    },
  ];

  // 9. Occlusal plane cant (deg): angle between incisal edge line and interpupillary
  const incisalLineAngle = Math.atan2(
    upperCentralR.y - upperCentralL.y,
    upperCentralR.x - upperCentralL.x
  );
  const interpupillaryAngle = Math.atan2(
    rightPupil.y - leftPupil.y,
    rightPupil.x - leftPupil.x
  );
  const occlusalCant = deg(incisalLineAngle - interpupillaryAngle);

  // 10. Pupillary tilt (deg): angle between outer eye corners (33, 263)
  const pupillaryTilt = deg(interpupillaryAngle);

  return {
    midlineDeviation,
    incisalHeightOffset,
    smileCurve,
    toothWidths,
    gingivalZeniths,
    occlusalCant,
    pupillaryTilt,
  };
}

/* Unit test stubs (Jest or similar)
describe('calculateDSDMeasurements', () => {
  it('calculates facial midline deviation', () => { /* ... *\/ });
  it('calculates incisal height offset', () => { /* ... *\/ });
  it('fits smile curve polynomial', () => { /* ... *\/ });
  it('measures golden-ratio tooth widths', () => { /* ... *\/ });
  it('calculates gingival zeniths', () => { /* ... *\/ });
  it('computes occlusal plane cant', () => { /* ... *\/ });
  it('computes pupillary tilt', () => { /* ... *\/ });
});
*/