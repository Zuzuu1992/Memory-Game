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
  setPlayers,
  currentPlayer,
}) => {
  // console.log(selectedTheme);
  // console.log(selectedGridSize);
  // console.log(selectedPlayers);

  // console.log(gameOver);
  // console.log(players);
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
    const updatedPlayers = players.map((player) => {
      return { ...player, score: 0 };
    });
    setPlayers(updatedPlayers);
    setCurrentPlayerIndex(0);
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

  const getWinners = () => {
    const winners = [];
    let maxScore = -Infinity;

    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (player.score > maxScore) {
        maxScore = player.score;
        winners.length = 0;
        winners.push(i);
      } else if (player.score === maxScore) {
        winners.push(i);
      }
    }

    return winners;
  };

  const [content, setContent] = useState("P");
  useEffect(() => {
    const handleContentChange = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setContent("Player ");
      } else {
        setContent("P");
      }
    };

    handleContentChange(); // Initial content setup

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    mediaQuery.addEventListener("change", handleContentChange);

    return () => {
      mediaQuery.removeEventListener("change", handleContentChange);
    };
  }, []);

  return (
    <>
      <WrapperBox className={show || gameOver ? "show" : ""}>
        <Header>
          <Box
            sx={{
              width: "92px",
              "@media (min-width: 768px)": {
                width: "153px",
              },
            }}
          >
            <img
              src={Logo2}
              style={{
                width: "100%",
              }}
              alt="Logo"
            />
          </Box>
          <Box sx={{ position: "relative" }}>
            <MenuButton
              onClick={handleMenuClick}
              show={show ? "false" : undefined}
            >
              Menu
            </MenuButton>
            <TabletBox>
              <ResetButton
                onClick={handleRestart}
                sx={{
                  transition: "all 0.3s",
                  backgroundColor: "#FDA214",
                  color: "#FCFCFC",
                  ":hover": {
                    backgroundColor: "#FFB84A",
                    transform: "scale(1.1)",
                    boxShadow: "0 0 10px rgba(52, 34, 6, 0.281)",
                  },
                }}
              >
                Restart
              </ResetButton>
              <ResetButton
                onClick={handleNewGame}
                sx={{
                  transition: "all 0.3s",
                  ":hover": {
                    backgroundColor: "#6395B8",
                    color: "#FCFCFC",
                    transform: "scale(1.1)",
                    boxShadow: "0 0 10px rgba(6, 29, 46, 0.279)",
                  },
                }}
              >
                New Game
              </ResetButton>
            </TabletBox>
          </Box>
        </Header>
        {show && (
          <div ref={menuRef} style={{ position: "relative" }}>
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
              <ResetButton onClick={handleResumeGame}>Resume Game</ResetButton>
            </MenuBox>
          </div>
        )}
        {gameOver && (
          <div ref={menuRef}>
            <OverBox
              sx={{
                top: selectedPlayers !== "1" ? "8%" : "15%",
                "@media (min-width: 768px)": {
                  top: selectedPlayers !== "1" ? "14%" : "25%",
                },
                "@media (min-width: 1440px)": {
                  top: selectedPlayers !== "1" ? "18%" : "30%",
                },
              }}
            >
              {selectedPlayers === "1" ? (
                <>
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
                </>
              ) : (
                <>
                  {getWinners().length > 1 ? (
                    <H1>It's a tie!</H1>
                  ) : (
                    <H1>Player {getWinners()[0] + 1} Wins!</H1>
                  )}
                  <H2>Game over! Here are the results...</H2>

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "8px",
                      marginBottom: "16px",
                      "@media (min-width: 768px)": {
                        rowGap: "16px",
                      },
                    }}
                  >
                    {players.map((player, index) => (
                      <Results
                        key={index}
                        sx={{
                          backgroundColor: getWinners().includes(index)
                            ? "#152938"
                            : "#DFE7EC",
                          order: getWinners().includes(index) ? -1 : 0,
                        }}
                      >
                        <Title
                          sx={{
                            color: getWinners().includes(index)
                              ? "#FCFCFC"
                              : "#7191A5",
                          }}
                        >
                          {getWinners().includes(index) ? (
                            <span>Player {index + 1} (Winner)</span>
                          ) : (
                            <span>Player {index + 1}</span>
                          )}
                        </Title>
                        <Total
                          sx={{
                            color: getWinners().includes(index)
                              ? "#FCFCFC"
                              : "#304859",
                          }}
                        >
                          {player.score} Pairs
                        </Total>
                      </Results>
                    ))}
                  </Box>
                </>
              )}
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "16px",
                  "@media (min-width: 768px)": {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    columnGap: "14px",
                    marginTop: "12px",
                  },
                }}
              >
                <ResetButton
                  onClick={handleRestart}
                  sx={{
                    // backgroundColor: buttonClicked ? "#FDA214" : "#DFE7EC",
                    // color: buttonClicked ? "#FCFCFC" : "#304859",
                    "@media (min-width: 768px)": {
                      width: "100%",
                      fontSize: "24px",
                      lineHeight: "29px",
                      backgroundColor: "#FDA214",
                      color: "#FCFCFC",
                      padding: "14px 0",
                    },
                  }}
                >
                  Restart
                </ResetButton>
                <ResetButton
                  onClick={handleNewGame}
                  sx={{
                    "@media (min-width: 768px)": {
                      width: "100%",
                      fontSize: "24px",
                      lineHeight: "29px",
                    },
                  }}
                >
                  Setup New Game
                </ResetButton>
              </Box>
            </OverBox>
          </div>
        )}
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
              <SideBox
                sx={{
                  "@media (min-width: 768px)": {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "25px",
                  },
                  "@media (min-width: 1440px)": {
                    marginLeft: "265px",
                  },
                }}
              >
                <BoxTM
                  sx={{
                    "@media (min-width: 768px)": {
                      fontSize: "18px",
                      lineHeight: "22px",
                    },
                  }}
                >
                  Time
                </BoxTM>
                <Timer
                  formatTime={formatTime}
                  time={time}
                  setTime={setTime}
                  stop={stop}
                  setStop={setStop}
                ></Timer>
              </SideBox>
              <SideBox
                sx={{
                  "@media (min-width: 768px)": {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "25px",
                  },
                  "@media (min-width: 1440px)": {
                    marginRight: "265px",
                  },
                }}
              >
                <BoxTM
                  sx={{
                    "@media (min-width: 768px)": {
                      fontSize: "18px",
                      lineHeight: "22px",
                    },
                  }}
                >
                  Moves
                </BoxTM>
                <BoxValue
                  sx={{
                    "@media (min-width: 768px)": {
                      fontSize: "32px",
                      lineHeight: "40px",
                    },
                  }}
                >
                  {turns}
                </BoxValue>
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
                      left: "50%",
                      width: 0,
                      height: 0,
                      borderLeft: "10px solid transparent",
                      borderRight: "10px solid transparent",
                      visibility:
                        index === currentPlayerIndex ? "visible" : "hidden",
                      borderBottom: `15px solid ${
                        index === currentPlayerIndex ? "#FDA214" : "#DFE7EC"
                      }`,
                    },
                    transition: "all 0.3s",
                    backgroundColor:
                      index === currentPlayerIndex ? "#FDA214" : "#DFE7EC",

                    "@media (min-width: 1440px)": {
                      "&::after": {
                        content:
                          index === currentPlayerIndex
                            ? '"Current Turn"'
                            : `""`,
                        position: "absolute",
                        top: "110%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        marginTop: "5px",
                        fontSize: "12px",
                        color: "#152938",
                        fontFamily: "Atkinson Hyperlegible",
                        fontWeight: "700",
                        fontSize: "13px",
                        lineHeight: "16px",
                        letterSpacing: "4px",
                      },
                    },
                  }}
                >
                  <BoxTM
                    sx={{
                      color:
                        index === currentPlayerIndex ? "#FCFCFC" : "#7191A5",
                    }}
                  >
                    {content}
                    {index + 1}
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
                      left: "50%",
                      width: 0,
                      height: 0,
                      borderLeft: "10px solid transparent",
                      borderRight: "10px solid transparent",
                      visibility:
                        index === currentPlayerIndex ? "visible" : "hidden",
                      borderBottom: `15px solid ${
                        index === currentPlayerIndex ? "#FDA214" : "#DFE7EC"
                      }`,
                    },
                    transition: "all 0.3s",
                    backgroundColor:
                      index === currentPlayerIndex ? "#FDA214" : "#DFE7EC",

                    "@media (min-width: 1440px)": {
                      "&::after": {
                        content:
                          index === currentPlayerIndex
                            ? '"Current Turn"'
                            : `""`,
                        position: "absolute",
                        top: "110%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        marginTop: "5px",
                        fontSize: "12px",
                        color: "#152938",
                        fontFamily: "Atkinson Hyperlegible",
                        fontWeight: "700",
                        fontSize: "13px",
                        lineHeight: "16px",
                        letterSpacing: "4px",
                      },
                    },
                  }}
                >
                  <BoxTM
                    sx={{
                      color:
                        index === currentPlayerIndex ? "#FCFCFC" : "#7191A5",
                    }}
                  >
                    {content}
                    {index + 1}
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
                      left: "50%",
                      width: 0,
                      height: 0,
                      borderLeft: "10px solid transparent",
                      borderRight: "10px solid transparent",
                      visibility:
                        index === currentPlayerIndex ? "visible" : "hidden",
                      borderBottom: `15px solid ${
                        index === currentPlayerIndex ? "#FDA214" : "#DFE7EC"
                      }`,
                    },
                    transition: "all 0.3s",

                    backgroundColor:
                      index === currentPlayerIndex ? "#FDA214" : "#DFE7EC",

                    "@media (min-width: 1440px)": {
                      "&::after": {
                        content:
                          index === currentPlayerIndex
                            ? '"Current Turn"'
                            : `""`,
                        position: "absolute",
                        top: "110%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        marginTop: "5px",
                        fontSize: "12px",
                        color: "#152938",
                        fontFamily: "Atkinson Hyperlegible",
                        fontWeight: "700",
                        fontSize: "13px",
                        lineHeight: "16px",
                        letterSpacing: "4px",
                      },
                    },
                  }}
                >
                  <BoxTM
                    sx={{
                      color:
                        index === currentPlayerIndex ? "#FCFCFC" : "#7191A5",
                    }}
                  >
                    {content}
                    {index + 1}
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
  ({ show, gameOver }) => `
  display: flex;
  flex-direction: column;
  row-gap: 85px;
  padding-top: 29px;
  padding-bottom: 24px;
  padding-left: 24px;
  padding-right: 24px;
  position: relative;
  min-height: 100vh;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1;
    display: none;
    pointer-events: none;
  }

  &.show::before {
    display: block;
    pointer-events: auto;
  }
  @media (min-width: 768px) {
    padding:38px;
    row-gap:130px;
  }
  @media (min-width: 1440px) {
    padding-top:85px;
    padding-left:167px;
    padding-bottom:74px;
    padding-right:167px;
   
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
cursor:pointer;
&:focus {
    background-color: #fda214;
    outline: none;
  }
  @media (min-width: 768px) {
    display:none;
  }
`);

const MenuBox = styled(MuiBox)(`
  position:absolute;
  top:32%;
  right:5;
  width:100%;
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
  top:"22%";
  right:5%;
  width:90%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  row-gap:16px;
  background-color:#F2F2F2;
  padding:24px;
  border-radius:10px;
  z-index:2;
  @media (min-width: 768px) {
    right:10%;
    width:80%;
    padding:51px 56px 69px 56px;
    /* top: 73px; */
    row-gap:40px;
  }
  @media (min-width: 1440px) {
    width:50%;
   right:25%;
  }
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
  cursor:pointer;
  transition:all 0.3s;
 
  &:hover {
    background-color: #FDA214;
    color:#FCFCFC;
  }
  @media (min-width: 768px) {
    font-size: 20px;
line-height: 25px;
padding-left:24px;
  padding-right:24px;
  width:auto;
 
  }
`);

const TabletBox = styled(MuiBox)(`
display:none;
  
@media (min-width: 768px) {
  display:block;
  display:flex;
 align-items:center;
 justify-content:center;
 column-gap:16px;
  }

`);

const GridBox = styled(MuiBox)(`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 9.12px;
  row-gap: 9.12px;
  justify-items:center;
  align-items:center;
 
  @media (min-width: 768px) {
    row-gap: 20px;
    column-gap: 20px;
    padding: 0 51px;
  }
  @media (min-width: 1440px) {
    padding: 0 256px;
  }

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
  @media (min-width: 1440px) {
  margin-top:25px;
  }
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
 @media (min-width: 768px) {
  align-items:flex-start;
  padding-left:16px;
  row-gap:5px;
  padding-top:14px;
  padding-bottom:14px;
  }
  @media (min-width: 1440px) {
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
  padding-left:21px;
  padding-right:21px;
  padding-top:25px;
  padding-bottom:25px;
  }

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
 @media (min-width: 768px) {
  font-size: 48px;
line-height: 60px;
  }
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
 @media (min-width: 768px) {
  font-size: 18px;
line-height: 22px;
margin-top:-31px;
 margin-bottom:2px;
  }
`);

const Results = styled(MuiBox)(`
 background-color:#DFE7EC;
 border-radius:5px;
 display:flex;
 align-items:center;
 justify-content:space-between;
 padding:16px;
 width:100%;
 @media (min-width: 768px) {
  padding:25px 32px;
  }
`);

const Title = styled(MuiTypography)(`
 font-family: 'Atkinson Hyperlegible';
 font-style: normal;
 font-weight: 700;
 font-size: 13px;
 line-height: 16px;
 color: #7191A5;
 @media (min-width: 768px) {
  font-size: 18px;
line-height: 22px;
  }
`);

const Total = styled(MuiTypography)(`
font-family: 'Atkinson Hyperlegible';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 25px;
color: #304859;
@media (min-width: 768px) {
  font-size: 32px;
line-height: 40px;
  }
`);
