import React, { useState, useEffect } from "react";
import Wrapper from "../../layouts/Wrapper";
import { getBattleHeroesOwnerTokens } from "../../api/contract";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Staking = () => {
  const [tab, setTab] = useState("ready");
  const [_wallet, setWallet] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [tokens, setTokens] = useState([]);

  const { account, balance, wallet } = useSelector((state) => state.accountReducer);

  const getData = async () => {
    const _tokens = await getBattleHeroesOwnerTokens(account)
    _tokens?.length && setTokens()
  }

  useEffect(() => {
    if (account) {
      getData()
    }
  }, [account]);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth <= 768);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Wrapper>
      <div className="collection-page bg-black1 flex">
        <div className="wrap wrapWidth flex flex-col text-white my-5">
          <div style={{ fontSize: 40 }} className="tag text-center">SGK COLLECTIONS</div>
          <div className="row w-100 m-0 p-0 mt-2 mb-5">
            <div className="col-12 col-xl-4 col-lg-4 col-md-4 col-sm-3 p-3">
              <NavLink to={'/battle-heroes'} className="collection-item flex flex-col items-center nft-card glitter">
                <img src="/images/battle-heroes.jpeg" className="c-img" />
                <button className="button btn-stack">BATTLE HEROES</button>
              </NavLink>
            </div>
            <div className="col-12 col-xl-4 col-lg-4 col-md-4 col-sm-3 p-3">
              <NavLink to={'/gen-0'} className="collection-item flex flex-col items-center nft-card glitter">
                <img src="/images/gen0.png" className="c-img" />
                <button className="button btn-stack">GEN 0</button>
              </NavLink>
            </div>
            <div className="col-12 col-xl-4 col-lg-4 col-md-4 col-sm-3 p-3">
              <NavLink to={'/gen-1'} className="collection-item flex flex-col items-center nft-card glitter">
                <img src="/images/sgkgen1.jpg" className="c-img" />
                <button className="button btn-stack">GEN 1</button>
              </NavLink>
            </div>
            <div className="col-12 col-xl-4 col-lg-4 col-md-4 col-sm-3 p-3">
              <NavLink to={'/weapons-gears'} className="collection-item flex flex-col items-center nft-card glitter">
                <img src="/images/barbarian.jpg" className="c-img" />
                <button className="button btn-stack">Weapons/Gear</button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Staking;