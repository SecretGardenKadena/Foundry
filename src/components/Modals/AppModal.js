import './styles.css'
import React from "react"
import { TbX } from "react-icons/tb"

function AppModal({ isOpen, onClose, modalTitle = '', layoutStyle = 'w-1/2', children }) {
    return (
        <React.Fragment>
            {isOpen && (
                <div className="flex items-center justify-center fixed top-0 left-0 bottom-0 right-0 backdrop-blur-sm backdrop-opacity-50 backdrop:bg-gray-800 z-50 p-8">
                    <div className={`p-4 bg-black rounded-md border-2 border-gray-700 max-h-full overflow-y-auto ${layoutStyle}`}>
                        <div className={`flex items-center ${modalTitle && 'justify-end'} gap-4`}>
                            <p className="text-center text-2xl text-gray-200 flex-1 font-label">{modalTitle}</p>
                            <span onClick={onClose} className="text-white"><TbX size={32} /></span>
                        </div>
                        <div>
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}

export default AppModal