import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { getHighestTransaction } from "../../api";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import merchantFallbackImage from "../../assets/images/merchant-fallback-image.jpg";
import { ROUTES } from "../../Contants";
import Theme from "../../theme";

const useStyles = makeStyles((theme: typeof Theme) => ({
  cardContainer: {
    minWidth: "335px",
    boxShadow: "0px 4px 12px 9px grey",
  },
  image: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
    borderRadius: "50%",
    width: "110px",
    marginBottom: "1rem",
  },
  link: {
    color: theme.palette.primary.light,
  },
}));

export const Transaction = () => {
  let navigate = useNavigate();
  const [transactionDetails, setTransactionDetails] = useState({
    mostTransactionMerchant: { merchantName: null, amount: null },
    currencyCode: "",
    image: "",
  });
  const classes = useStyles();
  useEffect(() => {
    const clientCode = sessionStorage.getItem("code");
    if (!clientCode) {
      navigate(ROUTES.HOME);
    }
    (async () => {
      const highestTransactionDetails = await getHighestTransaction(clientCode);
      setTransactionDetails(highestTransactionDetails);
      sessionStorage.removeItem("code");
    })();
    return () => sessionStorage.removeItem("code");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (transactionDetails.mostTransactionMerchant.merchantName) {
    return (
      <Card className={classes.cardContainer}>
        <CardContent>
          <Typography
            sx={{ fontSize: "0.9rem", mb: 1 }}
            align="center"
            color="text.secondary"
          >
            <strong>Your top merchant:</strong>
          </Typography>
          <CardMedia
            component="img"
            alt={transactionDetails.mostTransactionMerchant.merchantName}
            height="110"
            className={classes.image}
            image={transactionDetails.image || merchantFallbackImage}
          />
          <Typography align="center" variant="h5" component="div">
            <strong>
              {`${transactionDetails.mostTransactionMerchant?.amount} ${transactionDetails.currencyCode}`}
            </strong>
          </Typography>
          <Typography
            align="center"
            variant="body2"
            sx={{ fontSize: "0.7rem" }}
          >
            <strong>{`During ${new Date().getFullYear()} you have spent ${
              transactionDetails.mostTransactionMerchant?.amount
            } ${transactionDetails.currencyCode} ${
              transactionDetails.mostTransactionMerchant.merchantName
            }`}</strong>
          </Typography>
        </CardContent>
        <CardActions>
          <Button className={classes.link} href={ROUTES.HOME} size="small">
            Go To Home
          </Button>
        </CardActions>
      </Card>
    );
  } else {
    return <CircularProgress />;
  }
};
