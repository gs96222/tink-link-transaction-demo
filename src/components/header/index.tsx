import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Logo from "../icons/tinkIcon";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { ROUTES } from "../../Contants";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export default function Header() {
  const theme = useTheme();
  const classes = useStyles();
  console.log(theme);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ flexGrow: 1, backgroundColor: theme.palette.primary.dark }}
      >
        <Toolbar sx={{ textAlign: "center" }}>
          <Logo />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, px: 2, color: theme.palette.common.white }}
          >
            <Link to={ROUTES.HOME} className={classes.link}>
              <strong>Tink App Demo</strong>
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
