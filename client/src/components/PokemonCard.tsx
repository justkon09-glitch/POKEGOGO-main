import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pokemon } from '../interfaces/pokemon';
import { SpriteService } from '../services/spriteService';
import { SpriteUpload } from './SpriteUpload';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon
}) => {

  const navigate = useNavigate();

  const [sprite, setSprite] = useState(
    () => SpriteService.get(pokemon.id)
  );

  return (
    <div
      onClick={() => navigate(`/pokemons/${pokemon.id}`)}
      style={{
        background: '#ffffff',
        border: '2px solid #bde0fe',
        borderRadius: '12px',
        padding: '14px',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = '#3a86ff';
        e.currentTarget.style.boxShadow = '0 6px 15px rgba(58,134,255,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = '#bde0fe';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
      }}
    >
      {/* Número de Pokédex */}
      <span style={{ 
        color: '#6c757d', 
        fontSize: '0.8rem', 
        fontWeight: 'bold', 
        fontFamily: 'monospace' 
      }}>
        N.º {String(pokemon.numeroPokedex).padStart(3, '0')}
      </span>

      {/* Nombre del Pokémon */}
      <h3 style={{ 
        textTransform: 'capitalize', 
        margin: '8px 0', 
        color: '#1d3557', 
        fontSize: '1.1rem' 
      }}>
        {pokemon.nombre}
      </h3>

      {/* Sprite del Pokémon */}
      <div style={{ margin: '10px 0', minHeight: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {sprite ? (
          <img
            src={sprite}
            alt={pokemon.nombre}
            style={{
              width: '120px',
              height: '120px',
              objectFit: 'contain'
            }}
          />
        ) : (
          <div style={{ color: '#adb5bd', fontSize: '0.85rem', fontStyle: 'italic' }}>
            No sprite available
          </div>
        )}
      </div>

      {/* Subir Sprite */}
      <div style={{ margin: '8px 0' }} onClick={(e) => e.stopPropagation()}>
        <SpriteUpload
          pokemonId={pokemon.id}
          onUpload={() => {
            setSprite(SpriteService.get(pokemon.id));
          }}
        />
      </div>

      {/* Tipos Elementales */}
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '10px' }}>
        {pokemon.tipoPrimario?.nombre && (
          <span style={{ 
            background: '#e0fbfc', 
            color: '#0077b6', 
            border: '1px solid #90e0ef', 
            padding: '2px 8px', 
            borderRadius: '12px', 
            fontSize: '0.75rem', 
            fontWeight: 'bold' 
          }}>
            {pokemon.tipoPrimario.nombre}
          </span>
        )}
        {pokemon.tipoSecundario?.nombre && (
          <span style={{ 
            background: '#e0fbfc', 
            color: '#0077b6', 
            border: '1px solid #90e0ef', 
            padding: '2px 8px', 
            borderRadius: '12px', 
            fontSize: '0.75rem', 
            fontWeight: 'bold' 
          }}>
            {pokemon.tipoSecundario.nombre}
          </span>
        )}
      </div>
    </div>
  );
};