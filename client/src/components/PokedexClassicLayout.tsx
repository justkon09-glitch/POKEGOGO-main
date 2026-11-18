import React from 'react';

interface PokedexLayoutProps {
  children: React.ReactNode;
}

export const PokedexClassicLayout: React.FC<PokedexLayoutProps> = ({ children }) => {
  return (
    <div style={styles.outerContainer}>
      {/* Carcasa Principal Roja (Estilo Libro Abierto) */}
      <div style={styles.pokedexBody}>
        
        {/* --- PANEL IZQUIERDO --- */}
        <div style={styles.leftPanel}>
          {/* Lente Superior y Luces de Estado */}
          <div style={styles.topHeader}>
            <div style={styles.bigLensOuter}>
              <div style={styles.bigLensInner}></div>
            </div>
            <div style={styles.lightsRow}>
              <div style={{ ...styles.light, backgroundColor: '#ff4d6d' }}></div>
              <div style={{ ...styles.light, backgroundColor: '#ffd166' }}></div>
              <div style={{ ...styles.light, backgroundColor: '#06d6a0' }}></div>
            </div>
          </div>

          {/* Pantalla Principal (Donde va tu lista de Pokémon) */}
          <div style={styles.mainScreenFrame}>
            <div style={styles.mainScreenInner}>
              {children}
            </div>
          </div>

          {/* Controles Inferiores Izquierdos (Cruceta y Botón verde) */}
          <div style={styles.controlsRow}>
            <div style={styles.greenButton}></div>
            <div style={styles.dpad}>
              <div style={styles.dpadVertical}></div>
              <div style={styles.dpadHorizontal}></div>
            </div>
          </div>
        </div>

        {/* --- BISAGRA CENTRAL --- */}
        <div style={styles.hinge}></div>

        {/* --- PANEL DERECHO --- */}
        <div style={styles.rightPanel}>
          {/* Pantalla de datos secundarios / táctica */}
          <div style={styles.subScreen}>
            <div style={styles.subScreenText}>SYSTEM v1.0</div>
          </div>

          {/* Botones de cuadrícula azules clásicos */}
          <div style={styles.blueKeypad}>
            {[...Array(10)].map((_, i) => (
              <div key={i} style={styles.blueKey}></div>
            ))}
          </div>

          {/* Botones blancos y amarillos inferiores */}
          <div style={styles.bottomButtonsRow}>
            <div style={styles.whiteKey}></div>
            <div style={styles.whiteKey}></div>
          </div>
          <div style={styles.speakersAndYellow}>
            <div style={styles.yellowLed}></div>
          </div>
        </div>

      </div>
    </div>
  );
};

// Estilos limpios y organizados para simular la Pokédex clásica
const styles: { [key: string]: React.CSSProperties } = {
  outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#0d1b2a',
    padding: '20px',
  },
  pokedexBody: {
    display: 'flex',
    backgroundColor: '#cc0000', // Rojo clásico Pokédex
    borderRadius: '20px',
    padding: '25px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.6), inset 0 5px 15px rgba(255,255,255,0.3)',
    border: '6px solid #800000',
    maxWidth: '950px',
    width: '100%',
    gap: '20px',
  },
  leftPanel: {
    flex: 1.2,
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  topHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  bigLensOuter: {
    width: '60px',
    height: '60px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '3px solid #333',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
  },
  bigLensInner: {
    width: '46px',
    height: '46px',
    backgroundColor: '#00b4d8', // Lente azul brillante de Gen 1
    borderRadius: '50%',
    border: '3px solid #0077b6',
    boxShadow: 'inset 0 4px 6px rgba(255,255,255,0.6)',
  },
  lightsRow: {
    display: 'flex',
    gap: '8px',
  },
  light: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    border: '2px solid #333',
    boxShadow: 'inset 0 2px 3px rgba(255,255,255,0.5)',
  },
  mainScreenFrame: {
    backgroundColor: '#2b2d42',
    borderRadius: '10px 10px 25px 10px',
    padding: '15px',
    border: '4px solid #111',
    boxShadow: 'inset 0 5px 10px rgba(0,0,0,0.5)',
  },
  mainScreenInner: {
    backgroundColor: '#f4f6f8',
    borderRadius: '8px',
    minHeight: '420px',
    maxHeight: '65vh',
    overflowY: 'auto',
    padding: '15px',
  },
  controlsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
  },
  greenButton: {
    width: '45px',
    height: '25px',
    backgroundColor: '#2ec4b6',
    borderRadius: '12px',
    border: '2px solid #111',
    boxShadow: '0 3px 5px rgba(0,0,0,0.3)',
  },
  dpad: {
    width: '70px',
    height: '70px',
    position: 'relative',
    backgroundColor: '#111',
    borderRadius: '6px',
  },
  dpadVertical: {
    position: 'absolute',
    top: '0',
    left: '23px',
    width: '24px',
    height: '70px',
    backgroundColor: '#212529',
    borderRadius: '4px',
  },
  dpadHorizontal: {
    position: 'absolute',
    top: '23px',
    left: '0',
    width: '70px',
    height: '24px',
    backgroundColor: '#212529',
    borderRadius: '4px',
  },
  hinge: {
    width: '25px',
    backgroundColor: '#990000',
    borderRadius: '10px',
    boxShadow: 'inset 3px 0 6px rgba(0,0,0,0.5), inset -3px 0 6px rgba(255,255,255,0.2)',
    border: '2px solid #660000',
  },
  rightPanel: {
    flex: 0.8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: '20px',
  },
  subScreen: {
    backgroundColor: '#111',
    borderRadius: '10px',
    height: '80px',
    padding: '10px',
    border: '3px solid #333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subScreenText: {
    color: '#06d6a0',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    letterSpacing: '1px',
  },
  blueKeypad: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '6px',
    backgroundColor: '#111',
    padding: '10px',
    borderRadius: '8px',
    border: '2px solid #333',
  },
  blueKey: {
    height: '28px',
    backgroundColor: '#00b4d8',
    borderRadius: '4px',
    border: '1px solid #0077b6',
    boxShadow: 'inset 0 2px 3px rgba(255,255,255,0.4)',
  },
  bottomButtonsRow: {
    display: 'flex',
    gap: '10px',
  },
  whiteKey: {
    flex: 1,
    height: '25px',
    backgroundColor: '#e9ecef',
    borderRadius: '12px',
    border: '2px solid #111',
  },
  speakersAndYellow: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: '10px',
  },
  yellowLed: {
    width: '22px',
    height: '22px',
    backgroundColor: '#ffb703',
    borderRadius: '50%',
    border: '2px solid #111',
    boxShadow: 'inset 0 2px 3px rgba(255,255,255,0.6)',
  },
};