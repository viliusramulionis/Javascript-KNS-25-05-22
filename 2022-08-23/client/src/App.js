import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([])
  const [alert, setAlert] = useState({
    message: '',
    status: ''
  })
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3000/')
    .then(resp => resp.json())
    .then(resp => { 
      if(resp.message) {
        setAlert({
          message: resp.message,
          status: 'danger'
        })
        return
      }

      setPosts(resp)
    })
  }, [refresh])

  const handleDelete = (id) => {
    if(isNaN(id))
      return
    
    fetch('http://localhost:3000/delete/' + id, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(resp => {
      setAlert({
        message: resp.message,
        status: 'success'
      })
      setRefresh(!refresh)
      window.scrollTo(0, 0)
    })
    .catch(error => {
      console.log(error)
      setAlert({
        message: 'Įvyko serverio klaida',
        status: 'danger'
      })
      window.scrollTo(0, 0)
    })
    .finally(() => {
      setTimeout(() => setAlert({
        message: '',
        status: ''
      }), 3000)
    })
    
  }

  return (
    <div className="container">
      {alert.message && (
        <div className={'alert alert-' + alert.status}>
          {alert.message}
        </div>
      )}
      <div className="articles">
        {posts.length > 0 && posts.map(article => {
          return (
            <div key={article.id} className="box">
              <Link to={'/post/' + article.id} className="article-link">
                <h3>{article.title}</h3>
              </Link>
              <div className="image">
                <Link to={'/post/' + article.id}>
                  <img src={article.image} alt={article.title} />
                </Link>
              </div>
              <div className="controls">
                <Link to={'/post/' + article.id} className="btn btn-success">Skaityti plačiau</Link>
                <Link to={'/edit/' + article.id} className="btn btn-primary">Redaguoti</Link>
                <button onClick={() => handleDelete(article.id)} className="btn btn-danger">Trinti</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
