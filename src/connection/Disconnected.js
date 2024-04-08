import { useSelector } from 'react-redux'

function Disconnected({ children }) {
    const { account } = useSelector((state) => state.accountReducer)
    return account ? children : null
}

export default Disconnected