import { useEffect, useState } from "react";
import "./App.css";
import { styled, createTheme, ThemeProvider } from "@mui/system";
import { Box, Container as MuiContainer } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartGame from "./Pages/StartGame";
import { Game } from "./Pages/Game";

const circleImages = [
  { src: "/assets/icon-astronaut.svg", matched: false },
  { src: "/assets/icon-cable-car.svg", matched: false },
  { src: "/assets/icon-cake.svg", matched: false },
  { src: "/assets/icon-dragon.svg", matched: false },
  { src: "/assets/icon-hanukiah.svg", matched: false },
  { src: "/assets/icon-heart.svg", matched: false },
  { src: "/assets/icon-hippo.svg", matched: false },
  { src: "/assets/icon-hourglass.svg", matched: false },
  { src: "/assets/icon-khanda.svg", matched: false },
  { src: "/assets/icon-landmark.svg", matched: false },
  { src: "/assets/icon-octopus.svg", matched: false },
  { src: "/assets/icon-planets.svg", matched: false },
  { src: "/assets/icon-robot.svg", matched: false },
  { src: "/assets/icon-snowflake.svg", matched: false },
  { src: "/assets/icon-tornado.svg", matched: false },
  { src: "/assets/icon-umbrella.svg", matched: false },
  { src: "/assets/icon-hands.svg", matched: false },
  { src: "/assets/icon-gas-pump.svg", matched: false },
];

function App() {
  const [selectedTheme, setSelectedTheme] = useState("Numbers");
  const [selectedPlayers, setSelectedPlayers] = useState("1");
  const [selectedGridSize, setSelectedGridSize] = useState("4x4");
  const [circles, setCircles] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [isFlipped, setIsFlipped] = useState(true);
  const [guessed, setGuessed] = useState(true);

  //shuffle Circles
  const shuffleCircles = () => {
    const shuffledCircles = [...circleImages, ...circleImages]
      .sort(() => Math.random() - 0.5)
      // .slice(0, 8)
      .map((circle) => ({ ...circle, id: Math.random() }));
    setCircles(shuffledCircles);
    setTurns(0);
  };

  // console.log(circles);
  // console.log(turns);

  //handle a choice
  const handleChoice = (circle) => {
    choiceOne ? setChoiceTwo(circle) : setChoiceOne(circle);
  };

  //compare two circles
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCircles((prevCircles) => {
          return prevCircles.map((circle) => {
            if (circle.src === choiceOne.src) {
              return {
                ...circle,
                matched: true,
              };
            } else {
              return circle;
            }
            return circle;
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(circles);

  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
  };
  return (
    <Router>
      <>
        <Routes>
          <Route
            path="/"
            element={
              <StartGame
                selectedTheme={selectedTheme}
                setSelectedTheme={setSelectedTheme}
                selectedPlayers={selectedPlayers}
                setSelectedPlayers={setSelectedPlayers}
                selectedGridSize={selectedGridSize}
                setSelectedGridSize={setSelectedGridSize}
                circle={circles}
                turns={turns}
                shuffleCircles={shuffleCircles}
              />
            }
          />
          <Route
            path="/game"
            element={
              <Game
                selectedTheme={selectedTheme}
                setSelectedTheme={setSelectedTheme}
                selectedPlayers={selectedPlayers}
                circles={circles}
                turns={turns}
                shuffleCircles={shuffleCircles}
                choiceOne={choiceOne}
                choiceTwo={choiceTwo}
                handleChoice={handleChoice}
                isFlipped={isFlipped}
                setIsFlipped={setIsFlipped}
                guessed={guessed}
                setGuessed={setGuessed}
              />
            }
          />
        </Routes>
      </>
    </Router>
  );
}

export default App;
