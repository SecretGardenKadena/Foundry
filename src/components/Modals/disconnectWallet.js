import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";

const DisconnectWalletDialog = (props) => {
  const {
    title,
    closeModal,
    disconnect_wallet,
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
                  <p className="text-white">Are you sure you want to disconnect your wallet?</p>
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
              No
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={disconnect_wallet}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisconnectWalletDialog;
