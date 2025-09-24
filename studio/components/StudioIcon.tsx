import React from "react";
import icon from "../static/self_icon.png";

export default function StudioIcon() {
  // Sanity workspace icons are rendered inline and sized by the UI.
  // Using /self_icon.png to reference the file in the static directory
  return (
    <img
      src={icon}
      alt="Studio icon"
      style={{
        width: "100%",
        height: "100%",
        display: "inline-block",
        objectFit: "contain",
        borderRadius: 4,
      }}
    />
  );
}