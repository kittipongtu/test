import { Container } from "@mui/material";
import {
  Button,
  ButtonGroup,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { GraphData } from "../mockup/graphs";

export default function Graphs() {
  const [selectGraph, setSelectGraph] = useState("OLT");

  const handleGraphClick = (key) => {
    setSelectGraph(key);
  };
  return (
    <>
      <Container direction="column" sx={{ mt: 1, mb: 5 }} maxWidth="md">
        <Grid container>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2">OLTs</Typography>
            <Select
              color="warning"
              size="small"
              fullWidth
              sx={{
                height: "32px",
              }}
              variant="outlined"
              defaultValue="any"
            >
              <MenuItem value="any">any</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={5}>
            <Stack direction="row" sx={{ pl: { xs: 0, md: 4 }, mt: 3 }}>
              <Typography variant="subtitle2" sx={{ mt: 0.5, mr: 1 }}>
                SIGNAL
              </Typography>
              <ButtonGroup
                variant="outlined"
                size="small"
                color="warning"
                sx={{ height: "35px", mt: -0.4 }}
              >
                <Button
                  className={
                    selectGraph === "OLT"
                      ? "selectedButton"
                      : "unselectedButton"
                  }
                  key="OLT"
                  onClick={() => handleGraphClick("OLT")}
                >
                  OLT
                </Button>
                <Button
                  className={
                    selectGraph === "UNLINK"
                      ? "selectedButton"
                      : "unselectedButton"
                  }
                  key="UNLINK"
                  onClick={() => handleGraphClick("UNLINK")}
                >
                  UNLINK
                </Button>
                <Button
                  className={
                    selectGraph === "PON"
                      ? "selectedButton"
                      : "unselectedButton"
                  }
                  key="PON"
                  onClick={() => handleGraphClick("PON")}
                >
                  PON
                </Button>
                <Button
                  className={
                    selectGraph === "TRAFFIC"
                      ? "selectedButton"
                      : "unselectedButton"
                  }
                  key="TRAFFIC"
                  onClick={() => handleGraphClick("TRAFFIC")}
                >
                  TRAFFIC
                </Button>
                <Button
                  className={
                    selectGraph === "SIGNAL"
                      ? "selectedButton"
                      : "unselectedButton"
                  }
                  key="SIGNAL"
                  onClick={() => handleGraphClick("SIGNAL")}
                >
                  SIGNAL
                </Button>
              </ButtonGroup>
            </Stack>
          </Grid>
        </Grid>
        <Grid container sx={{ mt: 2 }} spacing={3}>
          {GraphData.map((item, index) => {
            return (
              <Grid key={index} item xs={12} md={6}>
                <Stack direction="column">
                  <Typography variant="h6">{item.name}</Typography>
                  <img src={item.img} />
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
