import {useState} from 'react'

const Input = () => {
    const [input, setInput] = useState('')
    
    return (
        <>
            <div>
                <input type="text" onChange={(e) => setInput(e.target.value)} value={input} />
            </div>
            {input ? input : 'Neįvestas tekstas'}
        </>
    )
}

export default Input