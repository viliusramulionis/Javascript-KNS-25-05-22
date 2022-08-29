import { useState } from 'react'
import axios from 'axios'

const NewPost = () => {
    const [postForm, setPostForm] = useState({
        title: '',
        content: '',
        image: ''
    })

    const handleForm = (e) => {
        setPostForm({...postForm, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // const form = new FormData(e.target)

        // for(const key in postForm) {
        //     form.append(key, postForm[key])
        // }
        axios.post('/api/posts/', postForm)
        .then(resp => console.log(resp))

    }

    return (
        <div className="container">
            <h1>Naujas straipnis</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group mb-2">
                    <label className="mb-1">Pavadinimas:</label>
                    <input type="text" name="title" className="form-control" onChange={(e) => handleForm(e)} />
                </div>
                <div className="form-group mb-2">
                    <label className="mb-1">Turinys:</label>
                    <textarea name="content" className="form-control" onChange={(e) => handleForm(e)}></textarea>
                </div>
                <div className="form-group mb-3">
                    <label className="mb-1">Nuotrauka:</label>
                    <input type="text" name="image" className="form-control" onChange={(e) => handleForm(e)} />
                </div>
                <button className="btn btn-primary">Siųsti</button>
            </form>
        </div>
    )
}

export default NewPost