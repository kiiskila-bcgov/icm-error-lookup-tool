import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SystemMessage } from "../../types";
import {
  CircularProgress,
  Alert,
  Typography,
  Grid,
  Paper,
  Button,
  Box,
  Collapse,
  Stack,
  Snackbar,
} from "@mui/material";
import { ArrowBack, ExpandMore } from "@mui/icons-material";
import Layout from "../../components/Layout";

const MessageDetail = () => {
  const router = useRouter();
  const {
    query: { id },
  } = useRouter();
  const [message, setMessage] = useState<SystemMessage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metaDataOpen, setMetaDataOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleFeedbackClick = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const loadMessage = async (id: string | string[] | undefined) => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/messages?id=${id}`);

      if (response.status === 404) {
        setError("Message not found.");
        return;
      }

      if (!response.ok) throw new Error("Failed to fetch message details.");

      const { data } = await response.json();
      setMessage(data);
    } catch (error) {
      console.error("Error fetching message:", error);
      setError("Failed to fetch message details.");
      setMessage(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadMessage(id);
  }, [id]);

  const handleBackClick = () => {
    router.push("/");
  };

  const renderWithLineBreaks = (text: string) => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <Layout>
      {loading && (
        <Grid
          container
          justifyContent="center"
          style={{ marginBottom: "1rem" }}
        >
          <CircularProgress />
        </Grid>
      )}
      {error && (
        <Alert severity="error" style={{ marginBottom: "1rem" }}>
          {error}{" "}
          {error === "Message not found." && (
            <Typography variant="h5" style={{ marginTop: "1rem" }}>
              <span
                style={{
                  color: "#3256c0",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => router.push("/request-documentation")}
              >
                Request documentation
              </span>
            </Typography>
          )}
        </Alert>
      )}

      {!loading && !error && message && (
        <>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBack />}
            onClick={handleBackClick}
            style={{
              backgroundColor: "#18356a",
              color: "white",
              marginBottom: "1rem",
            }}
          >
            Back to Search
          </Button>
          <Paper
            elevation={3}
            style={{ padding: "1rem", marginBottom: "2rem" }}
          >
            <Typography variant="h6" color="grey">
              Error Code
            </Typography>
            <Typography variant="h3" gutterBottom>
              {message.error_code}
            </Typography>
            <Paper
              style={{ backgroundColor: "#f4f4f4", marginBottom: "2rem" }}
              elevation={0}
            >
              <Typography variant="h4" paddingX={"1rem"} paddingTop={"1rem"}>
                Message
              </Typography>
              <Typography variant="h5" padding={"1rem"}>
                {message.error_message}
              </Typography>
            </Paper>
            <Typography variant="h5">
              <Box fontWeight="bold">What caused this?</Box>
            </Typography>
            {message.explanation ? (
              <Typography variant="h6" marginLeft={"1rem"}>
                {renderWithLineBreaks(message.explanation)}
              </Typography>
            ) : (
              <Typography variant="h6" marginLeft={"1rem"}>
                No explanation documented yet.
              </Typography>
            )}

            <Typography variant="h5" marginTop={"1rem"}>
              <Box fontWeight="bold">How to resolve the error</Box>
            </Typography>
            {message.fix ? (
              <Typography variant="h6" marginLeft={"1rem"}>
                {renderWithLineBreaks(message.fix)}
              </Typography>
            ) : (
              <Typography variant="h6" marginLeft={"1rem"}>
                No fix documented yet.
              </Typography>
            )}
            <Paper
              variant="outlined"
              style={{ padding: "0.5rem", marginTop: "1rem" }}
            >
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
            <Typography
              style={{ cursor: "pointer", color: "grey", marginTop: "1rem" }}
              onClick={() => setMetaDataOpen(!metaDataOpen)}
            >
              Meta Data
              <ExpandMore />
            </Typography>
            <Collapse in={metaDataOpen}>
              <Typography style={{ marginTop: "1rem" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id
                dui vel dolor placerat aliquam.
              </Typography>
            </Collapse>
          </Paper>
        </>
      )}
      {!loading && !error && !message && (
        <Typography>No message found.</Typography>
      )}
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

export default MessageDetail;
