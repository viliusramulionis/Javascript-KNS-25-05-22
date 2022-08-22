import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([])
  const [alert, setAlert] = useState({
    message: '',
    status: ''
  })

  useEffect(() => {
    fetch('http://localhost:3000/')
    .then(resp => resp.json())
    .then(resp => setPosts(resp))
  }, [alert])

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
    })
    .catch(error => {
      console.log(error)
      setAlert({
        message: 'Įvyko serverio klaida',
        status: 'danger'
      })
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
        {posts && posts.map(article => {
          return (
            <div key={article.id} className="box">
              <h3>{article.title}</h3>
              <div className="image">
                <img src={article.image} alt={article.title} />
              </div>
              <button onClick={() => handleDelete(article.id)} className="btn btn-danger">Delete</button>
              <Link to={'/post/' + article.id} className="btn btn-success">Skaityti plačiau</Link>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
