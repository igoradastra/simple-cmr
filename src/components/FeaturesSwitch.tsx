import { useState, useEffect } from "react";

export const FeaturesSwitch = () => {
  const [value, setValue] = useState(
    import.meta.env.VITE_FEATURE_DISPLAYED === 'true'
  );

  useEffect(() => {
    document.cookie = `VITE_FEATURE_DISPLAYED=${value}; path=/; SameSite=Strict`;
  }, [value]);

  return (
    <label style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginLeft: "8px", marginRight: "4px" }}>Features displayed</span>
      <div
        style={{
          display: "inline-block",
          width: "40px",
          height: "24px",
          backgroundColor: value ? "#1b0bae" : "#dddddd",
          borderRadius: "12px",
          position: "relative",
          cursor: "pointer"
        }}
        onClick={() => setValue(!value)}
      >
        <div
          style={{
            position: "absolute",
            top: "2px",
            left: value ? "18px" : "2px",
            width: "20px",
            height: "20px",
            backgroundColor: "#fff",
            borderRadius: "50%",
            transition: ".2s ease-in-out"
          }}
        />
      </div>
      
    </label>
  );
};

