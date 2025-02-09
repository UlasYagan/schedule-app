import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import { SuProvider } from "../context/SuContext";
import Header from "./Header";
import SuDrawer from "../core/components/SuDrawer";
import { Outlet } from "react-router-dom";

const defaultTheme = createTheme();

const Home = () => {
  return (
    <SuProvider>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Header />
          <SuDrawer />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Outlet />
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </SuProvider>
  );
};

export default Home;
