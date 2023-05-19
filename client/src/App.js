import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import Dashboard from './page/Dashboard';
import ViewSonic from './page/ViewSonic';


const App = () => (
    <Router>
      <Routes>
        <Route exact path="/" element={<ViewSonic/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  );


export default App;
