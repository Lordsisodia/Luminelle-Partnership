import React from "react";

type WavesProps = {
  className?: string;
  strokeColor?: string;
  backgroundColor?: string;
  pointerSize?: number;
};

// Lightweight placeholder for the SISO wave background.
export function Waves({ className, strokeColor = "#f8a75c", backgroundColor = "transparent", pointerSize }: WavesProps) {
  return (
    <div
      className={className}
      style={{
        background: backgroundColor,
        border: `1px dashed ${strokeColor}`,
        borderRadius: "9999px",
        opacity: 0.3,
        pointerEvents: "none",
      }}
      aria-hidden
      data-pointer-size={pointerSize}
    />
  );
}

export default Waves;
