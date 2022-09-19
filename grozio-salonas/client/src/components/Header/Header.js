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
                        <h6 className="mb-0">Lukio Bakšio</h6>
                        <span className="text-uppercase fs-7 fw-semibold">Grožio salonų grupė</span>
                    </div>
                </a>

                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 ms-5 justify-content-center mb-md-0">
                    <li>
                        <Link 
                        to="/" 
                        className="nav-link px-2 nav-link-active"
                        >
                            Salonai
                        </Link>
                    </li>
                    <li>
                        <Link 
                        to="/admin" 
                        className="nav-link px-2"
                        >
                            Administratorius
                        </Link>
                        <ul>
                            <li>
                                <Link 
                                    to="/admin/services/" 
                                    className="nav-link px-2"
                                    >
                                        Paslaugos
                                    </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/admin/workers" 
                                    className="nav-link px-2"
                                    >
                                        Darbuotojai
                                    </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/admin/orders" 
                                    className="nav-link px-2"
                                    >
                                        Užsakymai
                                    </Link>
                            </li>
                        </ul>
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