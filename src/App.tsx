import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";
import Callback from "./components/callback";
import { Transaction } from "./components/transaction";

type AppProps = {
  style?: any;
};
const App: React.FC<AppProps> = () => {
  return (
    <>
      <Header />
      <Container
        maxWidth="sm"
        sx={{ mt: 3, backgroundColor: "rgb(252, 252, 252)" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "87vh",
            justifyContent: "center",
            alignItems: "Center",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/transactions" element={<Transaction />} />
          </Routes>
        </Box>
      </Container>
    </>
  );
};

export default App;
