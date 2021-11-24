const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const {
  getTransactionAccessToken,
  filterCurrentYearTransactionData,
  getHighestTransactionMerchant,
} = require("../utils");

router.post("/highest", async (req, res, next) => {
  let clientTransactionAccessToken;
  if (req.body?.code) {
    try {
      clientTransactionAccessToken = await getTransactionAccessToken(
        req.body.code
      );
    } catch (error) {
      res.status(400).send({
        message:
          "code value is stale or there might be some unexpected error occured",
      });
    }
  } else {
    res.status(400).send("Response body not recieved correctely");
  }

  const transactionResponse = await getTransactionData(
    clientTransactionAccessToken
  );

  const transaction = {
    mostTransactionMerchant: getHighestTransactionMerchant(
      transactionResponse.transactions
    ),
    currencyCode: transactionResponse.currency,
  };

  transaction[
    "image"
  ] = `https://logo.clearbit.com/${transaction.mostTransactionMerchant.merchantName}.se`;

  if (!transaction) {
    console.error("failed transaction request", transaction);
    res.status(400).send({ error: "Acess Code issue. Please try again" });
  } else {
    res.status(200).send({ data: transaction });
  }
});

async function getTransactionData(clientTransactionAccessToken) {
  const transactions = [];
  const currentYear = new Date().getFullYear();
  let transactionData = { transactions: [], nextPageToken: "" };
  do {
    transactionData = await fetchTransactionData(
      clientTransactionAccessToken,
      transactionData.transactions?.[0]?.accountId,
      transactionData.nextPageToken
    );
    transactions.push(
      filterCurrentYearTransactionData(
        transactionData?.transactions,
        currentYear
      )
    );

    if (
      currentYear !==
      (transactionData.transactions.length > 0 &&
        new Date(
          transactionData.transactions[1]?.dates?.booked || currentYear
        ).getFullYear())
    ) {
      break;
    }
  } while (transactionData.nextPageToken !== "");
  const currencyCode =
    transactionData.transactions?.[0]?.amount?.currencyCode || "SEK";
  return { transactions: transactions.flat(1), currency: currencyCode };
}

async function fetchTransactionData(
  clientTransactionAccessToken,
  accountIdln = "",
  pageToken = ""
) {
  const response = await fetch(
    `${process.env.TINK_LINK_API_BASE_URL}data/v2/transactions?${
      accountIdln ? `accountIdln=${accountIdln}` : ""
    }${pageToken ? `&pageToken=${pageToken}` : ""}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${clientTransactionAccessToken}`,
        "Content-Type": "application/json; charset=utf-8",
      },
    }
  );
  return response.json();
}

module.exports = router;
