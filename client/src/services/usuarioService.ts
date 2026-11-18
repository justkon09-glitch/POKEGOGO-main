

import apiClient from '../api/axios';

export interface AdminData {
  nombreUsuario: string;
  correo: string;
  password: string;
}

export const UsuarioService = {
  createAdmin: async (data: AdminData) => {
    const response = await apiClient.post('/usuario/admin', data);
    return response.data;
  }
};
