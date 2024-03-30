import { useState } from "react";
import {
  Button,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import AuthorizedForm from "../components/onu/onu-offline-form";

export default function UnConfigured() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddOnu = () => {
    setOpenDialog(true);
  }

  return (
    <>
      <Stack
        direction="column"
        sx={{ mt: { md: -13, xs: -1 }, p: { md: 15, xs: 3 } }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} lg={4}>
            <Typography variant="subtitle1">
              OLT
            </Typography>
            <Select
              color="warning"
              size="small"
              fullWidth
              sx={{
                height: "38px",
              }}
              variant="outlined"
              defaultValue="any"
            >
              <MenuItem value="any">
                any
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={3} lg={2}>
            <Button
              variant="contained"
              //   size="small"
              color="success"
              sx={{ boxShadow: 0, borderRadius: "3px", mt: 3.5 }}
            >
              Refresh
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="success"
              sx={{ boxShadow: 0, borderRadius: "3px", mt: 3.5 }}
              onClick={handleAddOnu}
            >
              Add ONU for later authorization
            </Button>
          </Grid>
        </Grid>
      </Stack>
      <AuthorizedForm
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
}
