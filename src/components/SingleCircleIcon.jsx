import { Box, Stack } from "@mui/material";
import React from "react";

function SingleCircleIcon({
  circle,
  handleChoice,
  isFlipped,
  selectedTheme,
  selectedGridSize,
  selectedPlayers,
  disabled,
}) {
  const handleCircleClick = () => {
    if (!disabled) {
      handleChoice(circle);
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItes: "center",
          // justifyContent: "space-between",
        }}
      >
        {/* <Box
          sx={{
            // width: selectedGridSize === "6x6" ? "0px" : "0px",
            // height: selectedGridSize === "6x6" ? "0px" : "0px",
            "@media (min-width: 768px)": {
              backgroundColor: selectedGridSize === "6x6" ? "red" : "yellow",
            },
          }}
        > */}
        <img
          src={circle.src}
          alt="icon"
          style={{
            display: "block",
            position: "absolute",
            width: "50%",
            top: "25%",
            left: "25%",
            // height: "50%",
            // top: selectedGridSize === "6x6" ? "11px" : "17px",
            // left: selectedGridSize === "6x6" ? "12px" : "18px",
            transform: !isFlipped ? "rotateY(90deg)" : "rotateY(0deg)",
            transition: "all ease-in 0.2s",
            transitionDelay: "0.2s",
            cursor: "pointer",
            // "@media (minWidth: 768px)": {
            //   top: selectedGridSize === "6x6" ? "18px" : "25px",
            //   left: selectedGridSize === "6x6" ? "20px" : "25px",
            // },
          }}
        />
        {/* </Box> */}
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
            cursor: "pointer",
            ":hover": {
              backgroundColor: !isFlipped && !circle.matched ? "#6395B8" : null,
              boxShadow: "0 0 10px rgba(12, 44, 67, 0.221)",
            },
            "@media (min-width: 768px)": {
              width: selectedGridSize === "6x6" ? "82px" : "118px",
              height: selectedGridSize === "6x6" ? "82px" : "118px",
            },
          }}
        ></Box>
      </Box>
    </>
  );
}

export default SingleCircleIcon;
