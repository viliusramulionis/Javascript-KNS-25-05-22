import './App.css';
import { useState } from 'react'

const App = () => {
  const [sodra, setSodra] = useState({
    year: '',
    name: '',
    gender: 1
  })
  const [retire, setRetire] = useState(0)

  const handleForm = (e) => {
    setSodra({...sodra, [e.target.name]: e.target.value})
  }

  const calculate = (e) => {
    e.preventDefault()
    
    let retirementAge = 65

    if(sodra.gender === 1) {
      if(sodra.year < 1961) 
        retirementAge = 64

      if(sodra.year < 1955)
        retirementAge = 63

      if(sodra.year < 1951)
        retirementAge = 62
    } else {
      if(sodra.year < 1961)
        retirementAge = 64

      if(sodra.year < 1959)
        retirementAge = 63

      if(sodra.year < 1957)
        retirementAge = 62

      if(sodra.year < 1955)
        retirementAge = 61

      if(sodra.year < 1953)
        retirementAge = 60
    }

    setRetire(retirementAge)
  }

  const Response = () => {
    return retire ? <div>Sveiki {sodra.name}, Pagal mūsų skaičiavimus į pensiją galėsite išeiti {retire} metais.</div> : ''
  }

  return (
    <>
      <div className="calculator">
        <form>
          <div>
            <label>Gimimo metai:</label>
            <input type="number" name="year" onChange={(e) => handleForm(e)} />
          </div>
          <div>
            <label>Vardas:</label>
            <input type="text" name="name" onChange={(e) => handleForm(e)} />
          </div>
          <div>
            <label>Lytis:</label>
            <select name="gender" onChange={(e) => handleForm(e)}>
              <option value="1">Vyras</option>
              <option value="2">Moteris</option>
            </select>
          </div>
          <div>
            <button onClick={(e) => calculate(e)}>Skaičiuoti</button>
          </div>
        </form>

        <Response />
      </div>
    </>
  )
}

export default App
