import React, { useState, useEffect } from "react";
import { getTokenRewards, getTokenDetails, getBhDetails, getGenZeroDetails } from "../api/contract"

const StakeCard = ({token,check_staking,tokenId,check_claiming,type,_reward}) => {
    const [uri, setUri] = useState('')

    useEffect(() => {
        const _data = async (token) => {
            const get_details = await getTokenDetails(token)
            if(typeof get_details !== 'undefined' && 
                typeof get_details?.token !== 'undefined'){
                    if(get_details?.token?.manifest?.uri?.data !== ''){
                        setUri(get_details.token.manifest.uri.data)
                    }else if(typeof get_details?.token?.manifest?.data[0]?.datum?.image !== 'undefined'){
                        setUri(get_details.token.manifest.data[0].datum.image)
                    }
            }
            
        }
        _data(token['token-id'])
    }, [])

    return(
        <div className="ready-stake-item flex flex-col nft-card">
            <div className="id-sec flex items-center">
                <div className="id">#{tokenId}</div>
                <div className="status">Ready</div>
            </div>
            <img src={uri} className="w-100" />
            <div className="card-info flex flex-col">
                <div className="name">Claim Reward</div>
                <div className="time">Every {type == 'bh' ? 10 : 7} days</div>
            </div>
            <button onClick={() => check_staking([token])} className="btn button">Stake</button>
            {/* <button onClick={() => check_claiming([token['token-id']],_reward.count)} className="btn-claim button mt-3">
                Claim {_reward.count} Weapon(s)
            </button> */}
        </div>
    )
}

export default StakeCard