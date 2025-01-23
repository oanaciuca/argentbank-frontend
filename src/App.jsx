import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Footer from './components/Footer';
import Header from './components/Header';
import User from './pages/User';
import ProtectedRoute from './components/ProtectedRoute';


const App = () => {
  return (
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
          path="/user"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
        </Routes>
        <Footer/>
      </Router>
  );
};

export default App;