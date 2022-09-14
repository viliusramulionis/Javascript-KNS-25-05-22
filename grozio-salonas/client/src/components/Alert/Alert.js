import { useEffect, useContext } from 'react'
import MainContext from '../../context/MainContext'

const Alert = () => {
    const { alert } = useContext(MainContext)

    return alert.message && (
        <div className={'alert alert-' + alert.status}>
            {alert.message}
        </div> 
    )
}

export default Alert