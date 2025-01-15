import {
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  InputLabel,
  Paper,
  Typography,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import Layout from "../components/Layout";

const RequestDocumentation = () => {
  const [errorCode, setErrorCode] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [errorCodeError, setErrorCodeError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmitClick = () => {
    if (!errorCode.trim()) {
      setErrorCodeError(true);
    } else {
      setErrorCodeError(false);
      setSnackbarOpen(true);
      setErrorCode("");
      setErrorDescription("");
      console.log("Request submitted:", { errorCode });
    }
  };

  return (
    <Layout>
      <Paper elevation={3} style={{ padding: "1rem", marginBottom: "2rem" }}>
        <Stack spacing={3}>
          <Typography variant="h4" gutterBottom>
            Request for Documentation
          </Typography>
          <Typography variant="h6">
            Your request will be sent to our admin team for review. Please note,
            we cannot guarantee timing for when the documentation will be
            updated.
          </Typography>

          <FormControl
            variant="filled"
            required
            fullWidth
            error={errorCodeError}
          >
            <InputLabel htmlFor="error-code">Error Code (required)</InputLabel>
            <FilledInput
              id="error-code"
              value={errorCode}
              onChange={(e) => setErrorCode(e.target.value)}
              placeholder="e.g. INT012-250"
            />
            {errorCodeError && (
              <FormHelperText>Error code is required.</FormHelperText>
            )}
          </FormControl>

          <FormControl variant="filled" fullWidth>
            <InputLabel htmlFor="error-description">
              Please describe the error (optional)
            </InputLabel>
            <FilledInput
              id="error-description"
              placeholder="Placeholder text"
              value={errorDescription}
              onChange={(e) => setErrorDescription(e.target.value)}
              multiline
              rows={4}
            />
          </FormControl>

          <Stack direction="row" spacing={2} justifyContent="flex-start">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitClick}
              style={{ backgroundColor: "#18356a", color: "white" }}
            >
              Submit Request
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
        >
          Request has been sent!
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default RequestDocumentation;
