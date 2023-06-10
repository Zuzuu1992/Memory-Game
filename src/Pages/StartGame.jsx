import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import {
  Box as MuiBox,
  Box,
  Button,
  Button as MuiButton,
  Stack,
  Stack as MuiStack,
  Typography as MuiTypography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Logo from "/assets/logo.svg";

function StartGame({
  selectedTheme,
  setSelectedTheme,
  selectedPlayers,
  setSelectedPlayers,
  selectedGridSize,
  setSelectedGridSize,
  circles,
  turns,
  shuffleCircles,
}) {
  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
  };

  const handlePlayersChange = (players) => {
    setSelectedPlayers(players);
  };

  const handleGridSizeChange = (gridSize) => {
    setSelectedGridSize(gridSize);
  };
  return (
    <CustomBox>
      <Box>
        <img src={Logo} />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "24px",
          backgroundColor: "white",
          width: "100%",
          borderRadius: "10px",
          overflow: "hidden",
          padding: "24px",
        }}
      >
        <Section>
          <Instructon>Select Theme</Instructon>
          <Section2>
            <ChoiceButton
              onClick={() => handleThemeChange("Numbers")}
              sx={{
                backgroundColor:
                  selectedTheme === "Numbers" ? "#304859" : "#BCCED9",
                paddingRight: "33px",
                paddingLeft: "33px",
              }}
            >
              Numbers
            </ChoiceButton>
            <ChoiceButton
              onClick={() => handleThemeChange("Icons")}
              sx={{
                backgroundColor:
                  selectedTheme === "Icons" ? "#304859" : "#BCCED9",
                paddingRight: "45px",
                paddingLeft: "45px",
              }}
            >
              Icons
            </ChoiceButton>
          </Section2>
        </Section>

        <Section>
          <Instructon>Numbers of Players</Instructon>
          <Section2 sx={{ justifyContent: "space-between" }}>
            <ChoiceButton
              onClick={() => handlePlayersChange("1")}
              sx={{
                backgroundColor:
                  selectedPlayers === "1" ? "#304859" : "#BCCED9",
                paddingRight: "26px",
                paddingLeft: "26px",
              }}
            >
              1
            </ChoiceButton>
            <ChoiceButton
              onClick={() => handlePlayersChange("2")}
              sx={{
                backgroundColor:
                  selectedPlayers === "2" ? "#304859" : "#BCCED9",
                paddingRight: "26px",
                paddingLeft: "26px",
              }}
            >
              2
            </ChoiceButton>
            <ChoiceButton
              onClick={() => handlePlayersChange("3")}
              sx={{
                backgroundColor:
                  selectedPlayers === "3" ? "#304859" : "#BCCED9",
                paddingRight: "26px",
                paddingLeft: "26px",
              }}
            >
              3
            </ChoiceButton>
            <ChoiceButton
              onClick={() => handlePlayersChange("4")}
              sx={{
                backgroundColor:
                  selectedPlayers === "4" ? "#304859" : "#BCCED9",
                paddingRight: "26px",
                paddingLeft: "26px",
              }}
            >
              4
            </ChoiceButton>
          </Section2>
        </Section>

        <Section>
          <Instructon>Grid Size</Instructon>
          <Section2>
            <ChoiceButton
              onClick={() => handleGridSizeChange("4x4")}
              sx={{
                backgroundColor:
                  selectedGridSize === "4x4" ? "#304859" : "#BCCED9",
                paddingRight: "52px",
                paddingLeft: "52px",
              }}
            >
              4x4
            </ChoiceButton>
            <ChoiceButton
              onClick={() => handleGridSizeChange("6x6")}
              sx={{
                backgroundColor:
                  selectedGridSize === "6x6" ? "#304859" : "#BCCED9",
                paddingRight: "52px",
                paddingLeft: "52px",
              }}
            >
              6x6
            </ChoiceButton>
          </Section2>
        </Section>
        <Link
          to={{
            pathname: "/game",
          }}
          style={{ textDecoration: "none" }}
        >
          <StartButton onClick={shuffleCircles} sx={{ width: "100%" }}>
            Start Game
          </StartButton>
        </Link>
      </Box>
    </CustomBox>
  );
}

export default StartGame;

const CustomBox = styled(MuiBox)(`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #152938;
  row-gap:45px;
  padding-right:24px;
  padding-left:24px;
  padding-top:80px;
  padding-bottom:116px;
  height:100vh;
`);

const Instructon = styled(MuiTypography)(`
  font-weight: 700;
  font-size: 15px;
  line-height: 19px;
  color: #7191A5;

`);

const ChoiceButton = styled(MuiButton)(`
  background-color: #304859;
  
  border: none;
  box-shadow: none;
  border-radius:26px;
  font-family: 'Atkinson Hyperlegible';
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #FCFCFC;
  text-transform:inherit;
  padding-top:10px;
  padding-bottom:10px;
  flex-grow:1;
  transition: all 0.3s;
  &:hover {
    background-color: #6395B8;
  }
`);

const Section = styled(MuiStack)(`
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  row-gap: 11px;
`);

const Section2 = styled(MuiStack)(`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  column-gap: 10px;
  max-width:100%;
`);

const StartButton = styled(MuiButton)(`
  border: none;
  box-shadow: none;
  background-color:#FDA214;
  color:#FCFCFC;
  border-radius:26px;
  padding-top:12px;
  padding-bottom:14px;
  font-family: 'Atkinson Hyperlegible';
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  text-transform:inherit;
  transition: all 0.3s;
  &:hover {
    background-color: #FFB84A;
  }
`);
