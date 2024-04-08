import './foundry.css'
import Disconnected from "../../connection/Disconnected"
import AppButton from '../../components/Button'
import Wrapper from '../../layouts/Wrapper'
import Connected from '../../connection/Connected'
import AppBadge from '../../components/Badge'
import { useState } from 'react'
import BurnCard from './BurnCard'
import AppModal from '../../components/Modals/AppModal'
import Weapons from '../../components/Weapons/Weapons'
import SelectedBurnCard from './SelectedBurnCard'
import StakingCard from './StakeCard'
import ClaimingCard from './ClaimCard'

function Foundry() {
    const [activeNavTab, setActiveNavTab] = useState({ img: '/images/s3.png', label: 'Burn', count: 43, navTab: 0 })
    const navTabs = [
        { img: '/images/s3.png', label: 'Burn', count: 43, navTab: 0 },
        { img: '/images/b2.png', label: 'Stake', count: 23, navTab: 1 },
        { img: '/images/bb3.png', label: 'Claim Weapons', count: 35, navTab: 2 },
        { img: '/images/bb4.png', label: 'History', navTab: 3 }
    ]

    const armoriesInventories = [
        { tag: 35, label: 'Common' },
        { tag: 4, label: 'Rare' },
        { tag: 5, label: 'Epic' },
        { tag: 1, label: 'Legendary' }
    ]

    const renderedArmoriesInventories = armoriesInventories?.map((item, index) => <div key={index} className='border-2 border-gray-700 rounded-md p-4 text-gray-200 text-center'><p className='text-4xl'>{item?.tag}</p><p className='text-sm'>{item?.label}</p></div>)

    const handleNavTabClick = (active) => {
        setActiveNavTab(active)
    }

    const renderedNavTabs = navTabs?.map((item, index) => {
        return (
            <div key={index} onClick={() => handleNavTabClick(item)} className='flex justify-between items-center border-2 border-gray-700 p-2 rounded-t-md cursor-pointer'>
                <div className='flex gap-2 items-center'>
                    <img className='h-10' src={item?.img} />
                    <p className={`text-2xl ${item.navTab == activeNavTab.navTab ? 'text-emerald-700' : 'text-gray-600'}`}>{item?.label}</p>
                </div>
                {item?.count && <div><AppBadge mild className="font-bold">{item?.count}</AppBadge></div>}
            </div>
        )
    })

    const weapons = [
        {
            title: 'Axe of Thunder',
            image: '/images/weapons/1.png',
            count: 45,
            type: 'common'
        },
        {
            title: 'Axe of Thunder',
            image: '/images/weapons/1.png',
            count: 74,
            type: 'rare'
        },
        {
            title: 'Axe of Thunder',
            image: '/images/weapons/1.png',
            count: 9,
            type: 'legendary'
        },
        {
            title: 'Axe of Thunder',
            image: '/images/weapons/1.png',
            count: 15,
            type: 'epic'
        },
        {
            title: 'Axe of Thunder',
            image: '/images/weapons/1.png',
            count: 8,
            type: 'common'
        }
    ]

    const [openModal, setOpenModal] = useState(false)

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }
    const [openConnModal, setOpenConnModal] = useState(false)

    const handleOpenConnModal = () => {
        setOpenConnModal(true)
    }

    const handleCloseConnModal = () => {
        setOpenConnModal(false)
    }

    const [toBurn, setToBurn] = useState(null)

    const handleFoundry = (weapon) => {
        setToBurn(weapon)
        setOpenModal(false)
    }

    const toStakeInfo = { count: 34, type: 'Gen 0 Gnomes', image: '/images/s2.png' }
    const stakedInfo = { count: 55, type: 'Gnomes', image: '/images/s3.png' }
    const claims = [
        { count: 55, image: '/images/s2.png' },
        { count: 17, image: '/images/s3.png' }
    ]

    const renderedClaims = claims?.map((item, index) => {
        return (<ClaimingCard key={index} info={item} actionBar={<AppButton success full>Claim</AppButton>} />)
    })

    return (
        <Wrapper>
            <div className='container fdry-wrap'>
                <h1 className='fdry-label m-0'>Foundry</h1>
                <Disconnected>
                    <div className='fdry-disconn-wrap mt-4'>
                        <div className='fdry-disconn-hero mt-8'>
                            <p className='title mb-2'>Stake gnomes and earn weapons</p>
                            <p className='info'>
                                This page allows you to manage gnome staking and weapons building. Burn 2 of the same weapon in the foundry to create more powerful weaponry.
                            </p>
                            <div className='flex justify-center gap-2 mt-6'>
                                <AppButton success className="font-bold">Connect</AppButton>
                                <AppButton white className="font-bold text-lg">Get NFT</AppButton>
                            </div>
                        </div>
                    </div>
                </Disconnected>
                <Connected>
                    <div className='grid grid-cols-2 lg:grid-cols-4 gap-2 mt-4'>{renderedNavTabs}</div>
                    <div className='border-2 border-gray-700 rounded-b-md p-4'>
                        {activeNavTab.navTab === 0 && (
                            <div className='animate-bounce'>
                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                                    <div className='text-gray-200'>
                                        <p className='font-label text-lg'>HOW IT WORKS</p>
                                        <p className='text-lg mt-2'>Select any 2 of the same weapon with the same rarity and burn to forge a more powerful weapon in the SGK gaming universe.</p>
                                    </div>
                                    <div>
                                        <p className='font-label text-gray-200 text-lg'>YOUR ARMORY INVENTORY</p>
                                        <div className='grid grid-cols-2 lg:grid-cols-4 gap-2 mt-4'>{renderedArmoriesInventories}</div>
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <p className='font-label text-gray-200 text-lg'>BURN SELECTION</p>
                                    <div className='mt-4 grid grid-cols-1 lg:grid-cols-2 gap-10'>
                                        <div className='flex flex-col gap-3'>
                                            {toBurn ? <SelectedBurnCard info={toBurn} /> : <BurnCard isAction label='Weapon 1' onChange={handleOpenModal} />}
                                            <div className='flex items-center justify-center gap-4'>
                                                <img src='/images/toilet.png' className='h-14 mt-2' />
                                                <img src='/images/fire.gif' className='h-14' />
                                            </div>
                                            {toBurn ? <SelectedBurnCard info={toBurn} /> : <BurnCard label='Weapon 2' onChange={() => window.alert('Halleluyah!!')} />}
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <img src='/images/arrow-right.png' className='h-10' />
                                            {toBurn ? <SelectedBurnCard info={toBurn} actionBar={<div className='flex items-center justify-center gap-2'><AppButton success onClick={handleOpenConnModal}>Burn</AppButton><AppButton white onClick={() => window.alert(`Cancelled ${toBurn?.title}`)}>Cancel</AppButton></div>} /> : (
                                                <div className='p-10 flex flex-col items-center gap-4 w-full'>
                                                    <img src='/images/Group.png' className='h-22' />
                                                    <p className='text-xs text-gray-200 text-center'>See the Result Here</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        }
                        {activeNavTab.navTab === 1 && (
                            <div className='animate-bounce'>
                                <p className='text-lg text-gray-200 font-label'>Gen 0 staking</p>
                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2'>
                                    <StakingCard info={toStakeInfo} actionBar={<AppButton success full>Stake</AppButton>} />
                                    <StakingCard info={stakedInfo} actionBar={<AppButton white full>Unstake</AppButton>} />
                                </div>
                                <p className='text-lg text-gray-200 font-label mt-4'>battle blox heroes staking</p>
                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2'>
                                    <StakingCard info={toStakeInfo} actionBar={<AppButton success full>Stake</AppButton>} />
                                    <StakingCard info={stakedInfo} actionBar={<AppButton white full>Unstake</AppButton>} />
                                </div>
                            </div>
                        )}
                        {activeNavTab.navTab === 2 && (
                            <div className='animate-bounce'>
                                <p className='text-lg text-gray-200 font-label'>Claim your weapons here</p>
                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2'>
                                    {renderedClaims}
                                </div>
                            </div>
                        )}
                        {activeNavTab.navTab === 3 && (
                            <div className='animate-bounce'>
                                <p className='text-lg text-gray-200 font-label mt-4 mb-2'>Foundry history</p>
                                <div className='w-full'>
                                    <table className='border-collapse text-white w-full overflow-x-auto'>
                                        <thead>
                                            <tr>
                                                <th className='p-2'>Date</th>
                                                <th className='p-2'>Time</th>
                                                <th className='p-2'>Type</th>
                                                <th className='p-2'>Details</th>
                                                <th className='p-2'>Result</th>
                                                <th className='p-2 flex justify-end'>Block Transaction</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='p-2'>Dec 2</td>
                                                <td className='p-2'>12:00p UTC</td>
                                                <td className='p-2'>Burn</td>
                                                <td className='p-2'>Burned #654 + #774 Axe of Fire (R)</td>
                                                <td className='p-2'>Mint #997 Axe of Fire (E)</td>
                                                <td className='p-2 flex justify-end'><a className='text-blue-700 underline' href='#'>04505650654692343</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='mt-8'>
                                    <AppButton success fontSize={'1.6rem'}>Export to CSV</AppButton>
                                </div>
                            </div>
                        )}
                    </div>
                    <AppModal isOpen={openModal} onClose={handleCloseModal} layoutStyle='w-11/12 lg:w-4/5' modalTitle='SELECT A WEAPON FROM ARSENAL'>
                        <Weapons weapons={weapons} wrapLayoutStyles='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8' weaponsListStyles='md:col-span-2 lg:col-span-3 grid grid-cols-1 md: grid-cols-2 lg:grid-cols-3 gap-2' onChange={handleFoundry} />
                    </AppModal>
                    <AppModal isOpen={openConnModal} onClose={handleCloseConnModal} layoutStyle='sm:w-4/5 lg:w-2/5'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex justify-center'><img src='/images/logo.png' className='h-32' /></div>
                            <p className='font-label text-white text-3xl w-3/4 mx-auto text-center'>go to your wallet to sign tx</p>
                            <p className='text-gray-300 text-base'>
                                Your wallet should have a prompt for you if it was connected. Check and sign before continuing, or the transaction will not go through. This window will close once you’ve signed.
                            </p>
                            <AppButton success fontSize={'1.4rem'}>Cancel Transaction</AppButton>
                        </div>
                    </AppModal>
                </Connected>
            </div>
        </Wrapper>
    )
}

export default Foundry