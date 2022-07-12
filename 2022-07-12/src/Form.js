import {useState} from 'react'
import './Form.css'

const Form = () => {
    const [contact, setContact] = useState({
        vardas: '',
        telefonas: '',
        departamentas: '',
        zinute: ''
    })
    
    const [submitted, setSubmitted] = useState(false)

    const handleInputChange = (e) => {
        setContact({...contact, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)

        setTimeout(() => {
            setSubmitted(false)
            setContact({
                vardas: '',
                telefonas: '',
                departamentas: '',
                zinute: ''
            })
        }, 3000)
    }

    return (
        <>
            {submitted ? (
                <div className="response">
                    <ul>
                        <li>Jūsų vardas: {contact.vardas}</li>
                        <li>Jūsų telefonas: {contact.telefonas}</li>
                        <li>Jūsų departamentas: {contact.departamentas}</li>
                        <li>Jūsų žinutė: {contact.zinute}</li>
                    </ul>
                </div>
            ) : ''}
            <h1>Kontaktinė forma</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Vardas:</label>
                    <input type="text" name="vardas" onChange={(e) => handleInputChange(e) } value={contact.vardas} />
                </div>
                <div>
                    <label>Telefonas:</label>
                    <input type="tel" name="telefonas" onChange={(e) => handleInputChange(e) } value={contact.telefonas} />
                </div>
                <div>
                    <label>Pasirinkite departamentą:</label>
                    <select name="departamentas" onChange={(e) => handleInputChange(e) } value={contact.departamentas}>
                        <option value="1">Pardavimų skyrius</option>
                        <option value="2">Garantinis aptarnavimas</option>
                        <option value="3">Nusiskundimai</option>
                    </select>
                </div>
                <div>
                    <label>Jūsų žinutė:</label>
                    <textarea name="zinute" onChange={(e) => handleInputChange(e) } value={contact.zinute}></textarea>
                </div>
                <div>
                    <button type="submit">Siųsti</button>
                </div>
            </form>
        </>
    )
}

export default Form