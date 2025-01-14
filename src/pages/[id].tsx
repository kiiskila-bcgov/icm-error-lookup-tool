import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SystemMessage } from "../types";
import {
  CircularProgress,
  Alert,
  Container,
  Typography,
  Grid,
  Paper,
} from "@mui/material";

const MessageDetail = () => {
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

  return (
    <Container style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        System Message Detail
      </Typography>
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
        <Paper elevation={3} style={{ padding: "1rem" }}>
          {Object.entries(message).map(([key, value]) => (
            <Typography key={key} variant="body1" gutterBottom>
              <strong>{key.replace(/_/g, " ").toUpperCase()}:</strong> {value}
            </Typography>
          ))}
        </Paper>
      )}
      {!loading && !error && !message && (
        <Typography>No message found.</Typography>
      )}
    </Container>
  );
};

export default MessageDetail;
