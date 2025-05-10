import React from 'react';
import { BrowserRouter,Routes , Route } from 'react-router-dom';
import CreateEvent from "./components/CreateEvent.js"; 
import Login from "./components/Auth/Login.js";
import Signup from "./components/Auth/Signup.js";
import PrivateRoute from "./components/Auth/PrivateRoute.js";
function App() {
  return (
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<Login />} />
   <Route path="/signup" element={<Signup />} />
   <Route 
   path="/create"
   element={
    <PrivateRoute>
      <CreateEvent />
    </PrivateRoute>
   } />
   </Routes>
   </BrowserRouter>
  );
}
export default App;
