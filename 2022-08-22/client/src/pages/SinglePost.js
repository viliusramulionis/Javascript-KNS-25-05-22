import { useParams } from 'react-router-dom'

const SinglePost = () => {
    const { id } = useParams()

    return 'Vienas įrašas su id: ' + id
}

export default SinglePost