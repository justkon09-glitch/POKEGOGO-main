
import api from '../api/axios';
import { Pokemon } from '../interfaces/pokemon';

export interface PokemonData {
  numeroPokedex: number;
  nombre: string;
  descripcion?: string;
  altura: number;
  peso: number;

  tipoPrimarioId: number;
  tipoSecundarioId?: number;
  habilidadId: number;
  regionId?: number;
  habitatId?: number;
  grupoHuevoId?: number;
}

// Configuración para enviar el JWT
const authConfig = () => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const PokemonService = {

  // Obtener todos
  getAll: async (): Promise<Pokemon[]> => {
    const response = await api.get<Pokemon[]>('/pokemon');
    return response.data;
  },

  // Obtener uno por ID
  getById: async (id: number): Promise<Pokemon> => {
    const response = await api.get<Pokemon>(`/pokemon/${id}`);
    return response.data;
  },

  // Crear
  create: async (pokemonData: PokemonData): Promise<Pokemon> => {
    const response = await api.post<Pokemon>(
      '/pokemon',
      pokemonData,
      authConfig()
    );

    return response.data;
  },

  // Actualizar
  update: async (
    id: number,
    pokemonData: Partial<PokemonData>
  ): Promise<Pokemon> => {
    const response = await api.patch<Pokemon>(
      `/pokemon/${id}`,
      pokemonData,
      authConfig()
    );

    return response.data;
  },

  // Eliminar
  delete: async (id: number): Promise<void> => {
    await api.delete(
      `/pokemon/${id}`,
      authConfig()
    );
  }

};
