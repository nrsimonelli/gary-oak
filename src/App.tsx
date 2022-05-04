import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GlobalLayout } from './components/GlobalLayout';
import RivalDex from './pages/RivalDex';
import Unknown from './pages/Unknown/Unknown';
import { globalStyles } from './utils/globalStyles';

// import firebase from 'firebase/app'
// import 'firebase/firestore'
// import 'firebase/auth'

// import { useAuthState } from 'react-firebase-hooks/auth'
// import { useCollectionData } from 'react-firebase-hooks/firestore'

const App = () => {
  globalStyles();
  return (
    <Routes>
      <Route path='/' element={<GlobalLayout />}>
        <Route index element={<RivalDex />} />
        <Route path='*' element={<Unknown />} />
      </Route>
    </Routes>
  );
};

export default App;
