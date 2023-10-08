import React from "react";

const loadingScreenStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "white",
  flexDirection: "column", // Cambiamos la dirección para que los elementos estén en columna
};

const spinnerStyle = {
  border: "16px solid #f3f3f3", // Gris claro
  borderTop: "16px solid #3498db", // Color azul para la parte superior
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  animation: "spin 2s linear infinite",
  margin: "20px 0", // Espacio entre el spinner y el texto
};

// Usamos styled components para crear un div con animación de rotación
const Spinner = () => <div style={spinnerStyle} />;

const LoadingScreen = () => (
  <div style={loadingScreenStyle}>
    <Spinner />
    <p>Loading Data...</p>
  </div>
);

export default LoadingScreen;
