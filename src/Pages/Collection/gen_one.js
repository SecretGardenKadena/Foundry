import React, { useState, useEffect } from "react";
import Wrapper from "../../layouts/Wrapper";

const GenOne = () => {

  return (
    <Wrapper>
      <div className="lading-page bg-black1 h-screen flex">
        <div className="wrap wrapWidth flex flex-col text-white">
            <div style={{fontSize: 40}} className="tag text-center">SGK GEN 1</div>
            <div className="row justify-content-center">
                <div className="col-10">
                    <p className="text-center">
                    The Secret Garden of Kadena is hidden deep in a lost cave. 
                    The gnomes discovered this mystical place and have devoted their lives to 
                    protecting it. For their good deeds, the garden has accepted them, but the 
                    gnomes know it’s only a matter of time before they have to defend it. 
                    SGK is a multi-game and NFT project building on Kadena and running on FLUX. 
                    SGK is building incredibly fun games from the most popular gaming genres. 
                    Free to play and P2E!
                    </p>
                </div>
            </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default GenOne;
