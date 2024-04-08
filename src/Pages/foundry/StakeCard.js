import { useState } from "react"
import { TbPlus } from "react-icons/tb"

function StakingCard({ info, actionBar }) {
    const [value, setValue] = useState(0)

    const handleAdd = () => {
        setValue((current) => current + 1)
    }
    const handleMinus = () => {
        setValue((current) => current < 1 ? 0 : current - 1)
    }

    return (
        <div className="rounded-sm border-2 border-gray-700 p-2 flex flex-col gap-2">
            <p className="text-gray-200 text-sm">{info?.count + ' ' + info?.type + 'Gnomes is available'}</p>
            <div className="flex justify-center"><img src={info?.image} className="h-20" /></div>
            <div className="flex justify-center items-center gap-2">
                <input value={value} className="bg-white outline-none border-none p-1 flex-1" />
                <div className="flex flex-col gap-2">
                    <div className="p-1 bg-white" onClick={handleAdd}><TbPlus size={20} /></div>
                    <div className="p-1 bg-white" onClick={handleMinus}><TbPlus size={20} /></div>
                </div>
            </div>
            {actionBar && (
                <div className="w-full">{actionBar}</div>
            )}
        </div>
    )
}

export default StakingCard