import React from "react";

// Estilos para el botón
const floatingButtonStyle = {
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  backgroundColor: "red",
  position: "fixed",
  bottom: "20px",
  right: "20px",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  textDecoration: "none",
  fontSize: "24px",
  color: "white",
};

const FloatingActionButton = () => {
  const handleButtonClick = () => {
    window.open("https://wa.link/3gybry", "_blank");
  };

  return (
    <button
      style={floatingButtonStyle}
      onClick={handleButtonClick}
      title="Alerta"
    >
      ⚠️
    </button>
  );
};

export default FloatingActionButton;
