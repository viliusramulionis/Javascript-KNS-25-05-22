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
        fetch('http://localhost:3000/' + id)
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

        fetch('http://localhost:3000/edit/' + id, {
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
                <div className="form-control">
                    <label>Pavadinimas:</label>
                    <input type="text" name="title" onChange={(e) => handleForm(e)} value={post.title} />
                </div>
                <div className="form-control">
                    <label>Turinys:</label>
                    <textarea name="content" onChange={(e) => handleForm(e)} value={post.content}></textarea>
                </div>
                <div className="form-control">
                    <label>Nuotrauka:</label>
                    <input type="text" name="image" onChange={(e) => handleForm(e)} value={post.image} />
                </div>
                <button className="btn btn-primary">Siųsti</button>
            </form>
        </div>
    )
}

export default EditPost