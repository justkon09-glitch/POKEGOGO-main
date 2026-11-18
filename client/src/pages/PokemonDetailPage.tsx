import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonService } from '../services/pokemonService';
import { PokemonDetail } from '../components/PokemonDetail';

export const PokemonDetailPage: React.FC = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    PokemonService.getById(Number(id))
      .then(data => {
        setPokemon(data);
        setLoading(false);
      })
      .catch(() => {
        setError('No se pudo encontrar el Pokémon');
        setLoading(false);
      });

  }, [id]);

  if (loading) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px',
        color: '#1d3557',
        fontFamily: 'monospace',
        fontSize: '1.1rem'
      }}>
        <p>Cargando información Pokémon...</p>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px',
        color: '#e63946',
        fontFamily: 'monospace'
      }}>
        <p style={{ marginBottom: '20px', fontSize: '1.1rem' }}>
          {error || 'Pokémon no encontrado'}
        </p>
        <button
          onClick={() => navigate('/pokemons')}
          style={{
            background: '#3a86ff',
            color: '#ffffff',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'monospace',
            fontWeight: 'bold'
          }}
        >
          Volver a la Pokédex
        </button>
      </div>
    );
  }

  return (
    <PokemonDetail
      pokemon={pokemon}
      onBack={() => navigate('/pokemons')}
    />
  );
};