export const getHighestTransaction = async (clientCode: string) => {
    console.log("base URL",process.env.REACT_APP_API_BASE_URL )
    const url = process.env.REACT_APP_API_BASE_URL + 'transaction/highest'
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ code: clientCode }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${window.btoa(process.env.REACT_APP_API_USER + ':' + process.env.REACT_APP_API_PASS)}`
      },
    });
  
    const transactionResponse = await response.json();
    return transactionResponse.data;
};