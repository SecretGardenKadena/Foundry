import './dashboard.css'
import Disconnected from "../../connection/Disconnected"
import Wrapper from "../../layouts/Wrapper"
import GardenStatsCard from './GardenStatsCard'
import AppButton from '../../components/Button'
import Connected from '../../connection/Connected'
import AppBadge from '../../components/Badge'

function Dashboard() {
    const statOneSub = (
        <div className='flex justify-between'>
            <img src='/images/dashboard-page/stats-1.png' className='h-16' />
            <img src='/images/dashboard-page/stats-2.png' className='h-16' />
        </div>
    )
    const statTwoSub = (
        <div className='flex justify-between'>
            <img src='/images/dashboard-page/stats-3.png' className='h-16' />
            <img src='/images/dashboard-page/stats-4.png' className='h-16' />
        </div>
    )
    const gardenStats = [
        { tag: '40K', label: 'Gen 0 floor', sub: statOneSub },
        { tag: '75%', label: 'Gen 0 staked', sub: statTwoSub },
        { tag: '45%', label: 'Gen 1 staked', sub: null },
        { tag: '5%', label: 'Weapons minted', sub: null }
    ]

    const renderedStats = gardenStats?.map((stat, index) => {
        return (<GardenStatsCard key={index} tag={stat?.tag} label={stat?.label} sub={stat?.sub} />)
    })

    const gnomes = [
        { tag: 'Battle Blox Heroes', label: 'Stake to earn weapons', image: '/images/gnomes/1.png', isMustConn: true },
        { tag: 'Gen 0 Gnomes', label: 'Stake to earn weapons', image: '/images/gnomes/2.png', isMustConn: true },
        { tag: 'Gen 1 Gnomes', label: 'On sale now', image: '/images/gnomes/3.png', isMustConn: false }
    ]
    const gnomesConn = [
        { tag: '3 Heroes', label: '3 Staked', image: '/images/gnomes/1.png', isMustConn: true, isClaim: true },
        { tag: '20 Gen 0', label: '20 Staked', image: '/images/gnomes/2.png', isMustConn: true, isClaim: true },
        { tag: '40 Gen 1', label: 'On sale now', image: '/images/gnomes/3.png', isMustConn: false, isClaim: false }
    ]

    const renderedGnomes = gnomes?.map((item, index) => {
        return (
            <div key={index} className='border-2 border-gray-700 rounded-md p-2 flex flex-col gap-2 justify-center'>
                <div>
                    <img src={item?.image} className='h-20 mt-10 mx-auto' />
                </div>
                <div className='text-center text-gray-200'>
                    <p className='text-2xl'>{item?.tag}</p>
                    <p className='text-sm'>{item?.label}</p>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    {item?.isMustConn && <AppButton success className='font-bold'>Connect</AppButton>}
                    <AppButton white className='font-bold'>Get NFT</AppButton>
                </div>
            </div>
        )
    })
    const renderedGnomesConn = gnomesConn?.map((item, index) => {
        return (
            <div key={index} className='border-2 border-gray-700 rounded-md p-2 flex flex-col gap-2 justify-center'>
                <div className='flex justify-end'>
                    <AppBadge primary className='text-xs'>Ready to Claim</AppBadge>
                </div>
                <div>
                    <img src={item?.image} className='h-20 mt-10 mx-auto' />
                </div>
                <div className='text-center text-gray-200'>
                    <p className='text-2xl'>{item?.tag}</p>
                    <p className='text-sm'>{item?.label}</p>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    {item?.isMustConn && <AppButton success className='font-bold'>Stake</AppButton>}
                    <AppButton white className='font-bold'>Claim</AppButton>
                </div>
            </div>
        )
    })

    return (
        <Wrapper>
            <div className="container portal-wrap">
                <h1 className='portal-label m-0 text-gray-200'>Gnome Portal</h1>
                <Disconnected>
                    <div className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-28'>
                        <div>
                            <p className='font-label text-lg text-gray-200'>SECRET GARDEN STATS</p>
                            <div className='grid grid-cols-2 gap-2 mt-2'>
                                {renderedStats}
                            </div>
                        </div>
                        <div>
                            <p className='font-label text-lg text-gray-200'>YOUR WEAPONS</p>
                            <div className='text-center flex flex-col gap-4 items-center mt-2'>
                                <img className='w-3/4 rounded-sm' src='/images/dashboard-page/hero.png' />
                                <div>
                                    <p className='text-2xl text-gray-200'>Battle Blox Weapon</p>
                                    <p className='text-sm text-gray-200'>Burn and collect</p>
                                </div>
                                <div className='flex justify-center items-center gap-2'>
                                    <AppButton success className='font-bold'>Connect</AppButton>
                                    <AppButton white className='font-bold'>Get NFT</AppButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <p className='font-label text-lg text-gray-200'>YOUR GNOMES</p>
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 mt-2'>{renderedGnomes}</div>
                    </div>
                </Disconnected>
                <Connected>
                    <div className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-28'>
                        <div>
                            <p className='font-label text-lg text-gray-200'>SECRET GARDEN STATS</p>
                            <div className='grid grid-cols-2 gap-2 mt-2'>
                                {renderedStats}
                            </div>
                        </div>
                        <div>
                            <p className='font-label text-lg text-gray-200'>YOUR WEAPONS</p>
                            <div className='text-center flex flex-col gap-4 items-center mt-2'>
                                <img className='w-3/4 rounded-sm' src='/images/dashboard-page/hero-2.png' />
                                <div>
                                    <p className='text-2xl text-gray-200'>93 Weapons</p>
                                </div>
                                <div className='flex justify-center items-center gap-2'>
                                    <AppButton success className='font-bold'>Burn</AppButton>
                                    <AppButton white className='font-bold'>Check Inventory</AppButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <p className='font-label text-lg text-gray-200'>YOUR GNOMES</p>
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 mt-2'>{renderedGnomesConn}</div>
                    </div>
                </Connected>
            </div>
        </Wrapper>
    )
}

export default Dashboard