import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Paper,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import Header from "./components/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoWeek from "./components/TodoWeek";
import ErrorPage from "./backup/Routes/ErrorPage";
import TodoList from "./components/TodoList";
import TodoMonth from "./components/TodoMonth";
import SuDrawer from "./components/SuDrawer";

const defaultTheme = createTheme();
const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoWeek />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/todolist",
    element: <TodoList />,
  },
  {
    path: "/todomonth",
    element: <TodoMonth />,
  },
]);

function App() {
  return (
    <>
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
                <RouterProvider router={router} />
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
