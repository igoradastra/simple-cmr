import { useState, useEffect } from "react";

export const UserTableFeatureSwitch = () => {
  const [value, setValue] = useState(
    localStorage.getItem('FEATURE_USER_TABLE') === 'true' ||
    import.meta.env.VITE_FEATURE_USER_TABLE === 'true'
  );

  useEffect(() => {
    localStorage.setItem('FEATURE_USER_TABLE', value.toString());
    document.cookie = `FEATURE_USER_TABLE=${value}; path=/; SameSite=Strict`;
  }, [value]);

  return (
    <label style={{ display: "flex", alignItems: "center", margin: "20px 40px" }}>
      <span style={{ marginRight: "10px" }}>User table feature</span>
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