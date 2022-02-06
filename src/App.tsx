import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { GlobalLayout } from './components/GlobalLayout';
import Landing from './pages/Landing/Landing';
import Pokedex from './pages/Pokedex/Pokedex';
import { globalStyles } from './utils/globalStyles';

const App = () => {
  globalStyles();
  return (
    <Routes>
      <Route path='/' element={<GlobalLayout />}>
        <Route index element={<Landing />} />
        <Route path='collection' element={<Pokedex />} />
      </Route>
    </Routes>
  );
};

export default App;
