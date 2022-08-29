import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = (props) => {
    const { setLoggedIn } = props

    const navigate = useNavigate()

    useEffect(() => {
        localStorage.clear()
        setLoggedIn(false)
        navigate('/')
    }, [navigate])

    return false
}

export default Logout