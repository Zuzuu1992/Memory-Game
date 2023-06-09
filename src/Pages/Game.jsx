import { styled } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Box as MuiBox,
  Box,
  Stack,
  cardActionAreaClasses,
} from "@mui/material";
import SingleCircle from "../components/SingleCircle";

export const Game = ({
  selectedTheme,
  setSelectedTheme,
  selectedPlayers,
  setSelectedPlayers,
  selectedGridSize,
  setSelectedGridSize,
  circles,
  turns,
  shuffleCircles,
  handleChoice,
  isFlipped,
  setIsFlipped,
  choiceOne,
  choiceTwo,
  guessed,
  setGuessed,
}) => {
  return (
    <>
      <GridBox>
        {circles.map((circle) => (
          <SingleCircle
            key={circle.id}
            circle={circle}
            handleChoice={handleChoice}
            isFlipped={
              circle === choiceOne || circle === choiceTwo || circle.matched
            }
            guessed={guessed}
          />
        ))}
      </GridBox>
    </>
  );
};

const GridBox = styled(MuiBox)(`
  margin-top:40px;
  display:grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap:9.12px;
  row-gap:9.12px;

`);
