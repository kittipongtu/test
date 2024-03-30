import { Card, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSpring, animated } from "react-spring";
import "../../animations/wave.css";

function Number({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 80,
    config: { mass: 2, tension: 70 },
  });
  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
}

export const HomeCard = ({ value, color, topText, topValue, buttomLeft, buttomRight, logo }) => {
  const shadowSetting = "0px 5px 73px -41px rgba(0,0,50,0.7)";
  return (
    <Card
      sx={{
        height: "141px",
        borderRadius: "4px",
        boxShadow: shadowSetting,
        mt: 2,
        border: `1px solid ${color}`,
      }}
    >
      <Card
        sx={{
          height: "100px",
          borderRadius: "0px",
          boxShadow: shadowSetting,
          p: 0.5,
          bgcolor: color,
          color: "#FFF",
        }}
      >
        <Stack direction="row" justifyContent="space-between" sx={{ mt: .5, p: 1 }}>
            <Stack direction="column" justifyContent="center" alignItems="center">
                {logo}
            </Stack>
            <Stack direction="column" justifyContent="end">
                <Typography variant="h4" textAlign="end" sx={{ color: "#FFF" }}>{<Number n={topValue} />}</Typography>
                <Typography variant="subtitle1" textAlign="end" sx={{ color: "#FFF" }}>{topText}</Typography>
            </Stack>
        </Stack>
      </Card>
      <Stack direction="row" justifyContent="space-between" sx={{ px: 1 }}>
        <Typography variant="subtitle1" sx={{ color: color }}>{buttomLeft}</Typography>
        <Typography variant="subtitle1" sx={{ color: color }}>{buttomRight}</Typography>
      </Stack>
    </Card>
  );
};
