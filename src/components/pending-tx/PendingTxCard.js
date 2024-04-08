import './pending-tx.css'
import AppBadge from '../Badge'

function PendingTxCard({ items }) {
    const renderedItems = items?.map((item, index) => {
        return (
            <div key={index}>
                <AppBadge mild>In Progress</AppBadge>
                <p className='text-lg text-blue-700 underline'>{item?.tag}</p>
                <p className='text-gray-300 text-sm'>{`Last update ${item?.time} seconds ago..`}</p>
            </div>
        )
    })
    return (
        <div className='pending-tx-card p-4 flex flex-col gap-6 border border-gray-200 rounded-md'>
            <p className='label font-bold text-xl text-gray-300'>Pending Transaction</p>
            <div className='flex flex-col gap-3'>
                {renderedItems}
            </div>
        </div>
    )
}

export default PendingTxCard