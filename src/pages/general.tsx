import { Paper, Typography, Stack, Button, Snackbar } from "@mui/material";
import React, { useState } from "react";
import Layout from "../components/Layout";

const General = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleFeedbackClick = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleFrontlineToolsClick = () => {
    window.open("https://www2.gov.bc.ca", "_blank");
  };

  const handleResourceFinderClick = () => {
    window.open("https://www2.gov.bc.ca", "_blank");
  };

  const handleMatrixClick = () => {
    window.open("https://www2.gov.bc.ca", "_blank");
  };

  return (
    <Layout>
      <Paper elevation={3} style={{ padding: "1rem", marginBottom: "2rem" }}>
        <Stack>
          <Typography variant="h3">Other ways to troubleshoot</Typography>
          <Typography variant="h6" marginBottom={"2rem"}>
            Pellentesque ut turpis ultricies, iaculis tortor eget, faucibus
            nulla. Nunc ullamcorper at quam vitae blandit. Phasellus lobortis
            felis at massa vehicula lobortis ac sit amet urna. Maecenas porta
            molestie sodales. Duis id lacus ullamcorper, venenatis nunc sed,
            dapibus purus. Aliquam quis efficitur nibh. Quisque non tortor
            rutrum, dapibus orci a, tempor erat. Duis erat tortor, facilisis at
            rhoncus eu, lacinia a urna.
          </Typography>
          <Typography variant="h4">The Loop</Typography>
          <Typography variant="h6" gutterBottom>
            Pellentesque ut turpis ultricies, iaculis tortor eget, faucibus
            nulla. Nunc ullamcorper at quam vitae blandit. Etiam turpis magna,
            dignissim a diam eget, consectetur aliquam libero.
          </Typography>
          <Typography variant="h5">
            <span
              style={{
                color: "#3256c0",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={handleFrontlineToolsClick}
            >
              Frontline Tools
            </span>
          </Typography>
          <Typography variant="h6" gutterBottom>
            Access information, tools and resources for frontline staff.
          </Typography>
          <Typography variant="h5">
            <span
              style={{
                color: "#3256c0",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={handleResourceFinderClick}
            >
              Resource Finder
            </span>
          </Typography>
          <Typography variant="h6" gutterBottom>
            Pellentesque a risus rhoncus, accumsan tellus ac, porta felis.
          </Typography>
          <Typography variant="h5">
            <span
              style={{
                color: "#3256c0",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={handleMatrixClick}
            >
              The Matrix (XLS)
            </span>
          </Typography>
          <Typography variant="h6" gutterBottom>
            Donec finibus odio enim, non mollis nisi ullamcorper eu.
          </Typography>
          <Paper variant="outlined" style={{ padding: "0.5rem" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body1">
                Did this page solve your problem?
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button variant="outlined" onClick={handleFeedbackClick}>
                  Yes
                </Button>
                <Button variant="outlined" onClick={handleFeedbackClick}>
                  No
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Thank you for your feedback!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Layout>
  );
};

export default General;
