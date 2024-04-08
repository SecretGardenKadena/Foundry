import { useSelector } from 'react-redux'

function Connected({ children }) {
    const { account } = useSelector((state) => state.accountReducer)
    return !account ? children : null
}

export default Connected