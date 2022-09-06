import { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../MainContext'

const SinglePost = () => {
    const [post, setPost] = useState({})
    const [comment, setComment] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()
    const { loggedIn } = useContext(MainContext)

    useEffect(() => {
        axios.get('/api/posts/' + id)
        .then(resp => {
            if(!resp.data) {
                //Pirmąja reikšme perduodame adresą kuriuo nukreipiamas vartotojas negaunant jokios reikšmės
                navigate('/')
                return 
            }

            setPost(resp.data)
        })
        .catch((error) => {
            console.log(error)
            navigate('/')
        })
    }, [])

    const handleForm = (e) => {
        e.preventDefault()
        
        axios.post('/api/comments/', { comment, postId: id })
        .then(resp => console.log(resp))
        .catch(error => console.log(error))
    }

    return (
        <div className="mb-5 container">
            <div className="single-post">
                <h1>{post.title}</h1>
                <div className="image" style={{ backgroundImage: 'url(' + post.image + ')' }}></div>
                <div className="content">
                    {post.content}
                </div>
                {post.comments &&
                    <div className="mt-3 comments">
                        <h3>Vartotojų komentarai</h3>
                        {post.comments.map(entry => 
                            <li key={entry.id}>
                                {entry.comment}
                            </li>    
                        )}
                    </div>
                }
            </div>
            {loggedIn ? 
                <div className="mt-5 comment-form">
                    <h2>Palikite savo komentarą</h2>
                    <form onSubmit={ (e) => handleForm(e) }>
                        <div className="form-group mb-2">
                            <label>Jūsų komentaras:</label>
                            <textarea 
                                className="form-control" 
                                name="comment" 
                                onChange={ (e) => setComment(e.target.value) }
                            ></textarea>
                        </div>
                        <div className="form-group mb-2">
                            <button className="btn btn-primary">Siųsti</button>
                        </div>
                    </form>
                </div>
            : 
                <div className="mt-5">Prisijunkite norėdami palikti komentarą</div>
            }
        </div>
    ) 
}

export default SinglePost