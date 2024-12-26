import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, fetchUserData } from '../redux/authSlice';
import argentBankLogo from '../assets/img/argentBankLogo.png';


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, userData } = useSelector((state) => state.auth);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (isAuthenticated && token) {
      dispatch(fetchUserData(token));  
    }
  }, [isAuthenticated, token, dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/'); 
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    console.log('Déconnexion en cours...');
    localStorage.removeItem('token');
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuthenticated ? (
          <>
            <span className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {userData?.firstName || 'User'}
            </span>
            <button className="main-nav-item" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Log out
            </button>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
