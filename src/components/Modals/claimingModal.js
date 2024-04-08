import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import Notification from "../Alert/alert";

const ClaimingDialog = (props) => {
  const {
    title,
    closeModal,
    claim,
    rewards,
    alert,
    alert_msg,
    claiming,
    alert_type,
    claim_tks,
  } = props;

  return (
    <div className="modal" tabIndex="-1" style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content custom-modal">
          <div className="modal-header">
            <h5 className="modal-title text-white">{title}</h5>
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
                  {claiming ?
                    <p className="text-white">Please wait transaction is processing....</p>
                  :
                    <>
                      {alert_type === 'success' ? 
                        <>
                          <p className="text-white">Transaction successful [#{alert_msg}]!</p>  
                          <p className="text-white">For more information about the transaction, click <a target="_blank" href={`https://explorer.chainweb.com/mainnet/tx/${alert_msg}`} style={{ color: 'red' }}>HERE</a></p>
                        </> 
                      : alert_type === 'error' ? 
                        <p className="text-white">{alert_msg}</p> 
                      : null}

                      {!alert ?
                          <>
                            <p className="text-white">Reward(s) ({rewards > 10 ? 10 : rewards})</p>  
                            <p className="text-white">Are you sure you want to claim your rewards?</p>  
                            {rewards > 10 &&
                              <p className="text-danger">Note: You can claim a max of 10 NFts at a time!</p>
                            }
                          </>
                        :
                          <Notification message={alert_msg} type={alert_type} />
                      }
                    </>
                  }
                  </div>
                </div>
              </div>
            
          </div>
          {alert_type !== 'success' ? 
            <div className="modal-footer">
              <button
                type="button"
                className="btn w-100 c-btn"
                disabled={claiming ? true : false}
                data-bs-dismiss="modal"
                onClick={() => claim(claim_tks)}
              >
                {claiming ? 'Claiming...' : 'Claim'}
              </button>
            </div>
          : null}
        </div>
      </div>
    </div>
  );
};

export default ClaimingDialog;
