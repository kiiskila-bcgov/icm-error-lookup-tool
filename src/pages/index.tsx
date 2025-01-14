import React, { useState } from "react";
import { useRouter } from "next/router";
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

const Home = () => {
  const router = useRouter();
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [rows] = useState([
    {
      id: 1,
      error_code: "ERR001",
      data_group: "Group A",
      message: "Sample error message 1",
    },
    {
      id: 2,
      error_code: "ERR002",
      data_group: "Group B",
      message: "Sample error message 2",
    },
    {
      id: 3,
      error_code: "ERR003",
      data_group: "Group C",
      message: "Sample error message 3",
    },
    {
      id: 4,
      error_code: "ERR004",
      data_group: "Group D",
      message: "Sample error message 4",
    },
    {
      id: 5,
      error_code: "ERR005",
      data_group: "Group E",
      message: "Sample error message 5",
    },
    {
      id: 6,
      error_code: "ERR006",
      data_group: "Group E",
      message: "Sample error message 6",
    },
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSearch = () => {
    if (errorCode.trim()) {
      console.log("Searching for error code:", errorCode);
    }
  };

  return (
    <Container style={{ maxWidth: "100%", padding: 0 }}>
      <Card
        style={{
          backgroundColor: "#e2f1fb",
          margin: "1rem",
        }}
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
                onClick={() => router.push(`/${index + 1}`)}
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
                    <TableCell
                      style={{
                        color: "#3256c0",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={() => router.push(`/${row.id}`)}
                    >
                      {row.error_code}
                    </TableCell>
                    <TableCell>{row.data_group}</TableCell>
                    <TableCell>{row.message}</TableCell>
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
          Last Updated on December 13th, 2024
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
