import { Routes, Route, useLocation } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import AddPost from './components/AddPost';
import DisplayPost from './components/DisplayPost';
import Profile from './components/Profile';
import {ChakraProvider} from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';


function App() {
  const location = useLocation();
  return (
    <ChakraProvider exitBeforeEnter>            
      <div className="App">
          <NavBar />      
          <AnimatePresence>  
            <Routes location={location} key={location.key}>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/details/:id" element={<DisplayPost />} />
              <Route exact path="/post" element={<ProtectedRoute component={AddPost} />} />
              <Route exact path="/profile" element={<ProtectedRoute component={Profile} />} />
            </Routes>      
          </AnimatePresence>  
        </div>  
      
    </ChakraProvider>
  );
}

export default App;
