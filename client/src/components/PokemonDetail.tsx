import React, { useState } from 'react';
import { Pokemon } from '../interfaces/pokemon';
import { SpriteService } from '../services/spriteService';
import { SpriteUpload } from './SpriteUpload';

interface PokemonDetailProps {
  pokemon: Pokemon;
  onBack: () => void;
}

export const PokemonDetail: React.FC<PokemonDetailProps> = ({
  pokemon,
  onBack
}) => {

  const [sprite, setSprite] = useState(
    () => SpriteService.get(pokemon.id)
  );

  return (
    <div style={{
      padding: '15px',
      color: '#1d3557',
      fontFamily: 'monospace',
      background: '#f4f6f8',
      borderRadius: '12px',
      textAlign: 'left'
    }}>

      {/* Botón Volver */}
      <button
        onClick={onBack}
        style={{
          background: '#3a86ff',
          color: '#ffffff',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '20px',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          fontSize: '0.9rem'
        }}
      >
        Volver a la Pokédex
      </button>

      {/* Información principal */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff',
        padding: '20px',
        borderRadius: '12px',
        border: '2px solid #bde0fe',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
      }}>

        {/* Contenedor del Sprite */}
        <div style={{
          background: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'center',
          minWidth: '180px'
        }}>
          <span style={{ color: '#6c757d', fontWeight: 'bold', fontSize: '0.9rem' }}>
            N.º {String(pokemon.numeroPokedex).padStart(3, '0')}
          </span>

          <div style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
            {sprite ? (
              <img
                src={sprite}
                alt={pokemon.nombre}
                style={{
                  width: '180px',
                  height: '180px',
                  objectFit: 'contain'
                }}
              />
            ) : (
              <div style={{
                width: '180px',
                height: '180px',
                display: 'grid',
                placeItems: 'center',
                color: '#adb5bd',
                fontStyle: 'italic',
                fontSize: '0.85rem'
              }}>
                No sprite available
              </div>
            )}
          </div>

          <SpriteUpload
            pokemonId={pokemon.id}
            onUpload={() => {
              setSprite(SpriteService.get(pokemon.id));
            }}
          />
        </div>

        {/* Nombre y descripción */}
        <div style={{ flex: 1, minWidth: '220px' }}>
          <h1 style={{
            fontSize: '2rem',
            color: '#1d3557',
            textTransform: 'capitalize',
            margin: '0 0 10px'
          }}>
            {pokemon.nombre}
          </h1>

          <p style={{ color: '#495057', fontSize: '0.95rem', lineHeight: '1.4', marginBottom: '15px' }}>
            {pokemon.descripcion || 'Sin descripción disponible.'}
          </p>

          {/* Tipos */}
          <h3 style={{ color: '#3a86ff', fontSize: '0.9rem', margin: '0 0 8px' }}>TIPOS</h3>

          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={typeStyle}>
              {pokemon.tipoPrimario?.nombre || 'Sin tipo'}
            </span>

            {pokemon.tipoSecundario && (
              <span style={typeStyle}>
                {pokemon.tipoSecundario.nombre}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Características */}
      <h2 style={sectionTitle}>CARACTERÍSTICAS</h2>

      <div style={gridStyle}>
        <InfoItem label="Altura" value={`${pokemon.altura} m`} />
        <InfoItem label="Peso" value={`${pokemon.peso} kg`} />
        <InfoItem label="Habilidad" value={pokemon.habilidad?.nombre} />
      </div>

      {/* Datos adicionales */}
      <h2 style={sectionTitle}>INFORMACIÓN GENERAL</h2>

      <div style={gridStyle}>
        <InfoItem
          label="Región"
          value={pokemon.region?.nombre}
        />

        <InfoItem
          label="Hábitat"
          value={pokemon.habitat?.nombre}
        />

        <InfoItem
          label="Grupo huevo"
          value={pokemon.grupoHuevo?.nombre}
        />
      </div>

    </div>
  );
};

// Componente reutilizable para mostrar información
const InfoItem = ({
  label,
  value
}: {
  label: string;
  value?: string | number;
}) => (
  <div style={{
    background: '#ffffff',
    padding: '14px',
    borderRadius: '10px',
    border: '1px solid #dee2e6',
    borderLeft: '4px solid #3a86ff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
  }}>
    <span style={{
      color: '#6c757d',
      fontSize: '0.75rem',
      fontWeight: 'bold'
    }}>
      {label.toUpperCase()}
    </span>

    <h3 style={{
      margin: '6px 0 0',
      color: '#1d3557',
      fontSize: '1rem'
    }}>
      {value ?? 'No registrado'}
    </h3>
  </div>
);

const typeStyle: React.CSSProperties = {
  background: '#e0fbfc',
  color: '#0077b6',
  border: '1px solid #90e0ef',
  padding: '4px 12px',
  borderRadius: '12px',
  fontSize: '0.8rem',
  fontWeight: 'bold'
};

const sectionTitle: React.CSSProperties = {
  color: '#1d3557',
  borderBottom: '2px solid #3a86ff',
  paddingBottom: '6px',
  marginTop: '25px',
  marginBottom: '12px',
  fontSize: '1.1rem'
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: '12px'
};