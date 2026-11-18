
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthService } from '../services/authService';

const API_URL = 'http://localhost:3000';

export const ProtectedRoute: React.FC = () => {

  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {

    const verifyAdmin = async () => {

      const token = AuthService.getToken();

      if (!token) {
        setAuthorized(false);
        return;
      }

      try {

        const response = await fetch(`${API_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Sesión inválida');
        }

        const user = await response.json();

        setAuthorized(user.rol === 'ADMIN');

      } catch {
        AuthService.logout();
        setAuthorized(false);
      }
    };

    verifyAdmin();

  }, []);

  if (authorized === null) {
    return (
      <p style={{ color: '#00f5d4', textAlign: 'center' }}>
        Verificando autorización...
      </p>
    );
  }

  return authorized ? <Outlet /> : <Navigate to="/admin" replace />;
};
