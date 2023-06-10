import { Box } from "@mui/material";
import React from "react";

function SingleCircleIcon({ circle, handleChoice, isFlipped }) {
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
        <img
          src={circle.src}
          alt="icon"
          style={{
            display: "block",
            position: "absolute",
            top: "10px",
            left: "15px",
            transform: !isFlipped ? "rotateY(90deg)" : "rotateY(0deg)",
            transition: "all ease-in 0.2s",
            transitionDelay: "0.2s",
          }}
        />
        <Box
          onClick={handleCircleClick}
          sx={{
            width: "46.88px",
            height: "46.88px",
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
