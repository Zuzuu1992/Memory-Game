import { Box, Stack } from "@mui/material";
import React from "react";

function SingleCircleIcon({
  circle,
  handleChoice,
  isFlipped,
  selectedGridSize,
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
        }}
      >
        <img
          src={circle.src}
          alt="icon"
          style={{
            display: "block",
            position: "absolute",
            width: "50%",
            top: "25%",
            left: "25%",
            transform: !isFlipped ? "rotateY(90deg)" : "rotateY(0deg)",
            transition: "all ease-in 0.2s",
            transitionDelay: "0.2s",
            cursor: "pointer",
          }}
        />
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
