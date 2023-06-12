import { Box, Typography } from "@mui/material";
import React from "react";

function SingleCircleNumber({
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

  // console.log(isFlipped);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItes: "center",
          justifyContent: "center",
        }}
      >
        <Box
          onClick={handleCircleClick}
          sx={{
            display: "flex",
            alignItes: "center",
            justifyContent: "center",
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
        >
          <Typography
            style={{
              alignSelf: "center",
              color: "#FCFCFC",
              fontWeight: "700",
              fontSize: selectedGridSize === "6x6" ? "24px" : "40px",
              lineHeight: selectedGridSize === "6x6" ? "30px" : "50px",
              transform: !isFlipped ? "rotateY(90deg)" : "rotateY(0deg)",
              transition: "all ease-in 0.2s",
              transitionDelay: "0.2s",
            }}
          >
            {circle.value}
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default SingleCircleNumber;
