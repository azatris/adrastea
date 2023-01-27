import './App.scss';
import {Button, CssBaseline, CssVarsProvider, Divider, Grid, Stack, Typography} from "@mui/joy";
import DarkToggle from "./DarkToggle";

function App() {
  return (
      <CssVarsProvider>
          <CssBaseline />
          <div className="App">
              <Grid container spacing={2} justifyContent="flex-start" sx={{ flexGrow: 1, py: 2, px: 3 }}>
                  <Grid xs={6}>
                      <Stack direction="row" justifyContent="flex-start">
                          <Typography level="h2" component="h1">
                              🐱‍🐉 Generate Activity App
                          </Typography>
                      </Stack>
                  </Grid>
                  <Grid xs={6}>
                      <Stack direction="row" justifyContent="flex-end" spacing={2}>
                          <Button variant="outlined">😀 Create Profile</Button>
                          <DarkToggle />
                      </Stack>
                  </Grid>
              </Grid>
              <Divider />

          </div>
      </CssVarsProvider>
  );
}

export default App;
