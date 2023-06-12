import { Box, Typography as MuiTypography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from "react";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const handleGameOver = () => {
    setIsActive(false);
  };

  useEffect(() => {
    // You can start the timer when the game is loaded
    // by setting isActive to true here
    setIsActive(true);

    // Remember to stop the timer when the game is over
    // by calling handleGameOver()
    return () => handleGameOver();
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <Box>
      <TimerTypo> {formatTime(time)}</TimerTypo>
    </Box>
  );
};

export default Timer;

const TimerTypo = styled(MuiTypography)(`
 font-weight: 700;
 font-size: 24px;
 line-height: 30px;
 text-align: center;
 color: #304859;
`);
