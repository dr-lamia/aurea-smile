import React from "react";

type Props = {
  enabled: boolean;
  onToggle: () => void;
};

const PresentationMode: React.FC<Props> = ({ enabled, onToggle }) => (
  <button
    onClick={onToggle}
    className={`fixed top-6 right-6 px-5 py-2 rounded-lg transition-colors z-50 text-xl font-bold border-2 ${
      enabled
        ? "bg-gold text-ivory border-gold"
        : "bg-white text-gold border-gold"
    }`}
    title="Toggle Presentation Mode"
  >
    {enabled ? "Exit Presentation" : "Presentation"}
  </button>
);

export default PresentationMode;