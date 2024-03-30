import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useState } from "react";

export default function Authorization() {
  const [selectedButton, setSelectedButton] = useState("ALL");
  const handleButtonClick = (key) => {
    setSelectedButton(key);
  };

  return (
    <>
      <Container direction="column" sx={{ mt: 2 }}>
        <Typography variant="h5">
          <b>Authorization</b>
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={12} lg={4}>
            <Typography variant="subtitle2">
              <b>Search</b>
            </Typography>
            <TextField
              inputProps={{
                style: {
                  height: "15px",
                },
              }}
              placeholder="SN, IP, name or address"
              color="warning"
              size="small"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={2}>
            <Typography variant="subtitle2">
              <b>User</b>
            </Typography>
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
              <MenuItem value="any">
                <b>any</b>
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6} lg={2} sx={{ mt: 0.85 }}>
            <ButtonGroup
              variant="outlined"
              size="small"
              color="warning"
              sx={{
                height: "30px",
                mt: 2,
                mr: { xs: 0, md: 4 },
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Button
                className={
                  selectedButton === "ALL"
                    ? "selectedButton"
                    : "unselectedButton"
                }
                key="ALL"
                onClick={() => handleButtonClick("ALL")}
              >
                <b>ALL</b>
              </Button>
              <Button
                className={
                  selectedButton === "EPON"
                    ? "selectedButton"
                    : "unselectedButton"
                }
                key="EPON"
                onClick={() => handleButtonClick("EPON")}
              >
                <b>EPON</b>
              </Button>
              <Button
                className={
                  selectedButton === "GPON"
                    ? "selectedButton"
                    : "unselectedButton"
                }
                key="GPON"
                onClick={() => handleButtonClick("GPON")}
              >
                <b>GPON</b>
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, width: "100%" }}
          >
            <Stack direction="column" sx={{ pr: { xs: 0, md: 1 } }}>
              <Typography variant="subtitle2">
                <b>from</b>
              </Typography>
              <TextField
                inputProps={{
                  style: {
                    height: "15px",
                  },
                }}
                placeholder="from"
                type="date"
                color="warning"
                size="small"
                fullWidth
                variant="outlined"
              />
            </Stack>
            <Stack direction="column">
              <Typography variant="subtitle2">
                <b>to</b>
              </Typography>
              <TextField
                inputProps={{
                  style: {
                    height: "15px",
                  },
                }}
                placeholder="to"
                type="date"
                color="warning"
                size="small"
                fullWidth
                variant="outlined"
              />
            </Stack>
          </Grid>
        </Grid>
        <MUIDataTable
          options={{
            viewColumns: false,
            filter: true,
            print: false,
            download: false,
            selectableRows: false,
            rowsPerPage: 5,
            rowsPerPageOptions: [5, 10, 15, 20],
            textLabels: {
              body: {
                noMatch: "Information not found.",
              },
            },
          }}
        />
      </Container>
    </>
  );
}
