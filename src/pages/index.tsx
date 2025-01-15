import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { format } from "date-fns";
import {
  Container,
  TextField,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Collapse,
  IconButton,
  Box,
  InputAdornment,
} from "@mui/material";
import { ExpandMore, Search as SearchIcon } from "@mui/icons-material";

interface ErrorRow {
  id: number;
  error_code: string;
  data_group: string;
  error_message: string;
}

interface ApiResponse {
  data: ErrorRow[];
}

const Home = () => {
  const router = useRouter();
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [, setLoading] = useState(false);
  const [, setError] = useState("");
  const [searchResults, setSearchResults] = useState<ErrorRow[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const rows = searchResults;

  const fetchLastUpdated = async () => {
    try {
      const response = await axios.get("/api/last-updated");

      if (response.data && response.data.last_updated) {
        const lastUpdatedDate = new Date(response.data.last_updated);
        const formattedDate = format(lastUpdatedDate, "MMMM dd'th', yyyy");
        setLastUpdated(formattedDate);
      } else {
        setLastUpdated("No last updated data available");
      }
    } catch (err) {
      console.log(err);
      setLastUpdated("Unable to fetch last updated date");
    }
  };

  const handleSearch = async () => {
    if (!errorCode.trim()) {
      return fetchAllMessages();
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get<ApiResponse>(
        `/api/messages?errorCode=${errorCode}`
      );
      const messages = response.data.data;
      setSearchResults(messages);
      setPage(0);
    } catch (err) {
      const error = err as AxiosError;
      setError(error.message || "An error occurred while searching");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const fetchAllMessages = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get<ApiResponse>("/api/messages");
      setSearchResults(response.data.data);
    } catch (err) {
      const error = err as AxiosError;
      setError(error.message || "An error occurred while fetching messages");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMessages();
    fetchLastUpdated();
  }, []);

  return (
    <Container style={{ maxWidth: "100%", padding: 0 }}>
      <Card
        style={{
          backgroundColor: "#e2f1fb",
          margin: "15px 20px",
        }}
        elevation={0}
      >
        <Box style={{ height: "4px", backgroundColor: "#ffb035" }} />
        <CardContent style={{ padding: "2rem" }}>
          <Typography variant="h4" gutterBottom>
            ICM Error Look-up Tool
          </Typography>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                placeholder="Search by error code"
                value={errorCode}
                onChange={(e) => setErrorCode(e.target.value)}
                variant="outlined"
                onKeyPress={handleKeyPress}
                style={{ backgroundColor: "#fafafa" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleSearch}
                        style={{
                          backgroundColor: "#c14a20",
                          color: "white",
                          padding: "1rem",
                          borderRadius: "7%",
                          marginRight: "-14px",
                        }}
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Typography
            style={{ marginTop: "1rem", cursor: "pointer", color: "#3256c0" }}
            onClick={() => setAdvancedOpen(!advancedOpen)}
          >
            Use Advanced Search <ExpandMore />
          </Typography>
          <Collapse in={advancedOpen}>
            <Typography style={{ marginTop: "1rem" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              luctus urna sed urna ultricies.
            </Typography>
          </Collapse>
        </CardContent>
      </Card>

      <Paper
        elevation={0}
        style={{
          margin: "3rem",
          paddingBottom: "1rem",
          backgroundColor: "#fafafa",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Links to common pages
        </Typography>
        <Grid container spacing={2} style={{ marginBottom: "2rem" }}>
          {[
            '"System Error"',
            '"The System is Busy"',
            'Error code "99"',
            "How to use ISD Support Desk",
          ].map((page, index) => (
            <Grid item key={index}>
              <Chip
                label={page}
                clickable
                style={{
                  padding: "1rem",
                  fontSize: "1rem",
                  borderRadius: "0",
                  color: "#3256c0",
                  borderColor: "#3256c0",
                  borderWidth: 2,
                }}
                onClick={() => router.push(`/messages/${index + 1}`)}
                variant="outlined"
              />
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" gutterBottom>
          All Error messages
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            width: {
              xs: "100%",
              sm: "80%",
            },
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#efefef" }}
                >
                  Error Code
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#efefef" }}
                >
                  Datagroup
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#efefef" }}
                >
                  Message
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <span
                        style={{
                          color: "#3256c0",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={() => router.push(`/messages/${row.id}`)}
                      >
                        {row.error_code}
                      </span>
                    </TableCell>
                    <TableCell>{row.data_group}</TableCell>
                    <TableCell>{row.error_message}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          sx={{
            marginBottom: "1rem",
            width: {
              xs: "100%",
              sm: "80%",
            },
            backgroundColor: "#efefef",
          }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
        <Typography style={{ marginBottom: "1rem" }}>
          {lastUpdated ? `Last updated on ${lastUpdated}` : "Loading..."}
        </Typography>

        <Typography
          style={{ cursor: "pointer", color: "#3256c0" }}
          onClick={() => setNotesOpen(!notesOpen)}
        >
          Update notes
          <ExpandMore />
        </Typography>
        <Collapse in={notesOpen}>
          <Typography style={{ marginTop: "1rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            faucibus, orci vel blandit convallis.
          </Typography>
        </Collapse>

        <Typography
          style={{ cursor: "pointer", color: "#3256c0", marginTop: "1rem" }}
          onClick={() => setDisclaimerOpen(!disclaimerOpen)}
        >
          ICM Error Look-up tool Disclaimer
          <ExpandMore />
        </Typography>
        <Collapse in={disclaimerOpen}>
          <Typography style={{ marginTop: "1rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id dui
            vel dolor placerat aliquam.
          </Typography>
        </Collapse>
      </Paper>
    </Container>
  );
};

export default Home;
