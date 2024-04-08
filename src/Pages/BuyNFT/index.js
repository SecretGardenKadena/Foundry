import React, { useState } from "react";
import Wrapper from "../../layouts/Wrapper";

const BuyNFT = () => {
  return (
    <Wrapper>
      <div className="buy-nft-page bg-black1 h-screen flex">
        <div className="wrap wrapWidth flex text-white justify-content-center">
          <div className="col-12 col-lg-9 col-md-12">
            <div className="row w-100 m-0 p-0">
              <div className="col-12 col-lg-12">
                <div className="left-side flex flex-col">
                  <div className="bg"></div>
                  <div className="info flex flex-col">
                    <div className="tag">Buy nft</div>
                    <div className="desc text-center">
                      Choose your path gnomie. Pick which Secret Garden Gnome NFT you
                      want for your collection before diving deeper into the world of
                      Secret Garden.
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-12">
                <div className="right-side flex">
                  <div className="row">
                    <div className="col-12 col-lg-4 col-md-12 mb-4">
                      <img src="/images/buy-1.png" className="b-nft" />
                      <div className="nft-info flex flex-col">
                        <div className="tag">Battle Heroes</div>
                        <div className="desc">
                          Prepare to embark on an epic journey through the virtual realms with our exclusive Battle Heroes NFT Collection.
                        </div>
                        <a href="https://isoko.xyz/mint/secret_garden_of_kadena-sgk_battle_heroes/" target="_blank">
                          <button className="buy-btn button">Buy on Isoko</button>
                        </a>
                      </div>
                    </div>
                    <div className="col-12 col-lg-4 col-md-12 mb-4">
                      <img src="/images/buy-0.png" className="b-nft" />
                      <div className="nft-info flex flex-col">
                        <div className="tag">Gen 0</div>
                        <div className="desc">
                          A mystical place where Gnomes can be their true selves. Gnomes have lived undiscovered for centuries underground but with new technology, they are no longer safe there.
                        </div>
                        <a href="https://isoko.xyz/marketplace/secret_garden_of_kadena-secret_garden_of_kadena_gen_0/" target="_blank">
                          <button className="buy-btn button">Buy on Isoko</button>
                        </a>
                      </div>
                    </div>
                    <div className="col-12 col-lg-4 col-md-12 mb-4">
                      <img src="/images/buy-g-1.png" className="b-nft" />
                      <div className="nft-info flex flex-col">
                        <div className="tag">Gen 1</div>
                        <div className="desc">
                          The Secret Garden of Kadena is hidden deep in a lost cave. The gnomes discovered this mystical place and have devoted their lives to protecting it.
                        </div>
                        <a href="https://isoko.xyz/mint/secret_garden_of_kadena-secret_garden_of_kadena/" target="_blank">
                          <button className="buy-btn button">Buy on Isoko</button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </Wrapper>
  );
};

export default BuyNFT;
