import { styled } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Box as MuiBox,
  Button,
  Button as MuiButton,
  Stack,
  Typography as MuiTypography,
  Typography,
} from "@mui/material";
import SingleCircleIcon from "../components/SingleCircleIcon";
import SingleCircleNumber from "../components/SingleCircleNumber";
import Logo2 from "/assets/logo2.svg";
import { useState, useEffect, useRef } from "react";
import Timer from "../components/Timer";

export const Game = ({
  selectedTheme,
  selectedGridSize,
  selectedPlayers,
  turns,
  circles,
  handleChoice,
  choiceOne,
  choiceTwo,
  disabled,
  shuffleCircles,
  stop,
  setStop,
  gameOver,
  setGameOver,
  currentPlayerIndex,
  setCurrentPlayerIndex,
  players,
  currentPlayer,
}) => {
  // console.log(selectedTheme);
  // console.log(selectedGridSize);
  // console.log(selectedPlayers);

  // console.log(gameOver);
  console.log(players);
  // console.log(currentPlayer);
  // console.log(currentPlayerIndex);

  const [show, setShow] = useState(false);
  const menuRef = useRef(null);

  const handleMenuClick = () => {
    setShow(true);
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !menuRef.current.previousSibling.contains(event.target)
    ) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [time, setTime] = useState(0);
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleRestart = () => {
    setButtonClicked(true);
    shuffleCircles();
    setTime(0);
    setStop(false);
    setShow(false);
    setGameOver(false);
  };

  const handleNewGame = () => {
    setButtonClicked(true);
    window.location.href = "/";
    setGameOver(false);
  };

  const handleResumeGame = () => {
    setButtonClicked(true);
    setShow(false);
  };

  return (
    <>
      <WrapperBox show={show ? "false" : undefined}>
        <Header>
          <img src={Logo2} style={{ width: "92px" }} />
          <Box sx={{ position: "relative" }}>
            <MenuButton
              onClick={handleMenuClick}
              show={show ? "false" : undefined}
            >
              Menu
            </MenuButton>
            {show && (
              <div ref={menuRef}>
                <MenuBox>
                  <ResetButton
                    onClick={handleRestart}
                    sx={{
                      backgroundColor: "#FDA214",
                      color: "#FCFCFC",
                    }}
                  >
                    Restart
                  </ResetButton>
                  <ResetButton onClick={handleNewGame}>New Game</ResetButton>
                  <ResetButton onClick={handleResumeGame}>
                    Resume Game
                  </ResetButton>
                </MenuBox>
              </div>
            )}
            {gameOver && (
              <div ref={menuRef} style={{ position: "relative" }}>
                <OverBox>
                  <H1>You did it!</H1>
                  <H2>Game over! Here's how you got on...</H2>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "8px",
                      marginBottom: "16px",
                    }}
                  >
                    <Results>
                      <Title>Time Elapsed</Title>
                      <Total>{formatTime(time)}</Total>
                    </Results>
                    <Results>
                      <Title>Moves Taken</Title>
                      <Total>{turns} Moves</Total>
                    </Results>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "16px",
                    }}
                  >
                    <ResetButton
                      onClick={handleRestart}
                      sx={{
                        backgroundColor: buttonClicked ? "#FDA214" : "#DFE7EC",
                        color: buttonClicked ? "#FCFCFC" : "#304859",
                      }}
                    >
                      Restart
                    </ResetButton>
                    <ResetButton onClick={handleNewGame}>
                      Setup New Game
                    </ResetButton>
                  </Box>
                </OverBox>
              </div>
            )}
          </Box>
        </Header>
        {selectedTheme === "Icons" && selectedGridSize === "6x6" && (
          <GridBox>
            {circles.map((circle) => (
              <SingleCircleIcon
                key={circle.id}
                circle={circle}
                handleChoice={handleChoice}
                isFlipped={
                  circle === choiceOne || circle === choiceTwo || circle.clicked
                }
                selectedTheme={selectedTheme}
                selectedPlayers={selectedPlayers}
                selectedGridSize={selectedGridSize}
                disabled={disabled}
              />
            ))}
          </GridBox>
        )}
        {selectedTheme === "Numbers" && selectedGridSize === "6x6" && (
          <GridBox>
            {circles.map((circle, index) => (
              <SingleCircleNumber
                key={index}
                circle={circle}
                handleChoice={handleChoice}
                isFlipped={
                  circle === choiceOne || circle === choiceTwo || circle.clicked
                }
                selectedTheme={selectedTheme}
                selectedPlayers={selectedPlayers}
                selectedGridSize={selectedGridSize}
                disabled={disabled}
              />
            ))}
          </GridBox>
        )}
        {selectedTheme === "Icons" && selectedGridSize === "4x4" && (
          <GridBox
            sx={{
              gridTemplateColumns: "repeat(4, 1fr)",
            }}
          >
            {circles.map((circle, index) => (
              <SingleCircleIcon
                key={index}
                circle={circle}
                handleChoice={handleChoice}
                isFlipped={
                  circle === choiceOne || circle === choiceTwo || circle.clicked
                }
                selectedTheme={selectedTheme}
                selectedPlayers={selectedPlayers}
                selectedGridSize={selectedGridSize}
                disabled={disabled}
              />
            ))}
          </GridBox>
        )}
        {selectedTheme === "Numbers" && selectedGridSize === "4x4" && (
          <GridBox
            sx={{
              gridTemplateColumns: "repeat(4, 1fr)",
            }}
          >
            {circles.map((circle, index) => (
              <SingleCircleNumber
                key={index}
                circle={circle}
                handleChoice={handleChoice}
                isFlipped={
                  circle === choiceOne || circle === choiceTwo || circle.clicked
                }
                selectedTheme={selectedTheme}
                selectedPlayers={selectedPlayers}
                selectedGridSize={selectedGridSize}
                disabled={disabled}
              />
            ))}
          </GridBox>
        )}
        <Footer>
          {selectedPlayers === "1" && (
            <>
              <SideBox>
                <BoxTM>Time</BoxTM>
                <Timer
                  formatTime={formatTime}
                  time={time}
                  setTime={setTime}
                  stop={stop}
                  setStop={setStop}
                ></Timer>
              </SideBox>
              <SideBox>
                <BoxTM>Moves</BoxTM>
                <BoxValue>{turns}</BoxValue>
              </SideBox>
            </>
          )}
          {selectedPlayers === "2" && (
            <>
              {players.map((player, index) => (
                <SideBox
                  key={index}
                  sx={{
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: -13,
                      left: 65,
                      width: 0,
                      height: 0,
                      borderLeft: "10px solid transparent",
                      borderRight: "10px solid transparent",
                      borderBottom: `15px solid ${
                        index === currentPlayerIndex ? "#FDA214" : "#DFE7EC"
                      }`,
                    },
                    transition: "all 0.3s",
                    backgroundColor:
                      index === currentPlayerIndex ? "#FDA214" : "#DFE7EC",
                  }}
                >
                  <BoxTM
                    sx={{
                      color:
                        index === currentPlayerIndex ? "#FCFCFC" : "#7191A5",
                    }}
                  >
                    P{index + 1}
                  </BoxTM>
                  <BoxValue
                    sx={{
                      color:
                        index === currentPlayerIndex ? "#FCFCFC" : "#304859",
                    }}
                  >
                    {player.score}
                  </BoxValue>
                </SideBox>
              ))}
            </>
          )}
          {selectedPlayers === "3" && (
            <>
              {players.map((player, index) => (
                <SideBox
                  key={index}
                  sx={{
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: -13,
                      left: 38,
                      width: 0,
                      height: 0,
                      borderLeft: "10px solid transparent",
                      borderRight: "10px solid transparent",
                      borderBottom: `15px solid ${
                        index === currentPlayerIndex ? "#FDA214" : "#DFE7EC"
                      }`,
                    },
                    transition: "all 0.3s",
                    backgroundColor:
                      index === currentPlayerIndex ? "#FDA214" : "#DFE7EC",
                  }}
                >
                  <BoxTM
                    sx={{
                      color:
                        index === currentPlayerIndex ? "#FCFCFC" : "#7191A5",
                    }}
                  >
                    P{index + 1}
                  </BoxTM>
                  <BoxValue
                    sx={{
                      color:
                        index === currentPlayerIndex ? "#FCFCFC" : "#304859",
                    }}
                  >
                    {player.score}
                  </BoxValue>
                </SideBox>
              ))}
            </>
          )}
          {selectedPlayers === "4" && (
            <>
              {players.map((player, index) => (
                <SideBox
                  key={index}
                  sx={{
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: -13,
                      left: 22,
                      width: 0,
                      height: 0,
                      borderLeft: "10px solid transparent",
                      borderRight: "10px solid transparent",
                      borderBottom: `15px solid ${
                        index === currentPlayerIndex ? "#FDA214" : "#DFE7EC"
                      }`,
                    },
                    transition: "all 0.3s",
                    backgroundColor:
                      index === currentPlayerIndex ? "#FDA214" : "#DFE7EC",
                  }}
                >
                  <BoxTM
                    sx={{
                      color:
                        index === currentPlayerIndex ? "#FCFCFC" : "#7191A5",
                    }}
                  >
                    P{index + 1}
                  </BoxTM>
                  <BoxValue
                    sx={{
                      color:
                        index === currentPlayerIndex ? "#FCFCFC" : "#304859",
                    }}
                  >
                    {player.score}
                  </BoxValue>
                </SideBox>
              ))}
            </>
          )}
        </Footer>
      </WrapperBox>
    </>
  );
};

const WrapperBox = styled(MuiBox)(
  ({ show }) => `
  display: flex;
  flex-direction: column;
  row-gap: 85px;
  padding-top: 29px;
  padding-bottom: 24px;
  padding-left: 24px;
  padding-right: 24px;
  position: relative;
  min-height:100vh;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1;
    display: ${show ? "block" : "none"};
    pointer-events: ${show ? "auto" : "none"};
  }
`
);

const MenuButton = styled(MuiButton)(`
background-color: #FDA214;
padding-top:10px;
padding-bottom:10px;
padding-left:18px;
padding-right:18px;
font-family: 'Atkinson Hyperlegible';
font-weight: 700;
font-size: 16px;
line-height: 20px;
color: #FCFCFC;
border-radius:26px;
text-transform:none;
&:focus {
    background-color: #fda214;
    outline: none;
  }
`);

const MenuBox = styled(MuiBox)(`
  position:absolute;
  top:235px;
  right:0;
  width:327px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  row-gap:16px;
  background-color:#F2F2F2;
  padding:24px;
  border-radius:10px;
  z-index:2;
`);

const OverBox = styled(MuiBox)(`
  position:absolute;
  top:80px;
  right:0;
  width:327px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  row-gap:16px;
  background-color:#F2F2F2;
  padding:24px;
  border-radius:10px;
  z-index:2;
`);

const ResetButton = styled(MuiButton)(`
  background-color:#DFE7EC;
  border-radius:26px;
  font-family: 'Atkinson Hyperlegible';
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #304859;
  text-transform:none;
  width:100%;
  padding-top:12px;
  padding-bottom:14px;
  transition:all 0.3s;
 
  &:hover {
    background-color: #FDA214;
    color:#FCFCFC;
  }
`);

const GridBox = styled(MuiBox)(`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 9.12px;
  row-gap: 9.12px;
`);

const Header = styled(MuiBox)(`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
`);

const Footer = styled(MuiBox)(`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
  column-gap:25px;
`);

const SideBox = styled(MuiBox)(`
 background-color:#DFE7EC;
 border-radius:5px;
 padding-top:10px;
 padding-bottom:10px;
 display:flex;
 flex-direction:column;
 align-items:center;
 justify-content:center;
 row-gap:2px;
 width:100%;
`);

const BoxTM = styled(MuiTypography)(`
font-family: 'Atkinson Hyperlegible';
 font-weight: 700;
 font-size: 15px;
 line-height: 19px;
 color: #7191A5;
`);

const BoxValue = styled(MuiBox)(`
 font-family: 'Atkinson Hyperlegible';
 font-style: normal;
 font-weight: 700;
 font-size: 24px;
 line-height: 30px;
 text-align: center;
 color: #304859;
`);

const H1 = styled(MuiTypography)(`
 font-family: 'Atkinson Hyperlegible';
 font-weight: 700;
 font-size: 24px;
 line-height: 30px;
 text-align: center;
 color: #152938;
`);

const H2 = styled(MuiTypography)(`
 font-family: 'Atkinson Hyperlegible';
 font-weight: 700;
 font-size: 14px;
 line-height: 17px;
 text-align: center;
 color: #7191A5;
 margin-top:-11px;
 margin-bottom:12px;
`);

const Results = styled(MuiBox)(`
 background-color:#DFE7EC;
 border-radius:5px;
 display:flex;
 align-items:center;
 justify-content:space-between;
 padding:16px;
 width:100%;
`);

const Title = styled(MuiTypography)(`
 font-family: 'Atkinson Hyperlegible';
 font-style: normal;
 font-weight: 700;
 font-size: 13px;
 line-height: 16px;
 color: #7191A5;

`);

const Total = styled(MuiTypography)(`
font-family: 'Atkinson Hyperlegible';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 25px;
color: #304859;

`);
