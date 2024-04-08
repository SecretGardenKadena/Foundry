import { useEffect, useRef, useState } from 'react'
import { TbChevronDown } from 'react-icons/tb'

function SortDropdown({ options, value, onChange }) {
    const [isOpen, setIsOpen] = useState(false)
    const divEl = useRef()

    useEffect(() => {
        const handleClick = (event) => {
            if (!divEl.current) {
                return
            }

            if (!divEl.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('click', handleClick, true)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    const handleClick = () => {
        setIsOpen((current) => !current)
    }

    const handleOptionClick = (option) => {
        setIsOpen(false)
        onChange(option)
    }

    const rendredOptions = options.map((option) => {
        return <div key={option.value} onClick={() => handleOptionClick(option)} className='p-2 overflow-hidden w-full cursor-pointer rounded-md text-white hover:text-gray-400 hover:bg-slate-900'>{option.label}</div>
    })

    let selectedLabel = value?.label || 'Sort..'

    return (
        <div ref={divEl} className='relative w-48 bg-black text-sm z-50'>
            <div onClick={handleClick} className='w-full cursor-pointer flex justify-between items-center border-2 border-gray-500 rounded-md p-2 text-white z-50'>{selectedLabel} <TbChevronDown /></div>
            {isOpen && <div className='absolute top-full left-0 w-full bg-black rounded-md overflow-hidden'>{rendredOptions}</div>}
        </div>
    )
}

export default SortDropdown