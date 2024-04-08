import React, { useState, useEffect } from "react";
import Wrapper from "../../layouts/Wrapper";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getBattleHeroesCreated, getBattleHeroesStaked, getGenZeroCreated, getGenZeroStaked, getBhClaimWeapons, getGenZeroClaimWeapons, 
  getWeapons
} from "../../api/contract";
import LoadingAnimation from "../../components/_Loader";

const Main = () => {
  const [tab, setTab] = useState("ready");
  const [wallet, setWallet] = useState(false);
  const [battle_heroes, setBattleheroes] = useState({});
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [bh_created, setBhCreated] = useState(0);
  const [bh_staked, setBhStaked] = useState(0);
  const [g_created, setGenCreated] = useState(0);
  const [g_staked, setGenStaked] = useState(0);
  const [bh_weapons, setBhweapons] = useState(0);
  const [g_weapons, setGweapons] = useState(0);
  const [weapons, setWeapons] = useState(0);
  const [loader, setLoader] = useState(false);

  const { account } = useSelector((state) => state.accountReducer);

  const getData = async () => {
    const created = await getBattleHeroesCreated()
    const staked = await getBattleHeroesStaked()
    const g_created = await getGenZeroCreated()
    const g_staked = await getGenZeroStaked()
    const _bh_weapon = await getBhClaimWeapons()
    const _g_weapon = await getGenZeroClaimWeapons()

    _bh_weapon >= 0 && setBhweapons(_bh_weapon)
    _g_weapon >= 0 && setGweapons(_g_weapon)
    created >= 0 && setBhCreated(created)
    staked >= 0 && setBhStaked(staked)
    g_created >= 0 && setGenCreated(created)
    g_staked >= 0 && setGenStaked(g_staked)
  }

  useEffect(() => {
    getData()
  }, []);

  useEffect(() => {
    const ddata = async () => {
      if(account){
        let weapons_count = 0
        setLoader(true)
        for(let i = 1; i < 33; i++){
          const __weapons = await getWeapons(account,i);
          if(__weapons?.length > 0){
            weapons_count += __weapons?.length
          }
        }
        setLoader(false)
        setWeapons(weapons_count)
      }
    }

    ddata()
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
      <div className="lading-page bg-black1 h-screen flex">
        <div className="wrap wrapWidth flex flex-col text-white">
          <div className="row w-100 m-0 p-0">
            <div className="col-12">
              <div className="hero-section flex">
                <div className="row w-100 p-0 mx-0 justify-content-center">
                  <div className="col-12 col-lg-6">
                    <div className="hero-left col-12 flex flex-col">
                      <div className="sec-title animated-heading">foundry</div>
                      <div className="sec-desc">
                        Stake your NFTs for weapons/gear NFT rewards that are usable in Battle Blox Heroes. 
                        Gen 0 gets an NFT every 7 days and the Battle Heroes gets an NFT every 10 days,
                        claim rewards directly to your wallet.
                      </div>
                      <div className="nfts-grid d-grid">
                        <div className="grid-item flex flex-col items-center">
                          <img src="/images/axe.svg" className="img swing-axe" />
                          <div className="numb">{bh_staked} / {bh_created}</div>
                          <div className="name">Battle Heroes Staked</div>
                        </div>
                        <div className="grid-item flex flex-col items-center">
                          <img src="/images/b1.png" className="img animate-up-down" />
                          <div className="numb">{g_staked} / 1050</div>
                          <div className="name">Gnomes 0 Staked</div>
                        </div>
                        <div className="grid-item flex flex-col items-center">
                          <img src="/images/sgk/1.png" className="img wand" />
                          <div className="numb">{bh_weapons + g_weapons} / 320,000</div>
                          <div className="name">Weapons/Gear Minted</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 d-none d-lg-block">
                    <div className="hero-right col-12 flex items-center justify-center">
                      {/* <div className="bg"></div> */}
                      <img className="mt-lg-5" src="/images/sgk.gif" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row w-100 m-0 p-0">
            <div className="col-12">
              <div className="staking-grid d-lg-grid w-100 row p-0 mx-0 justify-content-center">
                <NavLink to={'/battle-heroes'} className="col-12 col-lg-4 glitter nft-card stake-item flex flex-col items-center justify-between h-auto">
                    <div className="desc flex items-start">
                        <p className="collec-desc">
                          Prepare to embark on an epic journey through the virtual realms with our exclusive Battle Heroes NFT Collection.
                        </p>
                    </div>
                    <img src="/images/battle-heroes.jpeg" className="c-img" />
                    <button to={'/gen-0'} className="button btn-stack">Stake NFTs</button>
                </NavLink>

                <NavLink to={'/gen-0'} className="col-12 col-lg-4 glitter nft-card stake-item flex flex-col items-center justify-between h-auto">
                  <div className="desc flex items-start">
                    <p className="collec-desc">
                    A mystical place where Gnomes can be their true selves. 
                    </p>
                  </div>
                  <img src="/images/gen0.png" className="c-img" />
                  <button to={'/gen-0'} className="button btn-stack">Stake NFTs</button>
                </NavLink>

                <NavLink to={'/weapons-gears'} className="col-12 col-lg-4 glitter nft-card stake-item flex flex-col items-center justify-between h-auto">
                  <div className="desc flex items-start">
                    <p className="collec-desc">
                    Your SGK rewards 
                    </p>
                  </div>
                  <img src="/images/barbarian.jpg" className="c-img" />
                  {loader ? <LoadingAnimation /> : <button className="button btn-stack">{weapons} WEAPON(S)</button>}
                  
                </NavLink>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Wrapper>
  );
};

export default Main;
