import {
  Button,
  FilledInput,
  FormControl,
  InputLabel,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import Layout from "../components/Layout";

const General = () => {
  const handleSubmitClick = () => {
    console.log("submit clicked");
  };

  return (
    <Layout>
      <Paper elevation={3} style={{ padding: "1rem", marginBottom: "2rem" }}>
        <Stack>
          <Typography variant="h3">Other ways to troubleshoot</Typography>
          <Typography variant="h6">
            Pellentesque ut turpis ultricies, iaculis tortor eget, faucibus
            nulla. Nunc ullamcorper at quam vitae blandit. Phasellus lobortis
            felis at massa vehicula lobortis ac sit amet urna. Maecenas porta
            molestie sodales. Duis id lacus ullamcorper, venenatis nunc sed,
            dapibus purus. Aliquam quis efficitur nibh. Quisque non tortor
            rutrum, dapibus orci a, tempor erat. Duis erat tortor, facilisis at
            rhoncus eu, lacinia a urna.
          </Typography>

          <Typography variant="h4">The Loop</Typography>
          <Typography variant="h6">
            Pellentesque ut turpis ultricies, iaculis tortor eget, faucibus
            nulla. Nunc ullamcorper at quam vitae blandit. Etiam turpis magna,
            dignissim a diam eget, consectetur aliquam libero.
          </Typography>
          <Typography
            variant="h5"
            style={{
              color: "#3256c0",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Frontline Tools
          </Typography>
          <Typography variant="h6">
            Access information, tools and resources for frontline staff.
          </Typography>
          <Typography
            variant="h5"
            style={{
              color: "#3256c0",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Resource Finder
          </Typography>
          <Typography variant="h6">
            Pellentesque a risus rhoncus, accumsan tellus ac, porta felis.
          </Typography>
          <Typography
            variant="h5"
            style={{
              color: "#3256c0",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            The Matrix (XLS)
          </Typography>
          <Typography variant="h6">
            Donec finibus odio enim, non mollis nisi ullamcorper eu.
          </Typography>
        </Stack>
      </Paper>
    </Layout>
  );
};

export default General;
