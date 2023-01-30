import { useColorScheme } from "@mui/joy/styles";
import Button from "@mui/joy/Button";
import * as React from "react";

const DarkToggle = () => {
  const { mode, setMode } = useColorScheme();
  return (
    <Button
      variant="outlined"
      color="neutral"
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
    >
      {mode === "dark" ? "🌞" : "🌙"}
    </Button>
  );
};

export default DarkToggle;
