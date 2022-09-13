import { useEffect, useState } from 'react'
import axios from 'axios'

const Saloons = () => {
    const [saloons, setSaloons] = useState([])

    useEffect(() => {
        axios.get('/api/saloons/')
        .then(resp => setSaloons(resp.data))
        .catch(error => console.log(error))
    }, [])

    return (
        <>
            <h1>Grožio salonai</h1>

            {saloons ? 
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Pavadinimas</th>
                            <th>Adresas</th>
                            <th>Telefono nr.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {saloons.map(saloon => 
                            <tr>
                                <td>{saloon.id}</td>
                                <td>{saloon.name}</td>
                                <td>{saloon.address}</td>
                                <td>{saloon.phone}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
             : 
                <h3>Nėra sukurtų grožio salonų</h3>
            }
        </>
    )
}

export default Saloons