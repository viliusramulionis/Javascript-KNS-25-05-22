import { useParams } from 'react-router-dom'

const EditPost = () => {
    const { id } = useParams()
    return 'Puslapio redagavimas irasui: ' + id
}

export default EditPost