import { Button, Container, Grid, MenuItem, Select, Stack, Typography } from "@mui/material";

export default function Export() {
  return (
    <>
      <Container direction="column" sx={{ mt: 3 }}>
        <Typography variant="h5">
          <b>Export</b>
        </Typography>
        <Grid container sx={{ mt: 2 }} spacing={1}>
          <Grid item xs={12} sm={6} lg={3}>
            <Typography variant="subtitle2">
              <b>OLT</b>
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
          <Grid item xs={12} sm={6} lg={2}>
            <Typography variant="subtitle2">
              <b>Board</b>
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
          <Grid item xs={12} sm={6} lg={2}>
            <Typography variant="subtitle2">
              <b>Port</b>
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
          <Grid item xs={12} sm={6} lg={2}>
            <Typography variant="subtitle2">
              <b>Zone</b>
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
        </Grid>
        <Stack direction="row" sx={{ width: { lg: "74.8%", sm: "100%", xs: "100%" }, mt: 2  }}>
            <Button fullWidth color="success" variant="contained" size="small" sx={{ borderRadius: "3px", boxShadow: 0 }}><b>EXPORT</b></Button>
        </Stack>
      </Container>
    </>
  );
}
