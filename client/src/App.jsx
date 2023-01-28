import "./App.scss";
import {
  CssBaseline,
  CssVarsProvider,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/joy";
import * as React from "react";
import DarkToggle from "./DarkToggle";
import CreateProfileModalButton from "./CreateProfileModalButton";
import ActivitySuggestion from "./ActivitySuggestion";
import UserProfile from "./UserProfile";

function App() {
  const onProfileCreated = () => {
    window.location.reload();
  };

  return (
    <CssVarsProvider>
      <CssBaseline />
      <div className="App">
        <Grid
          container
          spacing={2}
          justifyContent="flex-start"
          sx={{ flexGrow: 1, py: 2, px: 3 }}
        >
          <Grid xs={6}>
            <Stack direction="row" justifyContent="flex-start">
              <Typography level="h2" component="h1">
                🐱‍🐉 Generate Activity App
              </Typography>
            </Stack>
          </Grid>
          <Grid xs={6}>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <CreateProfileModalButton onProfileCreated={onProfileCreated} />
              <DarkToggle />
            </Stack>
          </Grid>
        </Grid>

        <Divider />
        <Stack sx={{ p: 2 }} spacing={2}>
          <UserProfile />
          <ActivitySuggestion />
        </Stack>
      </div>
    </CssVarsProvider>
  );
}

export default App;
