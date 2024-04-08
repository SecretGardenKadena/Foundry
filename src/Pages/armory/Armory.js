import './armory.css'
import { useState } from 'react'
import Wrapper from '../../layouts/Wrapper'
import AppButton from '../../components/Button'
import Connected from '../../connection/Connected'
import Disconnected from '../../connection/Disconnected'
import SortDropdown from '../../components/SortDropdown'
import Weapons from '../../components/Weapons/Weapons'

function Armory() {
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

    const categories = [
        { name: 'Axes', image: '/images/weapons/1.png' },
        { name: 'Wands', image: '/images/weapons/2.png' },
        { name: 'Helmet', image: '/images/weapons/3.png' },
        { name: 'Hats', image: '/images/weapons/4.png' },
        { name: 'Armor', image: '/images/weapons/5.png' },
        { name: 'Robes', image: '/images/weapons/6.png' },
        { name: 'Accessories', image: '/images/weapons/7.png' }
    ]

    const renderedCategories = categories?.map((item, index) => <div className='category-card' key={index}><img src={item?.image} /> {item?.name}</div>)

    const [selected, setSelected] = useState({ label: 'Sort A - Z', value: 'a' })
    const handleSelect = (selection) => {
        setSelected(selection)
    }

    const options = [
        { label: 'Sort A - Z', value: 'a' },
        { label: 'Sort Z - A', value: 'b' },
        { label: 'Sort 1 - 10', value: 'c' }
    ]

    const handleFoundry = (weapon) => {
        window.confirm(`Do you want to found ${weapon.type + ' - ' + weapon.title}?`)
    }

    return (
        <Wrapper>
            <div className='container armory-wrap'>
                <h1 className='armory-label m-0'>Armory</h1>
                <Disconnected>
                    <div className='armory-disconn-wrap'>
                        <div className='armory-disconn-hero mt-8'>
                            <p className='title mb-2'>Battle Blox weaponry</p>
                            <p className='info'>
                                This page shows your weapon inventory after you connect a wallet. Use weapons in upcoming games. Burn 2 of the same weapon to create more powerful weaponry.
                            </p>
                            <div className='flex justify-center gap-2 mt-6'>
                                <AppButton success className="font-bold">Connect</AppButton>
                                <AppButton white className="font-bold text-lg">Get NFT</AppButton>
                            </div>
                        </div>
                    </div>
                </Disconnected>
                <Connected>
                    <p className='armory-conn-sublabel text-center text-xl'>This page shows all of the weapons in your wallet across all levels.</p>
                    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 mt-8'>
                        <div className='armory-category-label'>
                            All Types
                        </div>
                        {renderedCategories}
                    </div>
                    <div className='flex justify-end mt-8'>
                        <SortDropdown options={options} value={selected} onChange={handleSelect} />
                    </div>
                    <Weapons weapons={weapons} wrapLayoutStyles='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8' weaponsListStyles='md:col-span-2 lg:col-span-3 grid grid-cols-1 md: grid-cols-2 lg:grid-cols-3 gap-2' onChange={handleFoundry} />
                </Connected>
            </div>
        </Wrapper>
    )
}

export default Armory