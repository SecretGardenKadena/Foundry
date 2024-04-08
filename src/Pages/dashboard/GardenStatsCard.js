function GardenStatsCard({ tag, label, sub }) {
    return (
        <div className={`text-gray-200 border-2 border-gray-800 rounded-lg p-2 text-center relative z-0 ${sub && 'mt-20'}`}>
            <p className="text-3xl">{tag}</p>
            <p className="text-xs">{label}</p>
            {sub &&
                <div className="absolute -top-16 left-0 w-full -z-10">
                    {sub}
                </div>
            }
        </div>
    )
}

export default GardenStatsCard