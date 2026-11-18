
const API_URL = 'http://localhost:3000';

export const AuthService = {

  async login(nombreUsuario: string, password: string) {

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombreUsuario,
        password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || 'Usuario o contraseña incorrectos'
      );
    }

    localStorage.setItem('token', data.access_token);

    return data;
  },

  logout() {
    localStorage.removeItem('token');
  },

  getToken() {
    return localStorage.getItem('token');
  }

};
