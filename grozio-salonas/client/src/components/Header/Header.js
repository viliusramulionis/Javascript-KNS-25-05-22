import { Link } from 'react-router-dom'
import logo from './Logo.svg'
import './Header.css'

const Header = () => {
    return (
        <header className="p-3 text-bg-dark">
            <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    <img src={logo} alt="Beauty Parlor" style={{ maxWidth: '40px' }} />
                    <div className="d-block ms-3 lh-1">
                        <h6 className="mb-0">Eglės Juočienės</h6>
                        <span className="text-uppercase fs-7 fw-semibold">Grožio namai</span>
                    </div>
                </a>

                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 ms-5 justify-content-center mb-md-0">
                    <li>
                        <Link 
                        to="/" 
                        className="nav-link px-2 nav-link-active"
                        >
                            Titulinis
                        </Link>
                    </li>
                    <li>
                        <Link 
                        to="/admin" 
                        className="nav-link px-2"
                        >
                            Administratorius
                        </Link>
                    </li>
                    <li>
                        <Link 
                        to="/admin/saloons/new" 
                        className="nav-link px-2"
                        >
                            Naujas grožio salonas
                        </Link>
                    </li>
                </ul>

                <div className="text-end">
                    <button type="button" className="btn btn-outline-light me-2">Prisijungimas</button>
                    <button type="button" className="btn btn-primary">Registracija</button>
                </div>
            </div>
            </div>
        </header>
    )
}

export default Header