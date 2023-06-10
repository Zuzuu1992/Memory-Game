import { styled } from "@mui/system";
import React from "react";
import { Box as MuiBox } from "@mui/material";
import SingleCircleIcon from "../components/SingleCircleIcon";
import SingleCircleNumber from "../components/SingleCircleNumber";

const GridBox = styled(MuiBox)(`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 9.12px;
  row-gap: 9.12px;
`);

export const Game = ({
  selectedTheme,
  selectedGridSize,
  selectedPlayers,
  circles,
  handleChoice,
  choiceOne,
  choiceTwo,
}) => {
  console.log(selectedTheme);
  console.log(selectedGridSize);
  console.log(selectedPlayers);
  return (
    <>
      {selectedTheme === "Icons" &&
        selectedGridSize === "6x6" &&
        selectedPlayers === "1" && (
          <GridBox>
            {circles.map((circle) => (
              <SingleCircleIcon
                key={circle.id}
                circle={circle}
                handleChoice={handleChoice}
                isFlipped={
                  circle === choiceOne || circle === choiceTwo || circle.clicked
                }
              />
            ))}
          </GridBox>
        )}
      {selectedTheme === "Numbers" &&
        selectedGridSize === "6x6" &&
        selectedPlayers === "1" && (
          <GridBox>
            {circles.map((circle, index) => (
              <SingleCircleNumber
                key={index}
                circle={circle}
                handleChoice={handleChoice}
                isFlipped={
                  circle === choiceOne || circle === choiceTwo || circle.clicked
                }
              />
            ))}
          </GridBox>
        )}
    </>
  );
};
