import React, { useState, useEffect } from "react";
import Mapa from "./components/Mapa";
import MenuBar from "./components/MenuBar";
import FloatingActionButton from "./components/FloatingActionButton"; // Asegúrate de ajustar la ruta de importación según corresponda
import SplashScreen from "./components/SplashScreen";
import LoadingScreen from "./components/LoadingScreen";
import FireAlert from "./components/FireAlert";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
      setShowLoading(true); // Después de ocultar SplashScreen, muestra LoadingScreen
      setTimeout(() => {
        setShowLoading(false); // Oculta LoadingScreen después de 1 segundo
      }, 2000);
    }, 1000);
  }, []);

  if (showSplash) {
    return <SplashScreen imageSrc="/logoc.jpeg" />;
  }

  if (showLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <MenuBar />
      <FireAlert />
      <Mapa />
      <FloatingActionButton />
    </div>
  );
}

export default App;
