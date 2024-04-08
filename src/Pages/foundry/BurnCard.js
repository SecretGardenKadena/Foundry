import AppButton from '../../components/Button'

function BurnCard({ label, isAction = false, onChange }) {
    const placeholderWeapon = '/images/weapons/placeholder.png'

    const handleClick = () => {
        onChange()
    }
    return (
        <div className='flex flex-col justify-center rounded-md p-4 border-2 border-dotted border-emerald-700 text-emerald-700'>
            <div><img className='mx-auto h-16 mb-2' src={placeholderWeapon} /></div>
            <p className='text-center text-lg text-gray-200'>{label}</p>
            {isAction && (
                <div className='flex justify-center mt-2'>
                    <AppButton success fontSize='22px' onClick={handleClick}>Select a Weapon</AppButton>
                </div>
            )}
        </div>
    )
}

export default BurnCard