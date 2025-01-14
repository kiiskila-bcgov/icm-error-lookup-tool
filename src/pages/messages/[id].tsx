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
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Layout from "../../components/Layout";

const MessageDetail = () => {
  const router = useRouter();
  const {
    query: { id },
  } = useRouter();
  const [message, setMessage] = useState<SystemMessage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMessage = async (id: string | string[] | undefined) => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/messages?id=${id}`);
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
          {error}
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
          <Paper elevation={3} style={{ padding: "1rem" }}>
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
            <Typography variant="h6" marginBottom={"2rem"} fontStyle={"bold"}>
              {renderWithLineBreaks(message.explanation) ||
                "No explanation documented yet."}
            </Typography>
            <Typography variant="h5">
              <Box fontWeight="bold">How to resolve the error</Box>
            </Typography>
            <Typography variant="h6">
              {message.fix
                ? renderWithLineBreaks(message.fix)
                : "No fix documented yet."}
            </Typography>
          </Paper>
        </>
      )}
      {!loading && !error && !message && (
        <Typography>No message found.</Typography>
      )}
    </Layout>
  );
};

export default MessageDetail;
