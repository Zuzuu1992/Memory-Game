import { useState } from "react";
import "./App.css";
import { styled, createTheme, ThemeProvider } from "@mui/system";
import { Box, Container as MuiContainer } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartGame from "./assets/components/StartGame";

// const MyComponent = styled('div')({
//   color: 'darkslategray',
//   backgroundColor: 'aliceblue',
//   padding: 8,
//   borderRadius: 4,
// });

const customTheme = createTheme({
  palette: {
    startBack: "#152938",
    gameBack: "#F2F2F2",
    passivePlayerText: "#7191A5",
    activePlayerText: "#FCFCFC",
    default: "#304859",
    clicked: "#FDA214",
    guessed: "white",
    circleHover: "#6395B8",
  },
});

// const Container = styled(MuiContainer)(({ theme }) => ({
//   backgroundColor: theme.palette.clicked,
// }));

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <>
          <Box>
            <Routes>
              <Route path="/" element={<StartGame />} />
            </Routes>
          </Box>
        </>
      </Router>
    </ThemeProvider>
  );
}

export default App;
