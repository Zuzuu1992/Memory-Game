import { Box, Typography as MuiTypography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from "react";

const Timer = ({ time, setTime, stop, setStop }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (stop) {
          clearInterval(interval);
        }
        return prevTime + 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [stop]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return <TimerTypo>{formatTime(time)}</TimerTypo>;
};

export default Timer;

const TimerTypo = styled(MuiTypography)(`
 font-weight: 700;
 font-size: 24px;
 line-height: 30px;
 text-align: center;
 color: #304859;
`);
