// @ts-nocheck
import { NETWORK_ID, API_HOST, CHAIN_ID } from "../utils/mainlib"
import Pact from 'pact-lang-api';

const ISOKO_ORCHESTRATOR = 'n_f1c962776331c4773136dc1587a8355c9957eae1.isoko-orchestrator'

const accountKey = (account) => {
  return account.split(':')[1]
}

export const mkReq = function (cmd) {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(cmd),
  };
};

export const parseRes = async function (raw) {
  const rawRes = await raw;
  const res = await rawRes;
  if (res.ok) {
    const resJSON = await rawRes.json();
    return resJSON;
  } else {
    const resTEXT = await rawRes.text();
    return resTEXT;
  }
};

export const wait = async (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export const listen = async (reqKey) => {
  let time = 500;
  let pollRes;
  while (time > 0) {
    await wait(5000);
    pollRes = await Pact.fetch.poll({ requestKeys: [reqKey] }, API_HOST);
    if (Object.keys(pollRes).length === 0) {
      time = time - 5;
    } else {
      time = 0;
    }
  }
  if (pollRes && pollRes[reqKey]) {
    return pollRes[reqKey];
  }
  return null;
};

export const apiCommandSigner = async (pactCode, account, contract, tx_data, gLimit) => {

  let CAP = []

  if (typeof tx_data?.tokens !== 'undefined') {
    CAP = [
      Pact.lang.mkCap("Gas Capability", "Agreement to Pay Gas", "coin.GAS", []),
      Pact.lang.mkCap("ACCOUNT-GUARD", "ACCOUNT-GUARD", `${contract}.ACCOUNT-GUARD`, [account]),
      Pact.lang.mkCap("REWARDS", "REWARDS", `${contract}.REWARDS`, [account, tx_data?.tokens]),
      Pact.lang.mkCap("MINT-BULK-REWARDS", "MINT-BULK-REWARDS", `${ISOKO_ORCHESTRATOR}.MINT-BULK-REWARDS`, [account, tx_data?.tokens?.length && { int: tx_data?.tokens?.length }]),
    ]
  } else {
    CAP = [
      Pact.lang.mkCap("Gas Capability", "Agreement to Pay Gas", "coin.GAS", []),
      Pact.lang.mkCap("ACCOUNT-GUARD", "ACCOUNT-GUARD", `${contract}.ACCOUNT-GUARD`, [account]),
    ]
  }

  try {
    const signCmd = {
      pactCode: pactCode,
      caps: CAP,
      sender: account,
      gasLimit: gLimit ? gLimit : 150000,
      gasPrice: 0.0000002,
      chainId: CHAIN_ID,
      ttl: 600,
      envData: { "purpose": tx_data?.purpose ? tx_data?.purpose : "" },
      // @ts-ignore
      signingPubKey: accountKey(account),
      networkId: NETWORK_ID
    };

    const cmd = await Pact.wallet.sign(signCmd);

    let data = await fetch(`${API_HOST}/api/v1/local`, mkReq(cmd));
    const testResult = await parseRes(data);

    if (testResult?.result?.status === 'success') {
      console.log("signed Succesfully", testResult)
      const res = await Pact.wallet.sendSigned(cmd, API_HOST);
      const requestResult = await listen(res.requestKeys[0]);
      console.log("finished sending tx", requestResult)
      if (res.requestKeys[0] === '' || res.requestKeys[0] === undefined) {
        return { 'error': 'An error occured' }
      } else {
        if (requestResult.result.status === 'success') {
          return typeof res?.reqKey !== 'undefined' ? res?.reqKey : typeof res?.requestKeys[0] != 'undefined' ? res?.requestKeys[0] : 'Transaction successful'
        } else {
          return { 'error': 'Check it out in the block explorer ' + res.requestKeys[0] }
        }
      }
    } else {
      return { 'error': testResult?.result?.error?.message ? testResult?.result?.error?.message : testResult }
    }


  } catch (error) {
    return error
  }

}