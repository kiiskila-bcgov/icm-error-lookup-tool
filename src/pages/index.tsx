import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { SystemMessage } from "../types";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";

const useMessages = (errorCode: string) => {
  const [messages, setMessages] = useState<SystemMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/messages?errorCode=${errorCode}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setMessages(data.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  }, [errorCode]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  return { messages, loading, error, loadMessages };
};

const Home = () => {
  const [errorCode, setErrorCode] = useState<string>("");
  const { messages, loading, error, loadMessages } = useMessages(errorCode);
  const router = useRouter();

  const headers = ["Error Code", "Datagroup", "Error Message"];

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        System Messages
      </Typography>
      <TextField
        id="error-code-search"
        label="Filter by error code"
        placeholder="Enter error code"
        value={errorCode}
        onChange={(e) => setErrorCode(e.target.value)}
        style={{ marginBottom: "1rem", width: "50%" }}
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={loadMessages}
        style={{ marginBottom: "1rem" }}
      >
        Load Messages
      </Button>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && messages.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.map((message) => (
                <TableRow
                  key={message.id}
                  onClick={() => router.push(`/${message.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>{message.error_code}</TableCell>
                  <TableCell>{message.data_group}</TableCell>
                  <TableCell>{message.error_message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {!loading && !error && messages.length === 0 && (
        <Typography>No messages found.</Typography>
      )}
    </div>
  );
};

export default Home;
