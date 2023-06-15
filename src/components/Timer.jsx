import { Box, Typography as MuiTypography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from "react";

const Timer = ({ time, setTime, stop, setStop, formatTime }) => {
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

  return <TimerTypo>{formatTime(time)}</TimerTypo>;
};

export default Timer;

const TimerTypo = styled(MuiTypography)`
  font-family: "Atkinson Hyperlegible";
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  color: #304859;

  @media (min-width: 768px) {
    font-size: 32px;
    line-height: 40px;
  }
`;
