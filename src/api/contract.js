import {
  createWalletConnectSign,
  createWalletConnectQuicksign,
  Pact,
  signWithChainweaver,
  createClient,
  isSignedTransaction,
} from '@kadena/client';
import { NETWORK_ID, API_HOST, CHAIN_ID, TTL, GAS_LIMIT, GAS_PRICE } from "../utils/mainlib"
import { apiCommandSigner } from './pact_wallet';

const accountKey = (account) => {
  return account.split(':')[1]
}

const CLIENT = createClient(API_HOST);
const openZelcore = () => window.open('zel:', '_self');

const meta = (account, gas_limit) => {
  const META = {
    chainId: CHAIN_ID,
    senderAccount: account,
    ttl: TTL,
    gasLimit: typeof gas_limit !== 'undefined' && gas_limit !== '' ? gas_limit : GAS_LIMIT,
    gasPrice: GAS_PRICE,
  }
  return META
}

const ACCOUNT = "k:36990b871267ec4532551e505260806d7f39378cebb5ea2c998c80301c5a100f"

const BATTLE_HEROES = 'n_7d47538766e6f80008f253dccd30451f4d483c38.battle-heroes-nft-policy'
const BH_SGK_REWARDS = 'n_7d47538766e6f80008f253dccd30451f4d483c38.battle-heroes-rewards-orchestrator'
const GO_SGK_REWARDS = 'n_7d47538766e6f80008f253dccd30451f4d483c38.gen-0-rewards-orchestrator'
const GEN_0 = 'n_7d47538766e6f80008f253dccd30451f4d483c38.sgk-gen-0-policy'
const MERMALADE = 'marmalade.ledger'
const ISOKO_ORCHESTRATOR = 'n_f1c962776331c4773136dc1587a8355c9957eae1.isoko-orchestrator'

export const requestResult = async (transactionBuilder) => {
  const unsignedTransaction = Pact.builder
    .execution(transactionBuilder)
    .addSigner(accountKey(ACCOUNT))
    .setMeta(meta(ACCOUNT))
    .setNetworkId(NETWORK_ID)
    .createTransaction();

  const result = await CLIENT.local(unsignedTransaction, {
    preflight: false,
    signatureVerification: false,
  });

  if (result?.result?.status === "success") {
    return result.result.data
  } else {
    return result?.result?.error?.message
  }
}

export const transactionResult = async (unsignedTransaction) => {
  const result = await CLIENT.local(unsignedTransaction, {
    preflight: false,
    signatureVerification: false,
  });

  return result
}

export const getBattleHeroes = async () => {
  const transactionBuilder = Pact.modules[`${BATTLE_HEROES}`]['get-all-nfts']()

  return await requestResult(transactionBuilder)
}

export const getGenZero = async () => {
  const transactionBuilder = Pact.modules[`${GEN_0}`]['get-all-nfts']()

  return await requestResult(transactionBuilder)
}

export const getBattleHeroesOwnerTokens = async (account) => {
  const transactionBuilder = Pact.modules[`${BATTLE_HEROES}`]['get-nfts-by-owner'](account)

  return await requestResult(transactionBuilder)
}

export const getGenZeroOwnerTokens = async (account) => {
  const transactionBuilder = Pact.modules[`${GEN_0}`]['get-nfts-by-owner'](account)

  return await requestResult(transactionBuilder)
}

export const stakeBattleHeroes = async (account, tokens, wallet, contextData) => {
  const transactionBuilder = Pact.modules[`${BATTLE_HEROES}`]['stake-nfts'](tokens)
  const unsignedTransaction = Pact.builder
    .execution(transactionBuilder)
    .addSigner(accountKey(account), (withCapability) => [
      withCapability('coin.GAS'),
      withCapability(`${BATTLE_HEROES}.ACCOUNT-GUARD`, account),
    ])
    .setMeta(meta(account, 700 * tokens.length))
    .setNetworkId(NETWORK_ID)
    .createTransaction();

  const result = await walletProcessor(unsignedTransaction, transactionBuilder, account, BATTLE_HEROES, contextData, wallet, false, 700 * tokens.length)
  return result
}

export const stakeGenZero = async (account, tokens, wallet, contextData) => {
  const transactionBuilder = Pact.modules[`${GEN_0}`]['stake-nfts'](tokens)

  const unsignedTransaction = Pact.builder
    .execution(transactionBuilder)
    .addSigner(accountKey(account), (withCapability) => [
      withCapability('coin.GAS'),
      withCapability(`${GEN_0}.ACCOUNT-GUARD`, account),
    ])
    .setMeta(meta(account, 700 * tokens.length))
    .setNetworkId(NETWORK_ID)
    .createTransaction();

  const result = await walletProcessor(unsignedTransaction, transactionBuilder, account, GEN_0, contextData, wallet, false, 700 * tokens.length)
  return result
}

export const unstakeBattleHeroes = async (account, tokens, wallet, contextData) => {
  const transactionBuilder = Pact.modules[`${BATTLE_HEROES}`]['unlock-nfts'](tokens)

  const unsignedTransaction = Pact.builder
    .execution(transactionBuilder)
    .addSigner(accountKey(account), (withCapability) => [
      withCapability('coin.GAS'),
      withCapability(`${BATTLE_HEROES}.ACCOUNT-GUARD`, account),
    ])
    .setMeta(meta(account, 700 * tokens.length))
    .setNetworkId(NETWORK_ID)
    .createTransaction();

  const result = await walletProcessor(unsignedTransaction, transactionBuilder, account, BATTLE_HEROES, contextData, wallet, false, 700 * tokens.length)
  return result
}

export const unstakeGenZero = async (account, tokens, wallet, contextData) => {
  const transactionBuilder = Pact.modules[`${GEN_0}`]['unlock-nfts'](tokens)

  const unsignedTransaction = Pact.builder
    .execution(transactionBuilder)
    .addSigner(accountKey(account), (withCapability) => [
      withCapability('coin.GAS'),
      withCapability(`${GEN_0}.ACCOUNT-GUARD`, account),
    ])
    .setMeta(meta(account, 700 * tokens.length))
    .setNetworkId(NETWORK_ID)
    .createTransaction();

  const result = await walletProcessor(unsignedTransaction, transactionBuilder, account, GEN_0, contextData, wallet, false, 700 * tokens.length)
  return result
}

export const bhClaimRewards = async (account, tokens, wallet, contextData) => {
  const transactionBuilder = Pact.modules[`${BH_SGK_REWARDS}`]['claim-rewards'](account, tokens)

  const unsignedTransaction = Pact.builder
    .execution(transactionBuilder)
    .addSigner(accountKey(account), (withCapability) => [
      withCapability('coin.GAS'),
      withCapability(`${BH_SGK_REWARDS}.ACCOUNT_GUARD`, account),
      withCapability(`${BH_SGK_REWARDS}.REWARDS`, account, tokens),
      withCapability(`${ISOKO_ORCHESTRATOR}.MINT-BULK-REWARDS`, account, { int: tokens.length }),
    ])
    .addData("purpose", "bh-rewards")
    .setMeta(meta(account, 5000 * tokens.length))
    .setNetworkId(NETWORK_ID)
    .createTransaction();

  const data = { tokens: tokens, purpose: "bh-rewards" }

  const result = await walletProcessor(unsignedTransaction, transactionBuilder, account, BH_SGK_REWARDS, contextData, wallet, data, 5000 * tokens.length)
  return result
}

export const goClaimRewards = async (account, tokens, wallet, contextData) => {
  const transactionBuilder = Pact.modules[`${GO_SGK_REWARDS}`]['claim-rewards'](account, tokens)

  const unsignedTransaction = Pact.builder
    .execution(transactionBuilder)
    .addSigner(accountKey(account), (withCapability) => [
      withCapability('coin.GAS'),
      withCapability(`${GO_SGK_REWARDS}.ACCOUNT_GUARD`, account),
      withCapability(`${GO_SGK_REWARDS}.REWARDS`, account, tokens),
      withCapability(`${ISOKO_ORCHESTRATOR}.MINT-BULK-REWARDS`, account, { int: tokens.length }),
    ])
    .addData("purpose", "gen-0-rewards")
    .setMeta(meta(account, 5000 * tokens.length))
    .setNetworkId(NETWORK_ID)
    .createTransaction();

  const data = { tokens: tokens, purpose: "gen-0-rewards" }

  const result = await walletProcessor(unsignedTransaction, transactionBuilder, account, GO_SGK_REWARDS, contextData, wallet, data, 5000 * tokens.length)
  return result
}

export const getWeapons = async (account, weapon) => {
  const transactionBuilder = Pact.modules[`n_7d47538766e6f80008f253dccd30451f4d483c38.sgk-weapons-policy-${weapon}-1`]['get-nfts-by-owner'](account)
  return await requestResult(transactionBuilder)
}

export const getTokenRewards = async (token) => {
  const transactionBuilder = Pact.modules[`${BH_SGK_REWARDS}`]['get-token-rewards'](token)
  return await requestResult(transactionBuilder)
}

export const getBhClaimWeapons = async () => {
  const transactionBuilder = Pact.modules[`${BH_SGK_REWARDS}`]['get-count']('claim-count')
  return await requestResult(transactionBuilder)
}

export const getGenZeroClaimWeapons = async () => {
  const transactionBuilder = Pact.modules[`${GO_SGK_REWARDS}`]['get-count']('claim-count')
  return await requestResult(transactionBuilder)
}

export const getTokenDetails = async (token) => {
  const transactionBuilder = Pact.modules[`${MERMALADE}`]['get-policy-info'](token)
  return await requestResult(transactionBuilder)
}

export const getBhDetails = async (token) => {
  const transactionBuilder = Pact.modules[`${BATTLE_HEROES}`]['get-nfts-details'](token)
  return await requestResult(transactionBuilder)
}

export const getGenZeroDetails = async (token) => {
  const transactionBuilder = Pact.modules[`${GEN_0}`]['get-nfts-details'](token)
  return await requestResult(transactionBuilder)
}

export const getRewards = async (account) => {
  const transactionBuilder = Pact.modules[`${BH_SGK_REWARDS}`]['get-owner-rewards'](account)
  return await requestResult(transactionBuilder)
}

export const getBattleHeroesCreated = async () => {
  const transactionBuilder = Pact.modules[`${BATTLE_HEROES}`]['get-created-supply']()
  return await requestResult(transactionBuilder)
}

export const getGenZeroCreated = async () => {
  const transactionBuilder = Pact.modules[`${GEN_0}`]['get-created-supply']()
  return await requestResult(transactionBuilder)
}

export const getBattleHeroesStaked = async () => {
  const transactionBuilder = Pact.modules[`${BATTLE_HEROES}`]['get-staked-supply']()
  return await requestResult(transactionBuilder)
}

export const getGenZeroStaked = async () => {
  const transactionBuilder = Pact.modules[`${GEN_0}`]['get-staked-supply']()
  return await requestResult(transactionBuilder)
}

export const getBattleHeroesMinted = async () => {
  const transactionBuilder = Pact.modules[`${BATTLE_HEROES}`]['get-minted-supply']()
  return await requestResult(transactionBuilder)
}

export const getKDABalance = async (account) => {
  const transactionBuilder = Pact.modules['coin']['get-balance'](account)
  const unsignedTransaction = Pact.builder
    .execution(transactionBuilder)
    .addSigner(accountKey(account))
    .setMeta({ chainId: CHAIN_ID, senderAccount: account })
    .setNetworkId(NETWORK_ID)
    .createTransaction();

  const result = await CLIENT.local(unsignedTransaction, {
    preflight: false,
    signatureVerification: false,
  });

  return result
}

const walletProcessor = async (unsignedTransaction, transactionBuilder, account, contract, contextData, wallet, data, gLimit) => {
  const result = await transactionResult(unsignedTransaction)

  if (result?.result?.status === "success") {
    if (wallet == 'chainweaver') {
      const result = await apiCommandSigner(transactionBuilder, account, contract, data, gLimit)
      return result
    } else if (wallet == 'eckowallet') {
      const result = await eckowalletCommandSigner(unsignedTransaction, account)
      return result
    } else if (wallet == 'walletconnect') {
      const result = await signWithWalletConnect(unsignedTransaction, account, contextData, gLimit)
      return result
    } else if (wallet == 'zelcore') {
      openZelcore()
      const res = await apiCommandSigner(transactionBuilder, account, contract, data, gLimit)
      return res
    }
  } else {
    return { 'error': result?.result?.error?.message }
  }
}

export const chainweaverCommandSigner = async (unsignedTransaction) => {
  const signedTransaction = await signWithChainweaver(unsignedTransaction)

  if (isSignedTransaction(signedTransaction)) {
    console.log("signed Succesfully", signedTransaction)
    const transactionDescriptor = await CLIENT.submit(signedTransaction);
    const response = await CLIENT.listen(transactionDescriptor, {});
    console.log("finished sending tx", response)
    if (response.result.status === 'failure') {
      return response?.result?.error?.message
    } else {
      return response.reqKey
    }
  } else {
    return
  }
}

export const eckowalletCommandSigner = async (transactionBuilder, account) => {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Timeout exceeded'));
    }, 20000);
  });

  try {
    // Race between the actual function call and the timeout promise
    const response = await Promise.race([
      window.kadena.request({
        method: 'kda_requestQuickSign',
        data: {
          networkId: NETWORK_ID,
          commandSigDatas: [
            {
              sigs: [
                {
                  pubKey: accountKey(account),
                },
              ],
              cmd: transactionBuilder.cmd,
            },
          ],
        },
      }),
      timeoutPromise, // Timeout promise
    ]);

    if (response["status"] == "success") {
      transactionBuilder.sigs = [{ sig: response.responses[0].commandSigData.sigs[0].sig }];
      transactionBuilder.hash = response.responses[0].outcome.hash;

      if (isSignedTransaction(transactionBuilder)) {
        console.log("signed Succesfully", transactionBuilder)
        const transactionDescriptor = await CLIENT.submit(transactionBuilder);
        const result = await CLIENT.listen(transactionDescriptor, {});
        console.log("finished sending tx", result)
        if (result.result.status === 'failure') {
          return result?.result?.error?.message
        } else {
          return result.reqKey
        }
      } else {
        return
      }
    } else {
      return
    }
  } catch (error) {
    if (error.message === 'Timeout exceeded') {
      console.error('Timeout exceeded');
      return { error: 1 };
    } else {
      return error;
    }
  }
}

export const signWithWalletConnect = async (unsignedTransaction, account, contextData) => {
  const { client, session } = contextData

  const quicksignWithWalletConnect = createWalletConnectQuicksign(client, session, "kadena:mainnet01",);

  const signedPactCommand = await quicksignWithWalletConnect(unsignedTransaction);

  if (isSignedTransaction(signedPactCommand)) {
    const transactionDescriptor = await CLIENT.submit(signedPactCommand);
    const result = await CLIENT.listen(transactionDescriptor, {});

    if (result.result.status === 'failure') {
      return result?.result?.error?.message
    } else {
      return result.reqKey
    }
  } else {
    return
  }
}
