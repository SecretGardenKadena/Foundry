import { useState } from 'react'
import WeaponCard from '../WeaponCard/WeaponCard'
import AppButton from '../Button'

function Weapons({ weapons, wrapLayoutStyles, weaponsListStyles, onChange }) {
    const typeFilters = [
        { tag: 'All Rarities', value: 'all' },
        { tag: 'Common', value: 'common' },
        { tag: 'Rare', value: 'rare' },
        { tag: 'Epic', value: 'epic' },
        { tag: 'Legendary', value: 'legendary' }
    ]

    const [activeTypeFilter, setActiveTypeFilter] = useState({ tag: 'All Rarities', value: 'all' })

    const [weaponsData, setWeaponsData] = useState(weapons)

    const handleActiveTypeFilter = (active) => {
        setActiveTypeFilter(active)

        if (active.value == 'all') {
            const unfiltered = weapons
            setWeaponsData(unfiltered)
            return 0
        }
        const filtered = weapons.filter(item => item.type == active.value)
        setWeaponsData(filtered)
    }

    const renderedTypeFilters = typeFilters?.map((item, index) => <li key={index} onClick={() => handleActiveTypeFilter(item)} className={`cursor-pointer p-2 text-center rounded-md ${activeTypeFilter.value == item.value ? 'text-emerald-700 border-2 border-gray-400' : 'text-white'}`}>{item?.tag}</li>)

    const handleFoundry = (weapon) => {
        onChange(weapon)
    }
    const renderedWeapons = weaponsData?.map((weapon, index) => <WeaponCard key={index} info={weapon} isSelected={index == 2} actionBar={<AppButton onClick={() => handleFoundry(weapon)} success full fontSize={'22px'}>Use in Foundry</AppButton>} />)

    return (
        <div className={wrapLayoutStyles}>
            <div>
                <ul>
                    {renderedTypeFilters}
                </ul>
            </div>
            <div className={weaponsListStyles}>
                {renderedWeapons}
            </div>
        </div>
    )
}

export default Weapons