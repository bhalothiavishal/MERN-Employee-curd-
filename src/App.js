import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';

const Home = React.lazy(() => import('./views/Home'));
const AddEmployee = React.lazy(() => import('./views/AddEmployee'));
const EditEmployee = React.lazy(() => import('./views/EditEmployee'));

function App() {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route exact path="/" name="Employe List" element={<Home />} />
          <Route exact path="/add-employee" name="Add Employe" element={<AddEmployee />} />
          <Route exact path="/edit-employee" name="Add Employe" element={<EditEmployee />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
