import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';
import Error from '../pages/Error404/Error';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
       <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
       <Route path="*" element={<Error />} />
    </Routes>
  </Router>
);

export default AppRoutes;
