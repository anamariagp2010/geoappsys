import React from "react";
import {
  ChakraProvider,
  Button,
  Box,
  useColorMode,
  extendTheme,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

// Configuración del tema para habilitar el modo oscuro
const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" paddingTop="5rem">
        <Button onClick={toggleColorMode} marginBottom="2rem">
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Box>
          Este es un ejemplo con Chakra UI. Actualmente estás en modo{" "}
          {colorMode}.
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
