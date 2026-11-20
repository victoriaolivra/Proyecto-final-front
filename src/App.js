import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './Components/Layout/Header';
import Nav from './Components/Layout/Nav';
import Footer from './Components/Layout/Footer.js'


import HomePage from './Pages/HomePage.js';
import ContactoPage from './Pages/ContactoPage';
import GaleriaPage from './Pages/GaleriaPage';
import NosotrosPage from './Pages/NosotrosPage';
import NovedadesPage from './Pages/NovedadesPage';
import ServiciosPage from './Pages/ServiciosPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/galeria" element={<GaleriaPage />} />
          <Route path="/novedades" element={<NovedadesPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;


