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
        >
          <Typography
            sx={{
              alignSelf: "center",
              color: "#FCFCFC",
              fontWeight: "700",
              fontSize: selectedGridSize === "6x6" ? "24px" : "40px",
              lineHeight: selectedGridSize === "6x6" ? "30px" : "50px",
              transform: !isFlipped ? "rotateY(90deg)" : "rotateY(0deg)",
              transition: "all ease-in 0.2s",
              transitionDelay: "0.2s",
              "@media (min-width: 768px)": {
                fontSize: selectedGridSize === "6x6" ? "44px" : "56px",
                lineHeight: selectedGridSize === "6x6" ? "55px" : "69px",
              },
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
