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
        fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postForm)
        })
        .then(resp => resp.json())
        .then(resp => console.log(resp))

    }

    return (
        <div className="container">
            <h1>Naujas straipnis</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-control">
                    <label>Pavadinimas:</label>
                    <input type="text" name="title" onChange={(e) => handleForm(e)} />
                </div>
                <div className="form-control">
                    <label>Pavadinimas:</label>
                    <textarea name="content" onChange={(e) => handleForm(e)}></textarea>
                </div>
                <div className="form-control">
                    <label>Nuotrauka:</label>
                    <input type="text" name="image" onChange={(e) => handleForm(e)} />
                </div>
                <button className="btn btn-primary">Siųsti</button>
            </form>
        </div>
    )
}

export default NewPost