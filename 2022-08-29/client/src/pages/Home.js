import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = (props) => {
    const { loggedIn } = props
    const [posts, setPosts] = useState([])
    const [alert, setAlert] = useState({
      message: '',
      status: ''
    })
    const [refresh, setRefresh] = useState(false)
  
    useEffect(() => {
      axios.get('/api/posts/')
      .then(resp => { 
        setPosts(resp.data)
      })
      .catch(error => {
        setAlert({
          message: error.response.data,
          status: 'danger'
        })
      })
    }, [refresh])
  
    const handleDelete = (id) => {
      if(isNaN(id) || !loggedIn)
        return
      
      fetch('/api/posts/delete/' + id, {
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
                    <div className="date">
                        <em>{new Date(article.createdAt).toLocaleDateString('lt-LT')}</em>
                    </div>
                    {loggedIn && 
                        <div className="buttons">
                            <Link to={'/edit/' + article.id} className="btn btn-light">Redaguoti</Link>
                            <button onClick={() => handleDelete(article.id)} className="btn btn-light">Trinti</button>
                        </div>
                    }
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
}

export default Home