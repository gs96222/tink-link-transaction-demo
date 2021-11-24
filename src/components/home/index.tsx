import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import utils from "../../utils";
import { useTheme } from "@mui/material/styles";

function openTinkLink() {
  window.location.href = utils.getTransactionTinkLinkURL();
}

export default function Home() {
  const theme = useTheme();
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Hello Welcome to the Tink Transaction Demo
      </Typography>
      <Button
        sx={{ backgroundColor: theme.palette.primary.light }}
        variant="contained"
        onClick={openTinkLink}
      >
        Connect
      </Button>
    </Box>
  );
}
