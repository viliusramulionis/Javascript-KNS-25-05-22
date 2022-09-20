import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MainContext from '../context/MainContext'
import axios from 'axios'

const NewOrder = () => {
    const { saloonId } = useParams()
    const { setAlert } = useContext(MainContext)
    const [services, setServices] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/services/')
        .then(resp => setServices(resp.data))
        .catch(error => {
            console.log(error)
            setAlert({
                message: error.response.data,
                status: 'danger'
            })

            if(error.response.status === 401)
                navigate('/login')
        })
    }, [])

    return (
        <>
            <h1>Naujas užsakymas {saloonId}</h1>
            <form>
                <select>
                    <option value="0">Pasirinkite paslaugą</option>
                    {services.map(service => 
                        <option 
                        key={service.id} 
                        value={service.id}>
                            {service.name + ' Trukmė: ' + service.duration}
                        </option>
                    )}
                </select>
            </form>
        </>
    )
}

export default NewOrder