import React, { useState, useEffect, useContext } from "react";
import Wrapper from "../../layouts/Wrapper";
import { getBattleHeroesOwnerTokens, getBhDetails, stakeBattleHeroes, unstakeBattleHeroes, getTokenRewards, bhClaimRewards } from "../../api/contract";
import { useSelector } from "react-redux";
import StakingDialog from "../../components/Modals/stakingModal";
import UnstakingDialog from "../../components/Modals/unstakingModal";
import Notification from "../../components/Alert/AlertNotification";
import ClientContextProvider from "../../providers/ClientContextProvider";
import StakedCard from "../../components/StakedCard";
import StakeCard from "../../components/StakeCard";
import ClaimingDialog from "../../components/Modals/claimingModal";

const BattleHero = () => {
    const [tab, setTab] = useState("ready");
    const [_wallet, setWallet] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
    const [tokens, setTokens] = useState([]);
    const [rewards, setRewards] = useState(0);
    const [staked, setStaked] = useState([]);
    const [ready, setReady] = useState([]);
    const [tk_staked, setTkStaked] = useState([]);
    const [staking, setStaking] = useState(false);
    const [show_staking, setShowStaking] = useState(false);
    const [tk_unstaked, setTkUnstaked] = useState([]);
    const [unstaking, setUnstaking] = useState(false);
    const [show_unstaking, setShowUnstaking] = useState(false);
    const [show_claiming, setShowClaiming] = useState(false);
    const [claiming, setClaiming] = useState(false);
    const [tk_rewards, setTkRewards] = useState([]);
    const [tks, setTks] = useState();
    const [claim_tks, setClaimTks] = useState([]);
    const [claim_count, setClaimCount] = useState(0);
    const [alert, setAlert] = useState(false);
    const [alert_msg, setAlertMsg] = useState('');
    const [alert_type, setAlertType] = useState('');
    const [open, setOpen] = useState(false);

    const contextData = ClientContextProvider();
    const { account, balance, wallet } = useSelector((state) => state.accountReducer);

    const token_rewards = async (token) => {
        const response = await getTokenRewards(account, token)
        return response
    }

    const rewardCounter = (tDate) => {
        const targetDate = new Date(tDate);
        const sevenDaysInMilliseconds = 10 * 24 * 60 * 60 * 1000;
        const endDate = new Date(targetDate.getTime() + sevenDaysInMilliseconds);
        const currentTime = new Date();
        const remaining = endDate - currentTime;

        return remaining < 0 ? 1 : 0
    }

    const stakeTokens = async () => {
        emptyError()
        setStaking(true)
        setShowStaking(false)
        const response = await stakeBattleHeroes(account, tk_staked, wallet, contextData)
        setShowStaking(true)
        setStaking(false)
        afterTransaction(response)
    }

    const unstakeTokens = async () => {
        emptyError()
        setUnstaking(true)
        setShowUnstaking(false)
        const response = await unstakeBattleHeroes(account, tk_unstaked, wallet, contextData)
        setShowUnstaking(true)
        setUnstaking(false)
        afterTransaction(response)
    }

    const afterTransaction = async (response) => {
        console.log("after tx", response)
        await getData()
        let msg = ''
        let _error = false
        if (typeof response === 'undefined') {
            _error = true
            msg = 'Transaction has been canceled.'
        }

        if (typeof response !== 'undefined' && typeof response.error !== 'undefined') {
            _error = true
            msg = response.error
        }

        if (response?.error === 1) {
            _error = true
            msg = "Your session has expired, please reconnect to continue!!"
        }

        if (_error) {
            setAlert(true)
            setOpen(true)
            setAlertMsg(msg)
            setAlertType('error')
            setUnstaking(false)
            setStaking(false)
            setClaiming(false)
        } else {
            setAlert(true)
            setOpen(true)
            setAlertMsg(response)
            setAlertType('success')
        }

    }

    const closeModal = async () => {
        setShowStaking(false)
        setAlert(false)
        setAlertType('')
        setAlertMsg('')
        setStaking(false)
        setUnstaking(false)
        setShowUnstaking(false)
        setShowClaiming(false)
        getData()
    }

    const emptyError = () => {
        setAlert(false)
        setOpen(false)
        setAlertMsg("")
    }

    const check_staking = (data) => {
        let tk_array = []
        if (balance < 0) {
            setAlert(true)
            setAlertType('info')
            setAlertMsg('Your balance is too low to perform this transaction.')
        } else if (data?.length > 0) {
            data.map((item) => {
                tk_array.push(item['token-id'])
            })
            setTkStaked(tk_array)
            setShowStaking(true)
        } else {
            setAlert(true)
            setAlertType('info')
            setAlertMsg('You must have an NFT before staking.')
        }
    }

    const check_claiming = (data, count) => {
        if (balance < 0) {
            setAlert(true)
            setAlertType('error')
            setAlertMsg('Your balance is too low to perform this transaction.')
        } else if (count > 0) {
            setClaimTks(data)
            setClaimCount(count)
            setShowClaiming(true)
        } else {
            setAlert(true)
            setAlertType('error')
            setAlertMsg('Your have 0 rewards.')
        }
    }

    const closeNotification = async () => {
        setOpen(false)
        setAlert(false)
        setAlertType('')
        setAlertMsg('')
    }

    const claim = async (tokens) => {
        emptyError()
        setClaiming(true)
        setShowClaiming(false)
        const result = await bhClaimRewards(account, tokens.slice(0, 10), wallet, contextData)
        setClaiming(false)
        setShowClaiming(true)
        await afterTransaction(result)
    }

    const check_unstaking = (data) => {
        let tk_array = []
        if (balance < 0) {
            setAlert(true)
            setAlertType('info')
            setAlertMsg('Your balance is too low to perform this transaction.')
        } else if (data?.length > 0) {
            data.map((item) => {
                tk_array.push(item['token-id'])
            })
            setTkUnstaked(tk_array)
            setShowUnstaking(true)
        } else {
            setAlert(true)
            setAlertType('info')
            setAlertMsg("You don't have any NFTs")
        }
    }

    const getData = async () => {
        const _tokens = await getBattleHeroesOwnerTokens(account)
        
        let staked_array = []
        let ready_array = []
        let _tks = {}
        let _tk_rewards = []

        if (_tokens?.length > 0) {
            await Promise.all(_tokens.map(async (_token) => {
                const bh_rewards = await getBhDetails(_token["token-id"]);
                
                const tk_t = bh_rewards['lock-change-time']
                const lock_time = typeof tk_t?.timep !== 'undefined' ? tk_t?.timep : tk_t?.time

                if (rewardCounter(lock_time) > 0 && _token['is-locked'] === true) {
                    _tk_rewards.push(_token["token-id"]);
                }
                
                _tks[_token["token-id"]] = { "count": rewardCounter(lock_time), "date": lock_time };

                if (typeof _token['is-locked'] !== 'undefined' && _token['is-locked']) {
                    staked_array.push(_token);
                } else {
                    ready_array.push(_token);
                }
            }));
        }

        setTks(_tks)
        setTkRewards(_tk_rewards)
        setStaked(staked_array)
        setReady(ready_array)
        staked_array.length > ready_array.length && setTab('staked')
        _tokens?.length > 0 && setTokens(_tokens)
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
            <div className="lading-page bg-black1 h-screen flex">
                <div className="wrap wrapWidth flex flex-col text-white">
                    <div style={{ fontSize: 40 }} className="tag text-center">BATTLE HEROES</div>
                    <div className="row justify-content-center">
                        <div className="col-10">
                            <p className="text-center">Introducing the Battle Heroes NFT Collection!</p>
                            <p className="text-center">
                                Prepare to embark on an epic journey through the virtual realms with our exclusive Battle Heroes NFT Collection.
                                Immerse yourself in a world where valor, strategy, and creativity collide to create an unforgettable digital experience. Whether you're a seasoned NFT connoisseur or a newcomer to the NFT scene, the Battle Heroes collection promises adventure and excitement. As you collect and trade these extraordinary NFTs, you'll uncover the hidden depths of their legends and the secrets that make them truly exceptional. Take your place in the digital arena, acquire your digital warriors, and etch your name into the annals of NFT history with the Battle Heroes NFT Collection.
                                The saga awaits, and your journey to legendary status begins now.
                            </p>
                        </div>
                    </div>
                    <div className="row w-100 m-0 p-0">
                        <div className="col-12">
                            <div className="staking-grid d-lg-grid w-100 row p-0 mx-0 justify-content-center">
                                <div className="col-12 col-lg-4 stake-item flex flex-col items-center justify-between h-auto">
                                    <div className="desc flex items-start">
                                        <p>You’ve earned {tk_rewards.length} weapon(s) to mint</p>
                                    </div>
                                    <img src="/images/s1.png" className="s-img" />
                                    <button onClick={() => check_claiming(tk_rewards, tk_rewards.length > 10 ? 10 : tk_rewards.length)} className="button btn-stack">
                                        Claim Weapons ({tk_rewards.length > 10 ? 10 : tk_rewards.length})
                                    </button>
                                </div>
                                <div className="col-12 col-lg-4 stake-item flex flex-col items-center">
                                    <div className="desc flex items-start">
                                        <p>{ready?.length > 0 ? ready.length : 0} battle heroe(s) are ready to get to work</p>
                                    </div>
                                    <img src="/images/battle-heroes.jpeg" className="s-img" />
                                    <button onClick={() => check_staking(ready)} className="button btn-stack">Stake All ({ready?.length > 0 ? ready.length : 0})</button>
                                </div>
                                <div className="col-12 col-lg-4 stake-item flex flex-col items-center">
                                    <div className="desc flex items-start">
                                        <p>{staked?.length > 0 ? staked.length : 0} battle heroe(s) hard at work on your weapons</p>
                                    </div>
                                    <img src="/images/s3.png" className="s-img" />
                                    <button onClick={() => check_unstaking(staked)} className="button btn-stack">Unstake All ({staked?.length > 0 ? staked.length : 0})</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="ready-stake-section flex flex-col">
                                <div className="row">
                                    <div className="col-12 stack-sec-tabs flex items-center">
                                        <div className="row">
                                            <div
                                                className={`tab col-12 col-lg-6 col-md-6 flex items-center justify-between ${tab === "ready" ? "active" : ""
                                                    }`}
                                                onClick={(e) => setTab("ready")}
                                            >
                                                <img src="/images/s3.png" className="icon" />
                                                <div className="tab-tag">Ready to Stake</div>
                                                <div className="numb flex items-center justify-center">{ready?.length > 0 ? ready.length : 0}</div>
                                            </div>
                                            <div
                                                className={`tab col-12 col-lg-6 col-md-6 flex items-center justify-between ${tab === "staked" ? "active" : ""
                                                    }`}
                                                onClick={(e) => setTab("staked")}
                                            >
                                                <img src="/images/b2.png" className="icon" />
                                                <div className="tab-tag">Staked</div>
                                                <div className="numb flex items-center justify-center">{staked?.length > 0 ? staked.length : 0}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 ready-stake-grid">
                                        {tab === "ready" ? (
                                            <>
                                                {ready.length > 0 && ready.map((token, index) => {
                                                    if (!isSmallScreen || index < 6) {
                                                        const tokenId = token['token-id'].slice(14)
                                                        return (
                                                            <StakeCard
                                                                key={index}
                                                                check_staking={check_staking}
                                                                token={token}
                                                                tokenId={tokenId}
                                                                check_claiming={check_claiming}
                                                                _reward={tks[token['token-id']]}
                                                                type={'bh'}
                                                            />
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </>
                                        ) : (
                                            <>
                                                {staked.length > 0 && staked.map((item, index) => {
                                                    if (!isSmallScreen || index < 6) {
                                                        const tokenId = item['token-id'].slice(14)
                                                        return (
                                                            <StakedCard
                                                                key={index}
                                                                item={item}
                                                                check_unstaking={check_unstaking}
                                                                tokenId={tokenId}
                                                                check_claiming={check_claiming}
                                                                _reward={tks[item['token-id']]}
                                                                type={'bh'}
                                                            />
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Notification
                open={staking || unstaking || claiming || alert ? true : open}
                message={staking || unstaking || claiming ? 'Processing your request...' : alert_msg}
                severity={staking || unstaking || claiming ? 'info' : alert_type}
                horizontal={staking || unstaking || claiming ? 'left' : 'right'}
                handleClose={closeNotification}
            />

            {show_staking &&
                <StakingDialog
                    title="NFT Staking"
                    tokens={tk_staked}
                    stakeTokens={stakeTokens}
                    alert={alert}
                    alert_msg={alert_msg}
                    closeModal={closeModal}
                    staking={staking}
                    alert_type={alert_type}
                />
            }

            {show_unstaking &&
                <UnstakingDialog
                    title="Realease NFT"
                    tokens={tk_unstaked}
                    unstakeTokens={unstakeTokens}
                    alert={alert}
                    alert_msg={alert_msg}
                    closeModal={closeModal}
                    unstaking={unstaking}
                    alert_type={alert_type}
                />
            }

            {show_claiming &&
                <ClaimingDialog
                    title="Claim rewards"
                    rewards={claim_count}
                    claim={claim}
                    alert={alert}
                    alert_msg={alert_msg}
                    closeModal={closeModal}
                    claiming={claiming}
                    alert_type={alert_type}
                    claim_tks={claim_tks}
                />
            }
        </Wrapper>
    );
};

export default BattleHero;
