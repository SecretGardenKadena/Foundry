import React, { useState, useEffect } from "react";
import CountdownTimer from "./CountdownTimer";
import { getTokenRewards, getBhDetails, getGenZeroDetails,getTokenDetails } from "../api/contract"

const StakedCard = ({item,check_unstaking,tokenId,check_claiming,type,_reward}) => {
    const [uri, setUri] = useState('')

    useEffect(() => {
        
        const getData = async (token) => {
            const get_details = await getTokenDetails(token)
            if(typeof get_details !== 'undefined' && 
                typeof get_details.token !== 'undefined'){
                    if(get_details.token.manifest.uri.data !== ''){
                        setUri(get_details.token.manifest.uri.data)
                    }else if(typeof get_details.token.manifest.data[0].datum.image !== 'undefined'){
                        setUri(get_details.token.manifest.data[0].datum.image)
                    }
            }
        }
        getData(item['token-id'])
    }, [])

    return(
        <div className="ready-staked-item flex flex-col nft-card">
            <div className="id-sec flex items-center">
                <div className="id">#{tokenId}</div>
                <div className="status">Staked</div>
            </div>
            <img src={uri} className="w-100" />
            {_reward.date !== '' &&
                <div className="card-info flex flex-col">
                    <div className="name">Next Reward</div>
                    <div className="time">
                        <CountdownTimer nDays={type == 'bh' ? 10 : type == 'gen-zero' ? 7 : null} tDate={_reward.date} />
                    </div>
                </div>
            }
            
            <button onClick={() => check_unstaking([item])} className="btn button">Unstake</button>
            <button onClick={() => check_claiming([item['token-id']],_reward.count)} className="btn-claim button">
                Claim {_reward.count} Weapon(s)
            </button>
        </div>
    )
}

export default StakedCard