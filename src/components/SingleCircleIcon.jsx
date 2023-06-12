import { Box, Stack } from "@mui/material";
import React from "react";

function SingleCircleIcon({
  circle,
  handleChoice,
  isFlipped,
  selectedTheme,
  selectedGridSize,
  selectedPlayers,
}) {
  const handleCircleClick = () => {
    handleChoice(circle);
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItes: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: selectedGridSize === "6x6" ? "0px" : "0px",
            height: selectedGridSize === "6x6" ? "0px" : "0px",
          }}
        >
          <img
            src={circle.src}
            alt="icon"
            style={{
              display: "block",
              position: "absolute",
              width: "50%",
              height: "50%",
              top: selectedGridSize === "6x6" ? "11px" : "17px",
              left: selectedGridSize === "6x6" ? "14px" : "22px",
              transform: !isFlipped ? "rotateY(90deg)" : "rotateY(0deg)",
              transition: "all ease-in 0.2s",
              transitionDelay: "0.2s",
            }}
          />
        </Box>
        <Box
          onClick={handleCircleClick}
          sx={{
            width: selectedGridSize === "6x6" ? "46.88px" : "72.53px",
            height: selectedGridSize === "6x6" ? "46.88px" : "72.53px",
            transition: "all ease-in 0.2s",
            transitionDelay: "0.2s",
            backgroundColor: circle.matched
              ? "#BCCED9"
              : isFlipped
              ? "#FDA214"
              : "#304859",
            borderRadius: "50%",
          }}
        ></Box>
      </Box>
    </>
  );
}

export default SingleCircleIcon;
