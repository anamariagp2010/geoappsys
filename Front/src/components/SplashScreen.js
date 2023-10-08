import React from "react";

const splashScreenStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "white",
};

const imageStyle = {
  maxWidth: "calc(100% - 40px)", // Esto asegura que la imagen tenga un margen de 20px en ambos lados
  maxHeight: "100%",
};

const SplashScreen = ({ imageSrc }) => (
  <div style={splashScreenStyle}>
    <img src={imageSrc} alt="Splash Screen" style={imageStyle} />
  </div>
);

export default SplashScreen;
