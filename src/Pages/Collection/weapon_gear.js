import React, { useState, useEffect } from "react";
import Wrapper from "../../layouts/Wrapper";
import { useSelector } from "react-redux";
import { getWeapons, getTokenDetails } from "../../api/contract";
import LoadingAnimation from "../../components/_Loader";

const WeaponGears = () => {
  const [weapons, setWeapons] = useState([]);
  const [loader, setLoader] = useState(false);

  const { account } = useSelector((state) => state.accountReducer);

  useEffect(() => {
    const gData = async () => {
      if(account){
        let weapons_tks = []
        setLoader(true)
        for(let i = 1; i < 33; i++){
          const __weapons = await getWeapons(account,i);
          if(__weapons?.length > 0){
            await Promise.all(__weapons.map(async (item) => {
              let uri = ''
              const get_details = await getTokenDetails(item['token-id'])
              if(get_details?.token?.manifest?.uri?.data !== ''){
                uri = get_details.token.manifest.uri.data
              }else if(typeof get_details?.token?.manifest?.data[0]?.datum?.image !== 'undefined'){
                uri = get_details.token.manifest.data[0].datum.image
              }
              weapons_tks.push({token: item['token-id'], uri: uri})
            }))
            //
          }
        }
        setLoader(false)
        setWeapons(weapons_tks)
      }
    }

    gData()
  }, [account]);

  return (
    <Wrapper>
      <div className="lading-page bg-black1 h-screen flex">
        <div className="wrap wrapWidth flex flex-col text-white">
          <div style={{fontSize: 40}} className="tag text-center">SGK WEAPONS/GEAR</div>

          {loader ? 
            <LoadingAnimation />
          : 
            <div className="row w-100 m-0 p-0">
              <div className="col-12">
                <div className="ready-stake-section flex flex-col">
                  <div className="row">
                    <div className="col-12 ready-stake-grid">
                      {weapons.map((item,key) => {
                        return(
                          <div key={key} className="ready-stake-item flex flex-col nft-card">
                            <img src={item.uri} className="w-100" />
                            <button className="btn button mt-4">{item.token}</button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          
        </div>
      </div>
    </Wrapper>
  );
};

export default WeaponGears;
