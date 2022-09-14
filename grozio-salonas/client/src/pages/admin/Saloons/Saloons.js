import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../../context/MainContext'
import Alert from '../../../components/Alert/Alert'

const Saloons = () => {
    const [saloons, setSaloons] = useState([])
    const navigate = useNavigate()
    const { setAlert } = useContext(MainContext)

    const handleDelete = (id) => {
        axios.delete('/api/saloons/delete/' + id)
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            })

            window.scrollTo(0, 0)

            setTimeout(() => {
                setAlert({
                    message: ''
                })
            }, 2000)
        })
        .catch(error => {
            console.log(error)

            setAlert({
                message: error.response.data,
                status: 'danger'
            })

            if (error.response.status === 401)
                navigate('/login')
        })
    }

    useEffect(() => {
        axios.get('/api/saloons/')
            .then(resp => setSaloons(resp.data))
            .catch(error => console.log(error))
    }, [])

    return (
        <>
            <div className="page-heading">
                <h1>Grožio salonai</h1>
            </div>
            <Alert />
            {saloons ?
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Pavadinimas</th>
                            <th>Adresas</th>
                            <th>Telefono nr.</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {saloons.map(saloon =>
                            <tr key={saloon.id}>
                                <td>{saloon.id}</td>
                                <td>{saloon.name}</td>
                                <td>{saloon.address}</td>
                                <td>{saloon.phone}</td>
                                <td>
                                    <div className="d-flex justify-content-end gap-2">
                                        <Link to={'/admin/saloons/edit/' + saloon.id} className="btn btn-primary">Redaguoti</Link>
                                        <button className="btn btn-warning" onClick={() => handleDelete(saloon.id)}>Ištrinti</button>
                                    </div>
                                </td>
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