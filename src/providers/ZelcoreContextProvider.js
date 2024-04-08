import { mkReq, parseRes } from "../utils/functions";
import { useState } from 'react';

export const WALLET = {
    ZELCORE: {
      id: 'ZELCORE',
      name: 'Zelcore',
      signMethod: 'wallet',
      getAccountsUrl: 'http://127.0.0.1:9467/v1/accounts',
    }
};

const ZelcoreContextProvider = () => {
    const fetch = require('node-fetch');

    const cmd = {
    asset: 'kadena',
    };
    
    const [_accounts, setAccounts] = useState([]);
    
    const [isGettingAddress, setIsGettingAddress] = useState(false);

    const openZelcore = () => window.open('zel:', '_self');

    const getAccounts = async () => {
        try {
          let res = await fetch(WALLET.ZELCORE.getAccountsUrl, mkReq(cmd));
          let pRes = await parseRes(res);
          return pRes;
        } catch (e) {
          return -1;
        }
    };

    const connect_zelcore = async () => {
        setIsGettingAddress(true);
        openZelcore();
        const getAccountsResponse = await getAccounts();
        if (getAccountsResponse.status === 'success') {
            setAccounts(getAccountsResponse.data);
        } else {
        /* walletError(); */
        }
        setIsGettingAddress(false);
    }

    return {connect_zelcore, _accounts, isGettingAddress}
}

export default ZelcoreContextProvider;