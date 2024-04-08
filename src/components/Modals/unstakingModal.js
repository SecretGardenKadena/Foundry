import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import Notification from "../Alert/alert";

const UnstakingDialog = (props) => {
  const {
    title,
    tokens,
    unstakeTokens,
    closeModal,
    alert,
    alert_msg,
    unstaking,
    alert_type,
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
                  {unstaking ?
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
                            <p className="text-white">[{tokens.map((item, index) => {return(<span key={index}>{item} </span>)})}]</p>  
                            <p className="text-white">Are you sure you want to realease this NFT(s)?</p>  
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
                disabled={unstaking ? true : false}
                data-bs-dismiss="modal"
                onClick={unstakeTokens}
              >
                {unstaking ? 'Unstaking...' : 'Unstake'}
              </button>
            </div>
          : null }
        </div>
      </div>
    </div>
  );
};

export default UnstakingDialog;
