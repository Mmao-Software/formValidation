import React from 'react';
import { Routes , Route} from 'react-router-dom'

// pages
import Signup from './Signup';
import Homepage from './homepage';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  return(
    <>
      <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/Signup' element={<Signup />}/>
          <Route path='/Login' element={<Login />}/>
          <Route path='/Dashboard' element={<Dashboard />}/>
      </Routes>
    </>
  )
}

export default App;
