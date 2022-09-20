import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import MainContext from '../context/MainContext'
import axios from 'axios'

const Workers = () => {
    const [workers, setWorkers] = useState([])
    const [saloons, setSaloons] = useState([])
    const [selectedSaloon, setSelectedSaloon] = useState('0')
    const { setAlert } = useContext(MainContext)

    const handleFilter = (e) => {
        setSelectedSaloon(e.target.value)
    }

    useEffect(() => {
        let url = '/api/workers/'
        
        if(selectedSaloon !== '0')
            url += '?saloon=' + selectedSaloon
        console.log(url)
        axios.get(url)
        .then(resp => {
            //Laikinas sprendimas
            const workers = resp.data.map(worker => {
                if(worker.ratings.length > 0) {
                    let sum = 0
                    worker.ratings.map(r => sum += r.rating)
                    worker.total_rating = (sum / worker.ratings.length).toFixed(2)
                }

                return worker
            })
            setWorkers(workers)
        })
        .catch(error => {
            console.log(error)
            setAlert({
                message: error.response.data,
                status: 'danger'
            })
        })
    }, [selectedSaloon])

    useEffect(() => {
        axios.get('/api/saloons/')
        .then(resp => setSaloons(resp.data))
        .catch(error => {
            console.log(error)
            setAlert({
                message: error.response.data,
                status: 'danger'
            })
        })
    }, [])

    return (
        <>
            <h1>Darbuotojų sąrašas</h1>
            {saloons && 
                <select onChange={handleFilter}>
                    <option value="0">Pasirinkite saloną</option>
                    {saloons.map(saloon => 
                        <option key={saloon.id} value={saloon.id}>{saloon.name}</option>    
                    )}
                </select>
            }
            {workers && workers.map(worker => 
                <div key={worker.id}>
                    <img src={worker.photo} />
                    <h4>{worker.first_name + ' ' + worker.last_name}</h4>
                    <div>{worker.saloon.name}</div>
                    <div>Įvertinimas: {worker.total_rating}</div>
                </div>
            )}
        </>
    )
}

export default Workers