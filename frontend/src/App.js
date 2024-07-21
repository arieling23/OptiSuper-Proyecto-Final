// src/App.js
import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Success from './components/Success';
import PriceOptimization from './components/PriceOptimization';
import SalesPrediction from './components/SalesPrediction';
import ResetPassword from './components/ResetPassword';
import ResetPasswordDone from './components/ResetPasswordDone';
import ResetPasswordConfirm from './components/ResetPasswordConfirm';
import ResetPasswordComplete from './components/ResetPasswordComplete';
import { AuthContext } from './context/AuthContext';
import './App.css';

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/signup';

  useEffect(() => {
    if (user && (location.pathname === '/login' || location.pathname === '/signup')) {
      navigate('/optimize');
    }
  }, [user, location.pathname, navigate]);

  return (
    <div className="App">
      {!isLoginPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/success" element={<Success />} />
        <Route path="/optimize" element={<PriceOptimization />} />
        <Route path="/sales-prediction" element={<SalesPrediction/>} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/reset_password_done" element={<ResetPasswordDone />} />
        <Route path="/reset_password_confirm/:uid/:token" element={<ResetPasswordConfirm />} />
        <Route path="/reset_password_complete" element={<ResetPasswordComplete />} />
      </Routes>
      {!isLoginPage && <Footer />}
    </div>
  );
};

export default App;
