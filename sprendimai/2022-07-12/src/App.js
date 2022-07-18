import './App.css'
import { useState } from 'react' 

const App = () => {

  const prekes = [
    {pavadinimas: 'Lova', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, aperiam!', image: 'https://www.happybeds.co.uk/cdn-cgi/image/fit=contain,f=auto,width=1000/media/catalog/product/cache/2760f187cb7d1bcdeca5818f247800d3/c/o/cologne_grey_bed_1.jpg'},
    {pavadinimas: 'Kėdė "Lova"', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, aperiam!', image: 'https://www.happybeds.co.uk/cdn-cgi/image/fit=contain,f=auto,width=1000/media/catalog/product/cache/2760f187cb7d1bcdeca5818f247800d3/c/o/cologne_grey_bed_1.jpg'},
    {pavadinimas: 'Dušas', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, aperiam!', image: 'https://www.happybeds.co.uk/cdn-cgi/image/fit=contain,f=auto,width=1000/media/catalog/product/cache/2760f187cb7d1bcdeca5818f247800d3/c/o/cologne_grey_bed_1.jpg'},
    {pavadinimas: 'Stalas', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, aperiam!', image: 'https://www.happybeds.co.uk/cdn-cgi/image/fit=contain,f=auto,width=1000/media/catalog/product/cache/2760f187cb7d1bcdeca5818f247800d3/c/o/cologne_grey_bed_1.jpg'},
    {pavadinimas: 'Projektorius', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, aperiam!', image: 'https://www.happybeds.co.uk/cdn-cgi/image/fit=contain,f=auto,width=1000/media/catalog/product/cache/2760f187cb7d1bcdeca5818f247800d3/c/o/cologne_grey_bed_1.jpg'},
    {pavadinimas: 'Kompiuteris', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, aperiam!', image: 'https://www.happybeds.co.uk/cdn-cgi/image/fit=contain,f=auto,width=1000/media/catalog/product/cache/2760f187cb7d1bcdeca5818f247800d3/c/o/cologne_grey_bed_1.jpg'},
    {pavadinimas: 'Langas', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, aperiam!', image: 'https://www.happybeds.co.uk/cdn-cgi/image/fit=contain,f=auto,width=1000/media/catalog/product/cache/2760f187cb7d1bcdeca5818f247800d3/c/o/cologne_grey_bed_1.jpg'},
    {pavadinimas: 'Žaliuzės', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, aperiam!', image: 'https://www.happybeds.co.uk/cdn-cgi/image/fit=contain,f=auto,width=1000/media/catalog/product/cache/2760f187cb7d1bcdeca5818f247800d3/c/o/cologne_grey_bed_1.jpg'},
    {pavadinimas: 'Špaklius', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, aperiam!', image: 'https://www.happybeds.co.uk/cdn-cgi/image/fit=contain,f=auto,width=1000/media/catalog/product/cache/2760f187cb7d1bcdeca5818f247800d3/c/o/cologne_grey_bed_1.jpg'},
    {pavadinimas: 'Šviestuvas', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, aperiam!', image: 'https://www.happybeds.co.uk/cdn-cgi/image/fit=contain,f=auto,width=1000/media/catalog/product/cache/2760f187cb7d1bcdeca5818f247800d3/c/o/cologne_grey_bed_1.jpg'}
  ]

  const [product, setProduct] = useState('')

  const Card = (props) => {
    return (
      <>
        <div className="image">
          <img src={props.info.image} alt="" />
        </div>
        <div className="title">
          <h3>{props.info.pavadinimas}</h3>
        </div>
        <div className="description">
          {props.info.description}
        </div>
      </>
    )
  }

  const Results = () => {
    if(product === '')
      return false

    const result = prekes.filter(el => el.pavadinimas.toLowerCase().includes(product.toLowerCase()))
    
    const cards = result.map((data, key) => <Card key={key} info={data} />)

    return cards.length > 0 ? cards : 'Rezultatų nėra'
  }

  return (
    // <> Parenthesis
    <>
      <div className="searchField">
        <label>Įveskite prekės pavadinimą:</label>
        <input type="text" onChange={ (e) => setProduct(e.target.value) } />
      </div>
      <div className="searchResults">
        <Results />
      </div>
    </>
  )
}

export default App
