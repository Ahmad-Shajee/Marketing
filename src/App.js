// App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddList from './add-list';
import AddAdvertisement from './add-advertisement';
import Preview from './pre-view';

const App = () => (
  <Routes>
    <Route path="/" element={<AddList />} />
    <Route path="/add-advertisement" element={<AddAdvertisement />} />
    <Route path="/pre-view" element={<Preview />} />
  </Routes>
);

export default App;
