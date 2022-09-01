import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../MainContext'

const Home = () => {
    const { loggedIn } = useContext(MainContext)
    const [posts, setPosts] = useState([])
    const [alert, setAlert] = useState({
      message: '',
      status: ''
    })
    const [keyword, setKeyword] = useState('')
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()
  
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
      
      axios.delete('/api/posts/delete/' + id)
      .then(resp => {
        setAlert({
          message: resp.data.message,
          status: 'success'
        })
        setRefresh(!refresh)
        
        window.scrollTo(0, 0)
      })
      .catch(error => {
        console.log(error)
        setAlert({
          message: error.response.data,
          status: 'danger'
        })
        window.scrollTo(0, 0)

        if(error.response.status === 401)
          setTimeout(() => navigate('/login'), 2000)
      })
      .finally(() => {
        setTimeout(() => setAlert({
          message: '',
          status: ''
        }), 3000)
      })
      
    }

    const handleSearch = (e) => {
      e.preventDefault()

      if(keyword === '')
        return setRefresh(!refresh)

      axios.get('/api/posts/search/' + keyword)
      .then(resp => {
        setPosts(resp.data)
      })
      .catch(error => {
        console.log(error)
        setAlert({
          message: error.response.data,
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
        <div className="filter mb-5">
          <form onSubmit={handleSearch}>
            <div className="form-group d-flex">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Paieškos frazė" 
                onChange={(e) => setKeyword(e.target.value)}
                onBlur={(e) => {
                  if(keyword === '')
                    setRefresh(!refresh)
                }}
              />
              <button className="btn btn-primary">Ieškoti</button>
            </div>
          </form>
        </div>
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