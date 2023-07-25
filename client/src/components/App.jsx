import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Register from './Register';
import Login from './Login';
import RootPage from './RootPage';
import Home from './Home';
import Compose from './Compose';
import SecretPage from './SecretPage';
import Profile from './Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/compose" element={<Compose />} />
        <Route path="/secret/:secretId" element={<SecretPage />} />
        <Route path="/:uid" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
