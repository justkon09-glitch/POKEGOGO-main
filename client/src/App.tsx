import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { PokedexClassicLayout } from './components/PokedexClassicLayout';
import { PokemonList } from './pages/PokemonList';
import { PokemonDetailPage } from './pages/PokemonDetailPage.tsx';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <PokedexClassicLayout>
              {/* Aquí conservo tu header clásico, puedes quitarlo o editarlo si prefieres */}
              <header style={{
                textAlign: 'center',
                marginBottom: '20px'
              }}>
                <h2 style={{
                  color: '#2b2d42',
                  fontFamily: 'monospace',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontSize: '1.2rem'
                }}>
                  Pokédex - Sistema Activo
                </h2>
              </header>

              <Outlet />
            </PokedexClassicLayout>
          }
        >
          {/* Rutas adaptadas con los cambios de tu amigo */}
          <Route path="/" element={<Navigate to="/pokemons" replace />} />
          <Route path="/pokemons" element={<PokemonList />} />
          <Route path="/pokemons/:id" element={<PokemonDetailPage />} />

          {/* Tus rutas de administrador */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;