import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { WalletConnectModal } from '@walletconnect/modal';
import Client from '@walletconnect/sign-client';
import { getSdkError } from '@walletconnect/utils';

const ClientContextProvider = () => {
  const [signingType, setSigningType] = useState('sign')
  const [client, setClient] = useState();
  const [pairings, setPairings] = useState([]);
  const [session, setSession] = useState();
  const [accounts, setAccounts] = useState();
  const [isInitializing, setIsInitializing] = useState(false);
  const [showAccounts, setShowAccounts] = useState(false);
  const [connected, setConnected] = useState(false);

  const onSessionConnected = useCallback(async (_session) => {
    setSession(_session);
    setAccounts(_session?.namespaces?.kadena?.accounts);
    setShowAccounts(true)
  }, []);  

  const closeShowAccounts = () => {
    setShowAccounts(false)
  }

  const walletConnectModal = new WalletConnectModal({
    projectId: process.env.REACT_APP_PUBLIC_PROJECT_ID,
    themeMode: 'light',
  });

  const reset = () => {
    setSession(undefined);
  };

  const disconnect = useCallback(async () => {
    if (typeof client === 'undefined') {
      throw new Error('WalletConnect is not initialized');
    }
    if (typeof session === 'undefined') {
      throw new Error('Session is not connected');
    }

    try {
      await client.disconnect({
        topic: session.topic,
        reason: getSdkError('USER_DISCONNECTED'),
      });
    } catch (error) {
    } finally {
      // Reset app state after disconnect.
      reset();
    }
  }, [client, session]);

  const connect = useCallback(
    async (pairing) => {
      if (typeof client === 'undefined') {
        throw new Error('WalletConnect is not initialized');
      }
      try {
        const { uri, approval } = await client.connect({
          pairingTopic: pairing?.topic,

          requiredNamespaces: {
            kadena: {
              methods: [
                'kadena_getAccounts_v1',
                'kadena_sign_v1',
                'kadena_quicksign_v1',
              ],
              chains: [
                'kadena:mainnet01',
                'kadena:testnet04',
                'kadena:development',
              ],
              events: [],
            },
          },
        });

        // Open QRCode modal if a URI was returned (i.e. we're not connecting an existing pairing).
        if (uri) {
          walletConnectModal.openModal({ uri });
        }

        const session = await approval();
        await onSessionConnected(session);
        setPairings(client.pairing.getAll({ active: true }));
      } catch (e) {
        console.error(e);
        // ignore rejection
      } finally {
        // close modal in case it was open
        walletConnectModal.closeModal();
        return "success"
      }
    },
    [client, onSessionConnected],
  );

  const _subscribeToEvents = useCallback(
    async (_client) => {
      if (typeof _client === 'undefined') {
        throw new Error('WalletConnect is not initialized');
      }

      _client.on('session_ping', (args) => {
        //console.log('EVENT', 'session_ping', args);
      });

      _client.on('session_event', (args) => {
        //console.log('EVENT', 'session_event', args);
      });

      _client.on('session_update', ({ topic, params }) => {
        //console.log('EVENT', 'session_update', { topic, params });
        const { namespaces } = params;
        const _session = _client.session.get(topic);
        const updatedSession = { ..._session, namespaces };
        onSessionConnected(updatedSession);
      });

      _client.on('session_delete', () => {
        //console.log('EVENT', 'session_delete');
        reset();
      });
    },
    [onSessionConnected],
  );

  const _checkPersistedState = useCallback(
    async (_client) => {
      if (typeof _client === 'undefined') {
        throw new Error('WalletConnect is not initialized');
      }
      // populates existing pairings to state
      setPairings(_client.pairing.getAll({ active: true }));
      /* console.log(
        'RESTORED PAIRINGS: ',
        _client.pairing.getAll({ active: true }),
      ); */

      if (typeof session !== 'undefined') return;
      // populates (the last) existing session to state
      if (_client.session.length) {
        const lastKeyIndex = _client.session.keys.length - 1;
        const _session = _client.session.get(
          _client.session.keys[lastKeyIndex],
        );
        //console.log('RESTORED SESSION:', _session);
        await onSessionConnected(_session);
        return _session;
      }
    },
    [session, onSessionConnected],
  );

  const createClient = useCallback(async () => {
    try {
      setIsInitializing(true);

      const _client = await Client.init({
        relayUrl: process.env.REACT_APP_PUBLIC_RELAY_URL,
        projectId: process.env.REACT_APP_PUBLIC_PROJECT_ID,
      });

      //console.log('CREATED CLIENT: ', _client);
      setClient(_client);
      await _subscribeToEvents(_client);
      await _checkPersistedState(_client);
    } catch (err) {
      throw err;
    } finally {
      setIsInitializing(false);
    }
  }, [_checkPersistedState, _subscribeToEvents]);

  useEffect(() => {
    if (!client) {
      createClient();
    }
  }, [client, createClient]);

  return { connect, disconnect, isInitializing, session, accounts, signingType, showAccounts, closeShowAccounts, setConnected, client, setShowAccounts }
}

export default ClientContextProvider