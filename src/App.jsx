import { useEffect, useState } from "react";
import "./App.css";
import { styled, createTheme, ThemeProvider } from "@mui/system";
import { Box, Container as MuiContainer } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartGame from "./Pages/StartGame";
import { Game } from "./Pages/Game";

const CircleNumbers = [
  { position: 1, value: 1, matched: false, clicked: false },
  { position: 2, value: 2, matched: false, clicked: false },
  { position: 3, value: 3, matched: false, clicked: false },
  { position: 4, value: 4, matched: false, clicked: false },
  { position: 5, value: 5, matched: false, clicked: false },
  { position: 6, value: 6, matched: false, clicked: false },
  { position: 7, value: 7, matched: false, clicked: false },
  { position: 8, value: 8, matched: false, clicked: false },
  { position: 9, value: 9, matched: false, clicked: false },
  { position: 10, value: 10, matched: false, clicked: false },
  { position: 11, value: 11, matched: false, clicked: false },
  { position: 12, value: 12, matched: false, clicked: false },
  { position: 13, value: 13, matched: false, clicked: false },
  { position: 14, value: 14, matched: false, clicked: false },
  { position: 15, value: 15, matched: false, clicked: false },
  { position: 16, value: 16, matched: false, clicked: false },
  { position: 17, value: 17, matched: false, clicked: false },
  { position: 18, value: 18, matched: false, clicked: false },
];

const circleImages = [
  { src: "/assets/icon-astronaut.svg", clicked: false, matched: false },
  { src: "/assets/icon-cable-car.svg", clicked: false, matched: false },
  { src: "/assets/icon-cake.svg", clicked: false, matched: false },
  { src: "/assets/icon-dragon.svg", clicked: false, matched: false },
  { src: "/assets/icon-hanukiah.svg", clicked: false, matched: false },
  { src: "/assets/icon-heart.svg", clicked: false, matched: false },
  { src: "/assets/icon-hippo.svg", clicked: false, matched: false },
  { src: "/assets/icon-hourglass.svg", clicked: false, matched: false },
  { src: "/assets/icon-khanda.svg", clicked: false, matched: false },
  { src: "/assets/icon-landmark.svg", clicked: false, matched: false },
  { src: "/assets/icon-octopus.svg", clicked: false, matched: false },
  { src: "/assets/icon-planets.svg", clicked: false, matched: false },
  { src: "/assets/icon-robot.svg", clicked: false, matched: false },
  { src: "/assets/icon-snowflake.svg", clicked: false, matched: false },
  { src: "/assets/icon-tornado.svg", clicked: false, matched: false },
  { src: "/assets/icon-umbrella.svg", clicked: false, matched: false },
  { src: "/assets/icon-hands.svg", clicked: false, matched: false },
  { src: "/assets/icon-gas-pump.svg", clicked: false, matched: false },
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
  const [disabled, setDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [stop, setStop] = useState(false);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const updatedPlayers = [];
    for (let i = 0; i < parseInt(selectedPlayers); i++) {
      updatedPlayers.push({ name: `Player ${i + 1}`, score: 0 });
    }
    setPlayers(updatedPlayers);
  }, [selectedPlayers]);

  // console.log(players);

  // console.log("selectedTheme:", selectedTheme);
  // console.log("selectedGridSize:", selectedGridSize);
  // console.log("selectedPlayers:", selectedPlayers);
  // console.log(choiceOne, choiceTwo);

  //shuffle circles
  const shuffleCircles = () => {
    const shuffledCircles =
      selectedTheme === "Numbers" && selectedGridSize === "6x6"
        ? [...CircleNumbers, ...CircleNumbers]
            .sort(() => Math.random() - 0.5)
            .map((circle) => ({ ...circle, id: Math.random() }))
        : selectedTheme === "Icons" && selectedGridSize === "6x6"
        ? [...circleImages, ...circleImages]
            .sort(() => Math.random() - 0.5)
            .map((circle) => ({ ...circle, id: Math.random() }))
        : selectedTheme === "Numbers" && selectedGridSize === "4x4"
        ? [...CircleNumbers.slice(0, 8), ...CircleNumbers.slice(0, 8)]
            .sort(() => Math.random() - 0.5)
            .map((circle) => ({ ...circle, id: Math.random() }))
        : selectedTheme === "Icons" && selectedGridSize === "4x4"
        ? [...circleImages.slice(0, 8), ...circleImages.slice(0, 8)]
            .sort(() => Math.random() - 0.5)
            .map((circle) => ({ ...circle, id: Math.random() }))
        : null;

    setChoiceOne(null);
    setChoiceTwo(null);
    setCircles(shuffledCircles);
    setTurns(0);
  };

  // console.log(circles);
  // console.log(turns);

  const handleChoice = (circle) => {
    if (choiceOne && choiceTwo) {
      return;
    }

    if (circle.clicked) {
      return;
    }

    if (!choiceOne) {
      setChoiceOne(circle);
    } else {
      setChoiceTwo(circle);
    }
  };

  useEffect(() => {
    const allMatched = circles.every((circle) => circle.matched);
    if (allMatched && circles.length > 0) {
      setGameOver(true);
      setStop(true);
      console.log(gameOver);
    }
  }, [circles]);

  let isMatched;
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      // console.log(disabled);

      // const allMatched = circles.every((circle) => circle.matched);
      // if (allMatched && circles.length > 0) {
      //   setGameOver(true);
      //   console.log(gameOver);
      // }

      isMatched =
        selectedTheme === "Numbers"
          ? choiceOne.position === choiceTwo.position
          : choiceOne.src === choiceTwo.src;

      if (!isMatched) {
        setTimeout(() => {
          setCircles((prevCircles) =>
            prevCircles.map((circle) => {
              if (circle === choiceOne || circle === choiceTwo) {
                return {
                  ...circle,
                  clicked: false,
                };
              }
              return circle;
            })
          );
          resetTurn();
        }, 1000);
      } else {
        setCircles((prevCircles) =>
          prevCircles.map((circle) => {
            if (circle === choiceOne || circle === choiceTwo) {
              return {
                ...circle,
                clicked: true,
                matched: true,
              };
            }
            return circle;
          })
        );
        resetTurn();
      }
    }
  }, [choiceOne, choiceTwo, selectedTheme, gameOver]);

  // console.log(circles);

  // reset choices and increase turn
  let currentPlayer;
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);

    currentPlayer = players[currentPlayerIndex];
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    if (isMatched) {
      currentPlayer.score += 1;
    }
    setCurrentPlayerIndex(nextPlayerIndex);
    console.log(currentPlayer);
  };

  //start a new game automatically
  useEffect(() => {
    shuffleCircles();
  }, []);

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
                setSelectedPlayers={setSelectedPlayers}
                selectedGridSize={selectedGridSize}
                setSelectedGridSize={setSelectedGridSize}
                circles={circles}
                turns={turns}
                shuffleCircles={shuffleCircles}
                choiceOne={choiceOne}
                choiceTwo={choiceTwo}
                handleChoice={handleChoice}
                isFlipped={isFlipped}
                setIsFlipped={setIsFlipped}
                disabled={disabled}
                gameOver={gameOver}
                setGameOver={setGameOver}
                stop={stop}
                setStop={setStop}
                currentPlayerIndex={currentPlayerIndex}
                setCurrentPlayerIndex={setCurrentPlayerIndex}
                players={players}
                currentPlayer={currentPlayer}
              />
            }
          />
        </Routes>
      </>
    </Router>
  );
}

export default App;
