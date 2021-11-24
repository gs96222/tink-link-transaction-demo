const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const basicAuth = require("express-basic-auth");
const indexRoute = require("./routes/index"); // Default test route
const transactionRoutes = require("./routes/transaction");

const basicAuthorizer = (username, password) => {
  const userMatches = basicAuth.safeCompare(process.env.API_USER, username);
  const passwordMatches = basicAuth.safeCompare(process.env.API_PASS, password);
  return userMatches & passwordMatches;
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(basicAuth({ authorizer: basicAuthorizer }));

app.set("trust proxy", true);

app.use("/", indexRoute); // Default test route
app.use("/transaction", transactionRoutes);

app.listen(process.env.PORT || 4000, () => {
  console.log(
    `Tink Demo application server running at port: ${process.env.PORT || 4000}`
  );
});
