import { CALLBACK_PATH } from "../Contants";

class Utils{
    clientId: undefined | string;
    baseURL: undefined | string;

    constructor(){
        this.clientId = process.env.REACT_APP_TINK_LINK_CLIENT_ID;
        this.baseURL =  process.env.REACT_APP_BASE_URL;
    }

    getTransactionTinkLinkURL(): string {
        const paramsData = {
          client_id: this.clientId as string,
          redirect_uri: this.baseURL as string + CALLBACK_PATH.TRANSACTION,
          market: process.env.REACT_APP_MARKET as string,
          locale: process.env.REACT_APP_LOCALE as string,
          test: (true as unknown) as string,
        }
        const searchParams = new URLSearchParams(paramsData)
      
        return `${process.env.REACT_APP_TINK_LINK_BASE_URL}${process.env.REACT_APP_TINK_LINK_URL_VERSION}/transactions/connect-accounts/?${searchParams.toString()}`;
      };
}

export default new Utils();
