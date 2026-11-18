
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/authService';
import { PokedexClassicLayout } from '../components/PokedexClassicLayout';

export const AdminLogin: React.FC = () => {

  const navigate = useNavigate();

  const [nombreUsuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault();

    setLoading(true);
    setError('');

    try {

      await AuthService.login(nombreUsuario, password);

      navigate('/admin/dashboard');

    } catch (err) {

      setError(
        err instanceof Error
          ? err.message
          : 'Error al iniciar sesion'
      );

    } finally {
      setLoading(false);
    }
  };

  return (


      <div style={styles.container}>

        <div style={styles.header}>
          <span style={styles.icon}>◉</span>

          <h2 style={styles.title}>
            ROTOMDEX
          </h2>

          <span style={styles.subtitle}>
            SISTEMA DE ADMINISTRACION
          </span>
        </div>

        <div style={styles.divider} />

        <h3 style={styles.heading}>
          ACCESO DE ADMINISTRADOR
        </h3>

        <p style={styles.description}>
          Identificate para acceder al sistema de gestion Pokemon.
        </p>

        <form onSubmit={handleLogin}>

          <label style={styles.label}>
            NOMBRE DE USUARIO
          </label>

          <input
            type="text"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            placeholder="Ingresa tu usuario"
            required
            style={styles.input}
          />

          <label style={styles.label}>
            CONTRASEÑA
          </label>

          <div style={styles.passwordContainer}>

            <input
              type={mostrarPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
              style={styles.passwordInput}
            />

            <button
              type="button"
              onClick={() => setMostrarPassword(!mostrarPassword)}
              style={styles.showButton}
            >
              {mostrarPassword ? 'OCULTAR' : 'VER'}
            </button>

          </div>

          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? 'VERIFICANDO...' : 'INICIAR SESION'}
          </button>

        </form>

        <div style={styles.footer}>
          <span>● SISTEMA PROTEGIDO</span>
          <span>ROTOMDEX v1.0</span>
        </div>

      </div>


  );
};

const styles: Record<string, React.CSSProperties> = {

  container: {
    maxWidth: '420px',
    margin: '20px auto',
    padding: '25px',
    background: '#102a43',
    border: '2px solid #334e68',
    borderRadius: '15px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
    fontFamily: 'monospace'
  },

  header: {
    textAlign: 'center',
    marginBottom: '20px'
  },

  icon: {
    fontSize: '40px',
    color: '#00f5d4'
  },

  title: {
    color: '#f0f4f8',
    letterSpacing: '4px',
    margin: '5px'
  },

  subtitle: {
    color: '#00f5d4',
    fontSize: '10px',
    letterSpacing: '2px'
  },

  divider: {
    height: '2px',
    background: '#334e68',
    margin: '20px 0'
  },

  heading: {
    color: '#00f5d4',
    textAlign: 'center',
    fontSize: '16px'
  },

  description: {
    color: '#829ab1',
    textAlign: 'center',
    fontSize: '12px',
    marginBottom: '25px'
  },

  label: {
    display: 'block',
    color: '#bcccdc',
    fontSize: '12px',
    fontWeight: 'bold',
    marginBottom: '8px',
    marginTop: '18px'
  },

  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px',
    background: '#243b53',
    border: '1px solid #334e68',
    borderRadius: '7px',
    color: '#f0f4f8',
    outline: 'none',
    fontFamily: 'monospace'
  },

  passwordContainer: {
    display: 'flex',
    background: '#243b53',
    border: '1px solid #334e68',
    borderRadius: '7px',
    overflow: 'hidden'
  },

  passwordInput: {
    flex: 1,
    minWidth: 0,
    padding: '12px',
    background: 'transparent',
    border: 'none',
    color: '#f0f4f8',
    outline: 'none',
    fontFamily: 'monospace'
  },

  showButton: {
    background: 'transparent',
    border: 'none',
    color: '#00f5d4',
    cursor: 'pointer',
    fontSize: '10px',
    padding: '0 10px'
  },

  button: {
    width: '100%',
    padding: '13px',
    marginTop: '25px',
    background: '#00f5d4',
    color: '#102a43',
    border: 'none',
    borderRadius: '7px',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    cursor: 'pointer',
    letterSpacing: '1px'
  },

  error: {
    marginTop: '15px',
    padding: '10px',
    background: '#5c1c2b',
    color: '#ff8fa3',
    borderRadius: '7px',
    fontSize: '12px',
    textAlign: 'center'
  },

  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#829ab1',
    fontSize: '9px',
    marginTop: '25px'
  }

};
