import { ErrorMessage } from "../errorMessage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { ROUTES } from "../../Contants";

export default function Callback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  let navigate = useNavigate();
  const error = params.get("error");

  useEffect(() => {
    if (code) {
      sessionStorage.setItem("code", code);
      navigate(ROUTES.TRANSACTIONS);
    }
  }, []);

  if (error) {
    const errorMsg = params.get("message") || null;
    return <ErrorMessage message={errorMsg} error={error} />;
  } else {
    return <CircularProgress />;
  }
}
