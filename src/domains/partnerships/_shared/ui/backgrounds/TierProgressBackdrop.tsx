import React from "react";
import { cn } from "@/domains/shared/utils/cn";

type TierProgressBackdropProps = {
  className?: string;
  position?: "absolute" | "fixed";
};

/**
 * Preset backdrop matching the Tier Progress screen.
 * Use this anywhere you want the same look without repeating props.
 */
export function TierProgressBackdrop({ className, position }: TierProgressBackdropProps) {
  return (
    <div
      className={cn(
        "pointer-events-none inset-0 overflow-hidden",
        position === "fixed" ? "fixed" : "absolute",
        className,
      )}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top, rgba(255, 167, 38, 0.18), rgba(0,0,0,0) 60%), radial-gradient(circle at bottom, rgba(255, 87, 34, 0.14), rgba(0,0,0,0) 55%), radial-gradient(circle at center, rgba(0,0,0,0.55), rgba(0,0,0,0.85) 80%)",
        }}
      />
      <div className="absolute inset-0 bg-black/45" />
    </div>
  );
}
