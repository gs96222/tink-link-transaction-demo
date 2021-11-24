const fetch = require("node-fetch");
const { NOT_MERCHANTS } = require("../constants");

const getTransactionAccessToken = async (code) => {
  const response = await fetch(
    `${process.env.TINK_LINK_API_BASE_URL}api/v1/oauth/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: new URLSearchParams({
        code: code,
        client_id: process.env.REACT_APP_TINK_LINK_CLIENT_ID,
        client_secret: process.env.TINK_LINK_CLIENT_SECRET,
        grant_type: "authorization_code",
      }),
    }
  );

  const transactionAccessTokenResponse = await response.json();

  if (response.status !== 200) {
    console.error("Error in fetching access token", response);
    throw Error();
  }

  return transactionAccessTokenResponse.access_token;
};

const filterCurrentYearTransactionData = (data = [], currentYear) => {
  const currentYearDebitTransactions = data.filter(
    (item) =>
      currentYear ===
        new Date(item.dates?.booked || currentYear - 1).getFullYear() &&
      item.amount?.value?.unscaledValue < 0 &&
      NOT_MERCHANTS.indexOf(item.descriptions.display) === -1
  );

  const merchantTransactions = currentYearDebitTransactions.map((item) => {
    const debitMerchantTransaction = {
      merchantName: item.descriptions.display,
      amt:
        item.amount?.value?.unscaledValue /
        Math.pow(10, item.amount?.value?.scale),
    };
    return debitMerchantTransaction;
  });

  return merchantTransactions;
};

const getHighestTransactionMerchant = (transactions) => {
  const merchants = {};
  transactions.forEach((item) => {
    if (merchants[item.merchantName]) {
      merchants[item.merchantName] =
        merchants[item.merchantName] + Math.abs(item.amt);
    } else {
      merchants[item.merchantName] = Math.abs(item.amt);
    }
  });
  const highestspendMerchant = Object.keys(merchants).reduce((a, b) =>
    merchants[a] > merchants[b] ? a : b
  );

  return {
    merchantName: highestspendMerchant,
    amount: merchants[highestspendMerchant],
  };
};

module.exports = {
  getTransactionAccessToken,
  filterCurrentYearTransactionData,
  getHighestTransactionMerchant,
};
