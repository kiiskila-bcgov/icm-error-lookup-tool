import {
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import Layout from "../components/Layout";

const RequestDocumenttion = () => {
  const handleSubmitClick = () => {
    console.log("submit clicked");
  };

  return (
    <Layout>
      <Paper elevation={3} style={{ padding: "1rem", marginBottom: "2rem" }}>
        <Stack>
          <Typography variant="h4" gutterBottom>
            Request for Documentation
          </Typography>
          <Typography variant="h6">
            Your request will be sent to our admin team for review. Please note,
            we cannot guarantee timing for when the documentation will be
            updated.
          </Typography>

          <FormControl variant="filled" required>
            <InputLabel htmlFor="error-code">Error Code (required)</InputLabel>
            <FilledInput id="error-code" placeholder="e.g. INT012-250" />
          </FormControl>

          <FormControl variant="filled" required>
            <InputLabel htmlFor="error-description">
              Please describe the error (optional)
            </InputLabel>
            <FilledInput
              multiline
              id="error-description"
              placeholder="Placeholder text"
              rows={4}
            />
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitClick}
            style={{
              backgroundColor: "#18356a",
              color: "white",
              marginBottom: "1rem",
            }}
          >
            Submit
          </Button>
        </Stack>
      </Paper>
    </Layout>
  );
};

export default RequestDocumenttion;
