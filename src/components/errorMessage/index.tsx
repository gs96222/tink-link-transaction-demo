import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { ROUTES } from "../../Contants";

type ErrorMessageComponentProps = {
  message?: string;
  error?: string;
};

export const ErrorMessage: React.FC<ErrorMessageComponentProps> = ({
  error,
  message,
}) => {
  const theme = useTheme();

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Oops... Something went wrong
        </Typography>
        <Typography
          sx={{ mb: 1.5, color: theme.palette.error.main }}
          color="text.secondary"
        >
          {error}
        </Typography>
        <Typography variant="body2">{message}</Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={{ color: theme.palette.primary.light }}
          href={ROUTES.HOME}
          size="small"
        >
          Try Again
        </Button>
      </CardActions>
    </Card>
  );
};
