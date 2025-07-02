import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const currentPath = location.pathname;

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Budget Tracker Logo" />
        <h1>Budget Tracker</h1>
      </div>

      <div className="navbar-links">
        {isLoggedIn ? (
          <>
            {currentPath !== '/dashboard' && (
              <Link to="/dashboard">Dashboard</Link>
            )}
            {currentPath !== '/reports' && (
              <Link to="/reports">Reports</Link>
            )}
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            {currentPath === '/' && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
            {currentPath === '/login' && (
              <>
                <Link to="/">Home</Link>
                <Link to="/register">Register</Link>
              </>
            )}
            {currentPath === '/register' && (
              <>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
              </>
            )}
            {/* For any other route when logged out, show Home only */}
            {currentPath !== '/' && currentPath !== '/login' && currentPath !== '/register' && (
              <>
                <Link to="/">Home</Link>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
