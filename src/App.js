import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateEvent from "./components/CreateEvent.js"; 
import Login from "./components/Auth/Login.js";
import Signup from "./components/Auth/Signup.js";
import Logout from './components/Auth/Logout.js';
import PrivateRoute from "./components/Auth/PrivateRoute.js";
import Dashboard from "./components/Dashboard.js";
function App() {
  return (
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<Login />} />
   <Route path="/login" element={<Login />} />
   <Route path="/signup" element={<Signup />} />
   <Route path="/logout" element={<Logout />} />
   <Route 
   path="/create"
   element={
    <PrivateRoute>
      <CreateEvent />
    </PrivateRoute>
   } />
   <Route path="/dashboard" element={<Dashboard />} />
   </Routes>
   </BrowserRouter>
  );
}

export default App;
