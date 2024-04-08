import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";

const ConnectWalletDialog = (props) => {
  const {
    title,
    closeModal,
    walletType,
    setWalletType,
    modalBack,
    connectWallet,
    setTempaccount,
    isInitializing,
    showAccounts,
    accounts,
    selectAccount,
    connect_zelcore,
    _accounts,
    isGettingAddress,
    isConnecting,
  } = props;

  function getLast64Characters(str) {
    return str.substring(str.length - 64);
  }
  const [account, setAccount] = useState("")

  return (
    <div className="modal" tabIndex="-1" style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content custom-modal">
          <div className="modal-header">
            <h5 className="modal-title text-white d-flex">
              <img style={{ width: 40, height: 40}} src="/images/f1.gif" /> {title}
            </h5>
            <button
              type="button"
              className="btn-close text-white"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
              style={{backgroundColor: 'white'}}
            ></button>
          </div>
          <div
            className="modal-body"
            style={{
              maxHeight: "calc(100vh - 200px)",
              overflowY: "auto",
            }}
          >
            <div className="">
              <div className="body">
                <div className="row p-2">
                  { showAccounts ? 
                    <div className="col-12">
                      <select onChange={e => setAccount(e.target.value)} className="form-control mb-2">
                        <option selected disabled>Please select account</option>
                        {accounts.map((account, key) => {
                          return(
                            <option value={account} key={key}>{account}</option>
                          )})
                        }
                      </select>
                      <button
                        className="w-100 address-input-button"
                        onClick={() => selectAccount('k:' + getLast64Characters(account))}
                      >
                        Connect ({account ? account.substr(0, 15) + 'xxx' + account.substr(60, 62) : 'account'})
                      </button>
                    </div>
                  : _accounts.length > 0 ?
                    <div className="col-12">
                      <select onChange={e => setAccount(e.target.value)} className="form-control mb-2">
                        <option selected disabled>Please select account</option>
                        {_accounts.map((account, key) => {
                          return(
                            <option value={account} key={key}>{account}</option>
                          )})
                        }
                      </select>
                      <button
                        className="w-100 address-input-button"
                        onClick={() => selectAccount('k:' + getLast64Characters(account))}
                      >
                        Connect ({account ? account.substr(0, 15) + 'xxx' + account.substr(60, 62) : 'account'})
                      </button>
                    </div>
                  : 
                    <>
                      {walletType == null && (
                        <>
                          <div className="col-12" onClick={() => setWalletType("chainweaver")}>
                            <div className="wallet button-85">
                                <div className="wallet-content">
                                    <img
                                    className="wallet-img"
                                    src="/images/chainweaver.png"
                                    alt=""
                                    />
                                    <span className="wallet-text">Chainweaver</span>
                                </div>
                                <div className="fire-animate ms-auto mr-3">
                                  <img src="/images/sgk/2.png" className="move-right-left"/>
                                </div>
                            </div>
                          </div>

                          <div className="col-12" onClick={() => setWalletType("eckowallet")}>
                            <div className="wallet button-85">
                                <div className="wallet-content">
                                  <img
                                      className="wallet-img"
                                      src="/images/eckowallet.png"
                                      alt=""
                                  />
                                  <span className="wallet-text">EckoWallet</span>
                                </div>
                                <div className="fire-animate ms-auto mr-3">
                                  <img src="/images/sgk/2.png" className="move-right-left"/>
                                </div>
                            </div>
                          </div>

                          <div className="col-12" onClick={() => setWalletType("walletconnect")}>
                            <div className="wallet button-85">
                                <div className="wallet-content">
                                    <img
                                        className="wallet-img"
                                        src="/images/walletconnect.png"
                                        alt=""
                                    />
                                    <span className="wallet-text">WalletConnect</span>
                                </div>
                                <div className="fire-animate ms-auto mr-3">
                                  <img src="/images/sgk/2.png" className="move-right-left"/>
                                </div>
                            </div>
                          </div>

                          <div className="col-12" onClick={() => setWalletType("zelcore")}>
                            <div className="wallet button-85">
                                <div className="wallet-content">
                                    <img
                                        className="wallet-img"
                                        src="/images/zelcore.png"
                                        alt=""
                                    />
                                    <span className="wallet-text">Zelcore</span>
                                </div>
                                <div className="fire-animate ms-auto mr-3">
                                  <img src="/images/sgk/2.png" className="move-right-left"/>
                                </div>
                            </div>
                          </div>
                        </>
                      )}

                      {walletType == "chainweaver" && (
                        <>
                          <div className="col-12">
                            <button
                              onClick={() => modalBack()}
                              style={{
                                background: "green",
                                color: "white",
                                border: "none",
                              }}
                            >
                              <BiArrowBack size={24} />
                            </button>

                            <div className="address-input">
                                <label className="input-label text-white">Wallet Address</label>
                                <div className="input-container">
                                    <input
                                    className="address-input-field"
                                    onChange={(e) => setTempaccount(e.target.value)}
                                    placeholder="Enter your wallet address"
                                    />
                                    <button
                                        className="address-input-button"
                                        onClick={connectWallet}
                                    >
                                    Connect
                                    </button>
                                </div>
                            </div>

                            <h6 className="text-white">
                              Please enter your chainweaver wallet address to
                              connect.
                            </h6>
                            <p className="text-white mt-5"><span className="text-danger">NOTE: </span>When submitting a transaction, Chainweaver will show you a preview within the wallet before signing.</p>
                          </div>
                        </>
                      )}

                      {walletType == "eckowallet" && (
                        <div className="col-12">
                          <button
                            onClick={() => modalBack()}
                            style={{
                              background: "green",
                              color: "white",
                              border: "none",
                            }}
                          >
                            <BiArrowBack size={18} />
                          </button>
                          <button
                            className="w-100 address-input-button"
                            onClick={connectWallet}
                          >
                            {isConnecting ? 'Connecting....' : 'Connect'}
                          </button>
                        </div>
                      )}

                      {walletType == "walletconnect" && (
                        <div className="col-12">
                          <button
                            onClick={() => modalBack()}
                            style={{
                              background: "green",
                              color: "white",
                              border: "none",
                            }}
                          >
                            <BiArrowBack size={18} />
                          </button>
                          <button
                            className="w-100 address-input-button"
                            onClick={connectWallet}
                            disabled={isInitializing}
                          >
                            {isInitializing ? 'Initializing...' : 'Connect'}
                          </button>
                          <p className="text-white mt-5"><span className="text-danger">NOTE: </span>When submitting a transaction, The connected wallet app will show you a preview within the wallet before signing.</p>
                        </div>
                      )}

                      {walletType == "zelcore" && (
                        <div className="col-12">
                          <button
                            onClick={() => modalBack()}
                            style={{
                              background: "green",
                              color: "white",
                              border: "none",
                            }}
                          >
                            <BiArrowBack size={18} />
                          </button>
                          <button
                            className="w-100 address-input-button"
                            onClick={connect_zelcore}
                            disabled={isGettingAddress}
                          >
                            {isGettingAddress ? 'Fetching Accounts.....' : 'connect'}
                          </button>

                          <p className="text-white mt-5"><span className="text-danger">NOTE: </span>When submitting a transaction, Zelcore will show you a preview within the wallet before signing.</p>
                        </div>
                      )}
                    </>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletDialog;
