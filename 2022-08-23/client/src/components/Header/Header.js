import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className="container">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <span className="fs-4">Labai įdomios mintys</span>
            </Link>
        
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <Link to="/" className="nav-link" aria-current="page">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/new-post" className="nav-link" aria-current="page">Naujas Straipsnis</Link>
                </li>
            </ul>
            </header>
        </div>
    
    )
}

export default Header