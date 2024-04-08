import { getKDABalance } from "../api/contract";
import { NETWORK_ID, API_HOST, CHAIN_ID } from "./mainlib"


export const checkEckoWallet = async () => {
    /* Check if is X-Wallet installed */
    const isXWalletInstalled = () => {
        const { kadena } = window;
        console.log(kadena)
        return Boolean(kadena && kadena.isKadena);
    };

    const initialize = async () => {
        if (isXWalletInstalled()) {
            return true
        }else{
            return false
        }
    };
    window.addEventListener('load', initialize);
    const response = await initialize()
    return response
}

export const connectEckoWallet = async () => {
    const { kadena } = window;
    const response = await kadena.request({
        method: 'kda_connect',
        networkId: NETWORK_ID,
    });

    return response;
}

export const getAccountInformationEckoWallet = async () => {
    const { kadena } = window;
    const response = await kadena.request({
        method: 'kda_requestAccount',
        NETWORK_ID,
      });

    return response;
}

export const disconnectEckoWallet = async () => {
    const { kadena } = window;
    const response = await kadena.request({
        method: 'kda_disconnect',
        networkId: NETWORK_ID,
    });
    return response;
}

export const connectChainweaver = async (account) => {
    const response = await getKDABalance(account)
    if(response.status == 'success'){
        return true
    }else{
        return false
    }
}