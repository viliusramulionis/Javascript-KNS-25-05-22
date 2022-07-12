import './Click.css'
import React, { useState } from 'react'

// const render = () => {
//   //Puslapio perkrovimas
// }

// const setX = (reiksme) => {
//   React.kintamieji.x = reiksme
//   render()
// }

const Click = () => {
  let [x, setX] = useState(true)

  return (
    <>
      <button onClick={() => setX(!x)}>Keisti</button>
      {x ? (<div>Labas Pasauli</div>) : (<div>Ate Pasauli</div>)}
    </>
  )
}

export default Click
