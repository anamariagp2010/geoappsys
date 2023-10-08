import React from "react";

// Estilos para el cuadro de alerta
const alertStyle = {
  backgroundColor: "#ff4d4d", // Un tono rojo
  color: "white", // Texto en blanco para contraste
  padding: "10px 20px", // Relleno alrededor del texto
  borderRadius: "5px", // Esquinas redondeadas
  fontWeight: "bold", // Texto en negrita
  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)", // Sombra para darle un efecto "elevado"
  position: "absolute", // Posicionamiento absoluto
  top: 0, // Alineado con la parte superior
  left: 0, // Alineado con el lado izquierdo
  zIndex: 1000, // Asegurarse de que aparezca encima de otros elementos
  margin: "10px", // Margen para separarlo del borde y de la barra de menú
  marginTop: "100px",
};

const FireAlert = () => <div style={alertStyle}>FIRE ALERT!</div>;

export default FireAlert;
