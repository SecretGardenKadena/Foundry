import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const navBarItems = [
    { lbl: "Home", slug: "/home"},
    {lbl: "Foundry",slug: "/"},
    {lbl: "Buy NFT",slug: "/buynft"},
  ];

  return (
    <div className="footer-comp flex flex-col">
      <div className="wrapWidth wrap flex flex-col">
        <div className="top-part flex">
          <div className="row w-100 m-0 p-0">
            <div className="col-12 col-lg-6 top-left flex flex-col">
              <div className="row w-100 m-0 p-0">
                <div className="col-12 d-flex justify-content-center justify-content-lg-start align-items-center"><img src="/images/logo.png" className="logo-img" /></div>
                <div className="col-12 about-proj flex flex-col">
                  <h1 className="proj-name text-center text-lg-start">Secret Garden of KDA</h1>
                  <p className="proj-desc text-center text-lg-start">
                    A web3 NFT and gaming ecosystem building on the Kadena and Flux
                    blockchains.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 mt-lg-5">
              <div className="top-center flex d-flex justify-center justify-content-lg-end mt-lg-0">
                <div className="menu-list flex flex-col">
                  {navBarItems.map((item, key) => {
                    return(
                      <NavLink to={item.slug} key={key} className="menu-item">{item.lbl}</NavLink>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="col-12 mt-lg-3">
              <div className="top-right flex items-start justify-center mt-5 mt-lg-0">
                <div className="social flex items-center">
                  <a href="">
                    <img src="/images/twitter.svg" className="ico" />
                  </a>
                  <a href="">
                    <img src="/images/discord.svg" className="ico" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="btm-part flex flex-col items-center justify-center">
          <center>
            <div className="copy-right">
              Copyright 2023 K2 Creative LLC - All rights reserved
            </div>
            <div className="developed-by flex items-center">
              <span>
                <img src="/images/teachfleet.svg" className="c-logo mr-2" />
              </span>
              
              <a href="https://techfleet.org/" target="_blank" className="c-name cursor-pointer ml-2">
                Made with love by Tech Fleet
              </a>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
};

export default Footer;
