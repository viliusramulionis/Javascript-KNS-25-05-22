import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const SinglePost = () => {
    const [post, setPost] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:3000/' + id)
        .then(resp => resp.json())
        .then(resp => {
            if(!resp) {
                //Pirmąja reikšme perduodame adresą kuriuo nukreipiamas vartotojas negaunant jokios reikšmės
                navigate('/')
                return 
            }

            setPost(resp)
        })
        .catch((error) => {
            console.log(error)
            navigate('/')
        })
    }, [])

    return (
        <div className="container">
            <div className="single-post">
                <h1>{post.title}</h1>
                <div className="image">
                    <img src={post.image} alt={post.title} />
                </div>
                <div className="content">
                    {post.content}
                </div>
            </div>
        </div>
    ) 
}

export default SinglePost