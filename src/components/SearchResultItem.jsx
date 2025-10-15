import React from "react";
import Button from "./Button.jsx";

export default function SearchResultItem({ children, onClick }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#f8f9fa",
        padding: "10px 16px",
        borderRadius: "6px",
        marginBottom: "8px",
        border: "1px solid #e0e0e0",
      }}
    >
      <div style={{ flex: 1, fontSize: "15px", color: "#333" }}>{children}</div>
      <Button onClick={onClick}>Perfil</Button>
    </div>
  );
}
