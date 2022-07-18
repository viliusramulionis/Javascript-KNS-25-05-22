import './App.css'
import { useState, useEffect } from 'react'

const App = () => {
  const API_KEY = '2e9b1f46'
  const REQUEST_URL = 'https://www.omdbapi.com/?apikey=' + API_KEY + '&s=Batman&page='
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [movies, setMovies] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setIsLoading(true)

    fetch(REQUEST_URL + page)
    .then(resp => resp.json())
    .then(resp => {
      setIsLoading(false)
      setMovies(resp.Search)
      setTotal(Math.ceil(resp.totalResults / 10))
    })
    .catch(err => {
      setIsLoading(false)
      console.log(err)
      setMovies([])
      setTotal(0)
    })
  }, [page])

  const prev = () => {
    return page > 1 && setPage( page - 1)
  }

  const next = () => {
    return page < total && setPage( page + 1)
  }

  const Pagination = () => {
    return (
      <div className="pagination">
        <button onClick={prev} disabled={page === 1 && 'disabled'}>Ankstesnis</button>
        <span>Esamas puslapis yra {page}</span>
        <button onClick={next} disabled={page === total && 'disabled'}>Sekantis</button>
      </div>
    )
  }

  return (
    <>
      <h1>Filmų sąrašas</h1>
      <div className="grid">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie">
            <div className="image">
              <img src={movie.Poster} alt={movie.Title} />
            </div>
            <div className="title">{movie.Title}</div>
            <div className="year">{movie.Year}</div>
            <div className="type">{movie.Type}</div>
          </div>
        ))}
      </div>
      <div>
        {isLoading ? 'Kraunasi...' : <Pagination />}
      </div>
    </>
  )
}

export default App