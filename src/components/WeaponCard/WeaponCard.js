import './weapon-card.css'
import AppBadge from "../Badge"

function WeaponCard({ info, actionBar, isSelected }) {
    return (
        <div className={`weapon-card ${isSelected && 'is-selected'}`}>
            <p className="title">{info?.title}</p>
            <div>
                {info?.type == 'common' && <AppBadge white fontSize={'20px'}>{info?.count + ' ' + info?.type}</AppBadge>}
                {info?.type == 'rare' && <AppBadge primary fontSize={'20px'}>{info?.count + ' ' + info?.type}</AppBadge>}
                {info?.type == 'legendary' && <AppBadge secondary fontSize={'20px'}>{info?.count + ' ' + info?.type}</AppBadge>}
                {info?.type == 'epic' && <AppBadge danger fontSize={'20px'}>{info?.count + ' ' + info?.type}</AppBadge>}
            </div>
            <img src={info?.image} />
            <div className='is-full'>
                {actionBar}
            </div>
        </div>
    )
}

export default WeaponCard