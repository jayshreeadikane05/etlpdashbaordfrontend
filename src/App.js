import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './component/login';
import Home from './component/home';
import Page from './component/layout/page';
import CreateEmailTemplate from './component/dashboard/CreateEmailTemplate';
import Builder from './component/dashboard/Builder';
import Dashboard from './component/dashboard/dashboard';
import { PrivateRoute, PublicRoute } from './component/auth/auth';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

        {/* Protected routes under Page layout */}
        <Route path="/" element={<PrivateRoute><Page /></PrivateRoute>}>
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="create-email-template" element={<CreateEmailTemplate />} />
          <Route path="builder" element={<Builder />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
