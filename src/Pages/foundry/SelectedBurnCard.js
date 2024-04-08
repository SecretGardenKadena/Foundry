import AppBadge from "../../components/Badge"

function SelectedBurnCard({ info, actionBar }) {
    return (
        <div className="rounded-md border-gray-800 bg-gray-400 w-full flex flex-col gap-2 p-4">
            <p className="text-2xl text-center">{info?.title}</p>
            <div className="flex justify-center">
                {info?.type == 'common' && <AppBadge white fontSize={'20px'}>{info?.type}</AppBadge>}
                {info?.type == 'rare' && <AppBadge primary fontSize={'20px'}>{info?.type}</AppBadge>}
                {info?.type == 'legendary' && <AppBadge secondary fontSize={'20px'}>{info?.type}</AppBadge>}
                {info?.type == 'epic' && <AppBadge danger fontSize={'20px'}>{info?.type}</AppBadge>}
            </div>
            <div className="flex justify-center">
                <img className="h-28" src={info?.image} />
            </div>
            {actionBar && (
                <div className='w-full'>{actionBar}</div>
            )}
        </div>
    )
}

export default SelectedBurnCard