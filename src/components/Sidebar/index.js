import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../../store/reducers/globalReducer";
import { setAccount, setBalance, setWallet, setWcSession } from "../../store/reducers/accountReducer";
import ConnectWalletDialog from "../Modals/connectWallet";
import DisconnectWalletDialog from "../Modals/disconnectWallet";
import { connectChainweaver, checkEckoWallet, connectEckoWallet, disconnectEckoWallet } from "../../utils/wallets";
import { getKDABalance } from "../../api/contract";
import ClientContextProvider from '../../providers/ClientContextProvider';
import ZelcoreContextProvider from '../../providers/ZelcoreContextProvider';
import PendingTxCard from "../pending-tx/PendingTxCard";
import Connected from '../../connection/Connected'


const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [_disconnect, setDisconnect] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showAccounts, setShowAccounts] = useState(false);
  const [tempaccount, setTempaccount] = useState(null);
  const [walletType, setWalletType] = useState(null);
  const [_account, _setAccount] = useState(null);
  const [_balance, _setBalance] = useState(0.00);

  const contextData = ClientContextProvider()

  const { session, connect, disconnect, isInitializing, accounts, setConnected } = contextData;
  const { _accounts, connect_zelcore, isGettingAddress } = ZelcoreContextProvider();

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { openSidebar } = useSelector((state) => state.globalReducer);
  const { account, balance, wallet } = useSelector((state) => state.accountReducer);

  useEffect(() => {
    const getData = async () => {
      if (account) {
        _setAccount(account)
        const response = await getKDABalance(account)

        if (response.result.status == 'success') {
          dispatch(setBalance(response.result.data));
          _setBalance(response.data)
        }
      }
    }

    getData()
  }, [])

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setConnecting(false)
    setWalletType(null)
    setIsConnecting(false)
    setShowAccounts(false)
    setDisconnecting(false)
    setDisconnect(false)
  };

  const modalBack = async () => {
    setWalletType(null)
  }

  const connectWallet = async () => {
    let _connect = false

    if (walletType == 'chainweaver') {
      if (!tempaccount) {
        alert('Please connect your wallet to continue.')
      } else {
        const resp_balance = await getKDABalance(tempaccount)

        if (resp_balance.result.status == 'success') {
          dispatch(setBalance(resp_balance.result.data));
          setBalance(resp_balance.data)
          dispatch(setAccount(tempaccount));
          _setAccount(tempaccount)
          _connect = true
        } else {
          alert('Connection unsuccessfull, plese check your wallet.')
          closeModal()
        }
      }
    } else if (walletType == 'eckowallet') {
      setIsConnecting(true)
      const response = await checkEckoWallet()

      if (response) {
        const connect_ecko = await connectEckoWallet();
        if (connect_ecko.status == 'success') {
          dispatch(setAccount(connect_ecko.account.account));
          _setAccount(connect_ecko.account.account)
          const resp_balance = await getKDABalance(connect_ecko.account.account)

          if (resp_balance?.result?.status == 'success') {
            dispatch(setBalance(resp_balance?.result.data));
            setBalance(resp_balance.data)
          }
          _connect = true
        } else {
          alert('Connection unsuccessfull, plese check your wallet.')
          closeModal()
        }
      } else {
        alert('Please make sure X-wallet/Eckowallet is intalled.')
      }
    } else if (walletType == 'walletconnect') {
      setIsModalOpen(false);
      const resp = await connect();
      if (resp === "success") {
        setShowAccounts(true)
        openModal()
      }
    }

    if (_connect) {
      dispatch(setWallet(walletType));
      alert('Connection successful!!')
      setIsModalOpen(false)
      setConnecting(false)
    }

  }

  const selectAccount = async (__account) => {
    dispatch(setAccount(__account));
    dispatch(setWcSession(session));
    dispatch(setWallet(walletType));
    _setAccount(__account)
    const resp_balance = await getKDABalance(__account)

    if (resp_balance.status == 'success') {
      dispatch(setBalance(resp_balance.data));
      setBalance(resp_balance.data)
    }
    setConnected(true)
    dispatch(setWallet(walletType));
    alert('Connection Successful')
    closeModal()
    window.location.reload()
  }

  const disconnect_wallet = async () => {
    closeModal()
    setDisconnecting(true)
    dispatch(setAccount(''));
    dispatch(setWallet(''));
    dispatch(setBalance(0));

    if (wallet == 'eckowallet') {
      await disconnectEckoWallet()
    } else if (wallet === 'walletconnect') {
      disconnect()
    }

    window.location.reload()
  }

  const navBarItems = [
    { lbl: "Dashboard", slug: "/dashboard", icon: "/images/dashboard-page/stats-1.png" },
    { lbl: "Home", slug: "/home", icon: "/images/sgk/1.png" },
    { lbl: "Buy Weapon", slug: "/", icon: "/images/sgk/2.png", },
    // { lbl: "Collection", slug: "/collection",icon: "/images/sgk/3.png" },
    { lbl: "Buy NFT", slug: "/buynft", icon: "/images/sgk/4.png" },
    { lbl: "Armory", slug: "/armory", icon: "/images/weapons/1.png" },
    { lbl: "Foundry", slug: "/foundry", icon: "/images/dashboard-page/stats-2.png" },
  ];

  const connect_wallet = async () => {
    setConnecting(true)
    openModal()
  }

  const d_wallet = () => {
    setDisconnect(true)
    setDisconnecting(true)
  }

  const pendingTxs = [
    { tag: 'Burn Weapons #456 & #450', time: 4 },
    { tag: 'Stake en 0 Gnomes', time: 6 }
  ]

  useEffect(() => {
    document.body.addEventListener("click", () => {
      document.body.style.overflowY = "auto";
      setOpenSidebar(false);
    });
  }, []);

  return (
    <>
      <div
        style={{ zIndex: 1 }}
        className={`sidebar-s fixed rel anim hidden ${openSidebar ? "full-open" : ""}`}
        id="sidebar"
      >
        <div
          className={`side-block scrollable-div bg-black1 flex col anim ${openSidebar ? "full-open" : ""
            }`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            className={`hdr flex items-center justify-center ${openSidebar ? "" : "center"
              }`}
          >
            {openSidebar && <img src="/images/logo.png" className="logo-img" />}
          </div>
          <div className="items flex aic flex-col">
            <>
              {navBarItems.map((item, index) => (
                item.lbl === "Home" ?
                  <a
                    href="https://www.sgkgaming.com"
                    className="list-item flex text-center"
                    style={{ textDecoration: 'none' }}
                    target="_blank"
                  >
                    {openSidebar && (
                      <div style={{ display: 'flex' }} className="ml-3 li cfff font nav-wrapper">
                        <img className="nav-icon mt-2" src={item.icon} />
                        <div className="nav-item-wrapper">
                          {item.lbl}
                        </div>
                      </div>
                    )}
                  </a>
                  :
                  <NavLink
                    to={item.slug}
                    key={index}
                    className="list-item flex text-center"
                    style={{ textDecoration: 'none' }}
                  >
                    {openSidebar && (
                      <div style={{ display: 'flex' }} className="ml-3 li cfff font nav-wrapper">
                        <img className="nav-icon mt-2" src={item.icon} />
                        <div className="nav-item-wrapper">
                          {item.lbl}
                        </div>
                      </div>
                    )}
                  </NavLink>
              ))}
            </>
            <div className="flex text-center w-full mt-5 custom-cursor">
              <button className="btn btn-1 w-full text-white">
                KDA {balance !== null ? balance.toFixed(2) : 0.0}
              </button>
            </div>
            <div className="flex text-center w-full mt-2">
              <button
                onClick={() => !_account ? connect_wallet() : d_wallet()}
                className="button-92 w-full text-black"
              >
                {disconnecting ?
                  'Disconnecting...'
                  : connecting ?
                    'Connecting...'
                    :
                    <>{!_account ? 'Connect [8]' : account !== null ? account.substr(0, 3) + 'xxx' + account.substr(60, 62) : 'Connect'}</>
                }

              </button>
            </div>

            <Connected>
              <div className="mt-4 p-2">
                <PendingTxCard items={pendingTxs} />
              </div>
            </Connected>
          </div>
        </div>
        {
          isModalOpen && (
            <ConnectWalletDialog
              title="Connect Wallet"
              closeModal={closeModal}
              walletType={walletType}
              setWalletType={setWalletType}
              connectWallet={connectWallet}
              modalBack={modalBack}
              setTempaccount={setTempaccount}
              isInitializing={isInitializing}
              showAccounts={showAccounts}
              accounts={accounts}
              selectAccount={selectAccount}
              _accounts={_accounts}
              connect_zelcore={connect_zelcore}
              isGettingAddress={isGettingAddress}
              isConnecting={isConnecting}
            />
          )
        }

        {
          _disconnect &&
          <DisconnectWalletDialog
            title="Disconnect Wallet"
            closeModal={closeModal}
            disconnect_wallet={disconnect_wallet}
          />
        }
      </div>
    </>
  );
};

export default Sidebar;
