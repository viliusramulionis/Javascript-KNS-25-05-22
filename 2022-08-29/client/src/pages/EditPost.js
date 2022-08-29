import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const EditPost = () => {
    const { id } = useParams()
    const [post, setPost] = useState({
        title: '',
        content: '',
        image: ''
    })
    const navigate = useNavigate()

    useEffect(() => {
        fetch('/api/posts/' + id)
        .then(resp => resp.json())
        .then(resp => {
            if(!resp) {
                navigate('/')
                return
            }

            setPost(resp)
        })
        .catch(error => {
            console.log(error)
            navigate('/')
        })
    }, [])

    const handleForm = (e) => {
        setPost({...post, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('/api/edit/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
        .then(resp => resp.json())
        .then(resp => console.log(resp))

    }

    return (
        <div className="container">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group mb-2">
                    <label>Pavadinimas:</label>
                    <input type="text" name="title" className="form-control" onChange={(e) => handleForm(e)} value={post.title} />
                </div>
                <div className="form-group mb-2">
                    <label>Turinys:</label>
                    <textarea name="content" className="form-control" onChange={(e) => handleForm(e)} value={post.content} style={{minHeight: 250, resize: 'none'}}></textarea>
                </div>
                <div className="form-group mb-2">
                    <label>Nuotrauka:</label>
                    <input type="text" name="image" className="form-control" onChange={(e) => handleForm(e)} value={post.image} />
                </div>
                <div className="form-group mb-2">
                    <img src={post.image} alt={post.title} style={{maxWidth: 150}}/>
                </div>
                <button className="btn btn-primary">Siųsti</button>
            </form>
        </div>
    )
}

export default EditPost