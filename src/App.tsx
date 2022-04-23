import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GlobalLayout } from './components/GlobalLayout';
import Mono from './pages/Main';
import Unknown from './pages/Unknown/Unknown';
import { globalStyles } from './utils/globalStyles';

const App = () => {
  globalStyles();
  return (
    <Routes>
      <Route path='/' element={<GlobalLayout />}>
        <Route index element={<Mono />} />
        <Route path='*' element={<Unknown />} />
      </Route>
    </Routes>
  );
};

export default App;
