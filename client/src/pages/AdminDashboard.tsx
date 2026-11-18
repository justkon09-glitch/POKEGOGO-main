
import React, { useEffect, useState } from 'react';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonService, PokemonData } from '../services/pokemonService';
import { AuthService } from '../services/authService';
import { SpriteService } from '../services/spriteService';
import { UsuarioService, AdminData } from '../services/usuarioService';

const initialForm: PokemonData = {
  numeroPokedex: 0,
  nombre: '',
  descripcion: '',
  altura: 0,
  peso: 0,
  tipoPrimarioId: 0,
  tipoSecundarioId: undefined,
  habilidadId: 0,
  regionId: undefined,
  habitatId: undefined,
  grupoHuevoId: undefined
};

export const AdminDashboard: React.FC = () => {

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [sprite, setSprite] = useState<string | null>(null);
  const [spriteRemoved, setSpriteRemoved] = useState(false);
  const [mostrarFormularioAdmin, setMostrarFormularioAdmin] = useState(false);

const [adminForm, setAdminForm] = useState<AdminData>({
  nombreUsuario: '',
  correo: '',
  password: ''
});

const [confirmarPassword, setConfirmarPassword] = useState('');
const [cargandoAdmin, setCargandoAdmin] = useState(false);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [pokemonEditando, setPokemonEditando] = useState<number | null>(null);

  const [form, setForm] = useState<PokemonData>(initialForm);

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  // Cargar pokepatas
  const cargarPokemons = async () => {
    try {
      setLoading(true);

      const data = await PokemonService.getAll();

      setPokemons(data);

    } catch (err) {
      console.error(err);
  setPokemons([]);
      setError('No se pudieron cargar los Pokémon');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPokemons();
  }, []);

  // Manejar cambios del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    const { name, value } = e.target;

    const camposNumericos = [
      'numeroPokedex',
      'altura',
      'peso',
      'tipoPrimarioId',
      'tipoSecundarioId',
      'habilidadId',
      'regionId',
      'habitatId',
      'grupoHuevoId'
    ];

    setForm(prev => ({
      ...prev,
      [name]: camposNumericos.includes(name)
        ? (value === '' ? undefined : Number(value))
        : value
    }));
  };
  

  // handle admins
  const handleAdminChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const { name, value } = e.target;

  setAdminForm(prev => ({
    ...prev,
    [name]: value
  }));
};
const registrarAdmin = async (e: React.FormEvent) => {
  e.preventDefault();

  setMensaje('');
  setError('');

  if (
    !adminForm.nombreUsuario.trim() ||
    !adminForm.correo.trim() ||
    !adminForm.password
  ) {
    setError('Todos los campos son obligatorios');
    return;
  }

  if (adminForm.password.length < 8) {
    setError('La contraseña debe tener al menos 8 caracteres');
    return;
  }

  if (adminForm.password !== confirmarPassword) {
    setError('Las contraseñas no coinciden');
    return;
  }

  try {
    setCargandoAdmin(true);

    await UsuarioService.createAdmin(adminForm);

    setMensaje('¡Administrador registrado correctamente!');

    setAdminForm({
      nombreUsuario: '',
      correo: '',
      password: ''
    });

    setConfirmarPassword('');
    setMostrarFormularioAdmin(false);

  } catch (err: any) {
    console.error(err);

    setError(
      err.response?.data?.message ||
      'No se pudo registrar el administrador'
    );

  } finally {
    setCargandoAdmin(false);
  }
};

  // Abrir formulario para agregar
  const abrirFormulario = () => {
    setSpriteRemoved(false);
  setPokemonEditando(null);
  setForm(initialForm);
  setSprite(null);
  setMostrarFormulario(true);
  setMensaje('');
  setError('');
};

  // Abrir formulario para editar
  const editarPokemon = (pokemon: Pokemon) => {
  setPokemonEditando(pokemon.id);

  setForm({
    numeroPokedex: pokemon.numeroPokedex,
    nombre: pokemon.nombre,
    descripcion: pokemon.descripcion || '',
    altura: pokemon.altura,
    peso: pokemon.peso,
    tipoPrimarioId: pokemon.tipoPrimarioId,
    tipoSecundarioId: pokemon.tipoSecundarioId,
    habilidadId: pokemon.habilidadId,
    regionId: pokemon.regionId,
    habitatId: pokemon.habitatId,
    grupoHuevoId: pokemon.grupoHuevoId
  });
setSpriteRemoved(false);
  setSprite(SpriteService.get(pokemon.id));

  setMostrarFormulario(true);
  setMensaje('');
  setError('');
};


const handleSpriteChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  if (!file.type.startsWith('image/')) {
    setError('Selecciona un archivo de imagen válido');
    e.target.value = '';
    return;
  }

  if (file.size > 1024 * 1024) {
    setError('La imagen no puede superar 1 MB');
    e.target.value = '';
    return;
  }

  setSpriteRemoved(false);

  const reader = new FileReader();

  reader.onload = () => {
    setSprite(reader.result as string);
    setError('');
  };

  reader.onerror = () => {
    setError('No se pudo leer la imagen');
  };

  reader.readAsDataURL(file);
};

  // Guardar o actualizar
  const guardarPokemon = async (e: React.FormEvent) => {

    e.preventDefault();

    setMensaje('');
    setError('');

    try {

      if (!form.nombre.trim()) {
        setError('El nombre del Pokémon es obligatorio');
        return;
      }

      if (
        form.numeroPokedex <= 0 ||
        form.tipoPrimarioId <= 0 ||
        form.habilidadId <= 0
      ) {
        setError('Revisa el número, tipo primario y habilidad');
        return;
      }

      if (form.altura < 0 || form.peso < 0) {
        setError('La altura y el peso no pueden ser negativos');
        return;
      }

      let pokemonGuardado: Pokemon;

if (pokemonEditando !== null) {

  pokemonGuardado = await PokemonService.update(
    pokemonEditando,
    form
  );

  setMensaje('¡Pokémon actualizado correctamente!');

} else {

  pokemonGuardado = await PokemonService.create(form);

  setMensaje('¡Pokémon registrado correctamente!');
}

// Save sprite
if (spriteRemoved) {
  SpriteService.delete(pokemonGuardado.id);
} else if (sprite) {
  SpriteService.save(pokemonGuardado.id, sprite);
}


      setMostrarFormulario(false);
      setForm(initialForm);
      setPokemonEditando(null);

      await cargarPokemons();

    } catch (err: any) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        'No se pudo guardar el Pokémon'
      );
    }
  };

  // Eliminar Pokémon
  const eliminarPokemon = async (pokemon: Pokemon) => {

    const confirmar = window.confirm(
      `¿Estas seguro de eliminar a ${pokemon.nombre}?`
    );

    if (!confirmar) return;
setMensaje('');
setError('');
    try {
      await PokemonService.delete(pokemon.id);

      SpriteService.delete(pokemon.id);

      setMensaje(`${pokemon.nombre} fue eliminado correctamente`);

      await cargarPokemons();

    } catch (err: any) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        'No se pudo eliminar el Pokémon'
      );
    }
  };
  

  // Cerrar sesión
  const cerrarSesion = () => {
    AuthService.logout();
    window.location.href = '/admin';
  };

  return (

    <div style={styles.container}>

      {/* ENCABEZADO */}

      <div style={styles.header}>

        <div>
          <h2 style={styles.title}>
            PANEL DE ADMINISTRACIÓN
          </h2>

          <p style={styles.subtitle}>
            GESTIÓN DE REGISTROS POKÉMON
          </p>
        </div>

        <button
          onClick={cerrarSesion}
          style={styles.logoutButton}
        >
          CERRAR SESIÓN
        </button>

      </div>

      {/* MENSAJES */}

      {mensaje && (
        <div style={styles.success}>
          {mensaje}
        </div>
      )}

      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}

      {/* CONTROLES */}

      <div style={styles.toolbar}>

  <div>
    <h3 style={styles.sectionTitle}>
      REGISTRO POKÉMON
    </h3>

    <span style={styles.total}>
      Total registrados: {pokemons.length}
    </span>
  </div>

  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>

    <button
      onClick={() => {
        setMostrarFormularioAdmin(!mostrarFormularioAdmin);
        setError('');
        setMensaje('');
      }}
      style={styles.adminButton}
    >
      + AGREGAR ADMIN
    </button>

    <button
      onClick={abrirFormulario}
      style={styles.addButton}
    >
      + AGREGAR POKÉMON
    </button>

  </div>

</div>

{mostrarFormularioAdmin && (

  <div style={styles.formContainer}>

    <h3 style={styles.formTitle}>
      REGISTRAR NUEVO ADMINISTRADOR
    </h3>

    <form onSubmit={registrarAdmin}>

      <div style={styles.formGrid}>

        <div>
          <label style={styles.label}>
            NOMBRE DE USUARIO *
          </label>

          <input
            type="text"
            name="nombreUsuario"
            value={adminForm.nombreUsuario}
            onChange={handleAdminChange}
            placeholder="Ej. admin2"
            maxLength={60}
            required
            style={styles.input}
          />
        </div>

        <div>
          <label style={styles.label}>
            CORREO ELECTRÓNICO *
          </label>

          <input
            type="email"
            name="correo"
            value={adminForm.correo}
            onChange={handleAdminChange}
            placeholder="admin@rotomdex.com"
            maxLength={150}
            required
            style={styles.input}
          />
        </div>

        <div>
          <label style={styles.label}>
            CONTRASEÑA *
          </label>

          <input
            type="password"
            name="password"
            value={adminForm.password}
            onChange={handleAdminChange}
            placeholder="Mínimo 8 caracteres"
            minLength={8}
            required
            style={styles.input}
          />
        </div>

        <div>
          <label style={styles.label}>
            CONFIRMAR CONTRASEÑA *
          </label>

          <input
            type="password"
            value={confirmarPassword}
            onChange={(e) => setConfirmarPassword(e.target.value)}
            placeholder="Repite la contraseña"
            minLength={8}
            required
            style={styles.input}
          />
        </div>

      </div>

      <div style={styles.formDivider} />

      <div style={styles.formActions}>

        <button
          type="submit"
          disabled={cargandoAdmin}
          style={{
            ...styles.saveButton,
            opacity: cargandoAdmin ? 0.6 : 1
          }}
        >
          {cargandoAdmin
            ? 'REGISTRANDO...'
            : 'REGISTRAR ADMINISTRADOR'}
        </button>

        <button
          type="button"
          onClick={() => {
            setMostrarFormularioAdmin(false);

            setAdminForm({
              nombreUsuario: '',
              correo: '',
              password: ''
            });

            setConfirmarPassword('');
            setError('');
          }}
          style={styles.cancelButton}
        >
          CANCELAR
        </button>

      </div>

    </form>

  </div>

)}

      {/* FORMULARIO */}

{mostrarFormulario && (

  <div style={styles.formContainer}>

    <h3 style={styles.formTitle}>
      {pokemonEditando !== null
        ? 'EDITAR POKÉMON'
        : 'REGISTRAR NUEVO POKÉMON'}
    </h3>

    <form onSubmit={guardarPokemon}>

      {/* SPRITE SECTION */}

      <div style={styles.spriteSection}>

        <div style={styles.spritePreview}>

          {sprite ? (
            <img
              src={sprite}
              alt="Pokemon sprite preview"
              style={styles.spriteImage}
            />
          ) : (
            <div style={styles.noSprite}>
              <span style={{ fontSize: '2.5rem' }}>?</span>
              <span>SIN SPRITE</span>
            </div>
          )}

        </div>

        <div style={{ flex: 1 }}>

          <label style={styles.label}>
            SPRITE DEL POKÉMON
          </label>

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={handleSpriteChange}
            style={styles.fileInput}
          />

          <p style={styles.helpText}>
            Formatos permitidos: PNG, JPG, WEBP y GIF.
            Máximo 1 MB.
          </p>

          {sprite && (
            <button
              type="button"
              onClick={() => {
                  setSprite(null);
                  setSpriteRemoved(true);
                }}
              style={styles.removeSprite}
            >
              ELIMINAR SPRITE
            </button>
          )}

        </div>

      </div>

      <div style={styles.formDivider} />

      {/* BASIC INFORMATION */}

      <h4 style={styles.subTitle}>
        INFORMACIÓN GENERAL
      </h4>

      <div style={styles.formGrid}>

        <div>
          <label style={styles.label}>
            Número de Pokédex *
          </label>

          <input
            type="number"
            name="numeroPokedex"
            value={form.numeroPokedex || ''}
            onChange={handleChange}
            required
            min="1"
            style={styles.input}
          />
        </div>

        <div>
          <label style={styles.label}>
            Nombre *
          </label>

          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej. Pikachu"
            required
            style={styles.input}
          />
        </div>

        <div>
          <label style={styles.label}>
            Altura *
          </label>

          <input
            type="number"
            name="altura"
            value={form.altura || ''}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            style={styles.input}
          />
        </div>

        <div>
          <label style={styles.label}>
            Peso *
          </label>

          <input
            type="number"
            name="peso"
            value={form.peso || ''}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            style={styles.input}
          />
        </div>

      </div>

      <div style={styles.formDivider} />

      {/* CLASSIFICATION */}

      <h4 style={styles.subTitle}>
        CLASIFICACIÓN
      </h4>

      <div style={styles.formGrid}>

        <div>
          <label style={styles.label}>
            ID Tipo primario *
          </label>

          <input
            type="number"
            name="tipoPrimarioId"
            value={form.tipoPrimarioId || ''}
            onChange={handleChange}
            required
            min="1"
            style={styles.input}
          />
        </div>

        <div>
          <label style={styles.label}>
            ID Tipo secundario
          </label>

          <input
            type="number"
            name="tipoSecundarioId"
            value={form.tipoSecundarioId ?? ''}
            onChange={handleChange}
            min="1"
            style={styles.input}
          />
        </div>

        <div>
          <label style={styles.label}>
            ID Habilidad *
          </label>

          <input
            type="number"
            name="habilidadId"
            value={form.habilidadId || ''}
            onChange={handleChange}
            required
            min="1"
            style={styles.input}
          />
        </div>

        <div>
          <label style={styles.label}>
            ID Región
          </label>

          <input
            type="number"
            name="regionId"
            value={form.regionId ?? ''}
            onChange={handleChange}
            min="1"
            style={styles.input}
          />
        </div>

        <div>
          <label style={styles.label}>
            ID Hábitat
          </label>

          <input
            type="number"
            name="habitatId"
            value={form.habitatId ?? ''}
            onChange={handleChange}
            min="1"
            style={styles.input}
          />
        </div>

        <div>
          <label style={styles.label}>
            ID Grupo de huevo
          </label>

          <input
            type="number"
            name="grupoHuevoId"
            value={form.grupoHuevoId ?? ''}
            onChange={handleChange}
            min="1"
            style={styles.input}
          />
        </div>

      </div>

      <div style={styles.formDivider} />

      {/* DESCRIPTION */}

      <h4 style={styles.subTitle}>
        DESCRIPCIÓN
      </h4>

      <textarea
        name="descripcion"
        value={form.descripcion || ''}
        onChange={handleChange}
        placeholder="Describe al Pokémon..."
        style={styles.textarea}
      />

      {/* ACTIONS */}

      <div style={styles.formActions}>

        <button
          type="submit"
          style={styles.saveButton}
        >
          {pokemonEditando !== null
            ? 'GUARDAR CAMBIOS'
            : 'REGISTRAR POKÉMON'}
        </button>

        <button
          type="button"
          onClick={() => {
              setMostrarFormulario(false);
              setSprite(null);
              setSpriteRemoved(false);
              setForm(initialForm);
              setPokemonEditando(null);
              setError('');
              setMensaje('');
            }}
          style={styles.cancelButton}
        >
          CANCELAR
        </button>

      </div>

    </form>

  </div>

)}
      {/* LISTADO */}

      <div style={styles.listContainer}>

        {loading ? (

          <p style={styles.loading}>
            Cargando registros RotomDex...
          </p>

        ) : pokemons.length === 0 ? (

          <p style={styles.loading}>
            No hay Pokémon registrados.
          </p>

        ) : (

          <div style={styles.tableWrapper}>

            <table style={styles.table}>

              <thead>
                <tr>
                  <th style={styles.th}>N.º</th>
                  <th style={styles.th}>POKÉMON</th>
                  <th style={styles.th}>TIPO</th>
                  <th style={styles.th}>HABILIDAD</th>
                  <th style={styles.th}>ACCIONES</th>
                </tr>
              </thead>

              <tbody>

                {pokemons.map(pokemon => (

                  <tr key={pokemon.id}>

                    <td style={styles.td}>
                      {String(pokemon.numeroPokedex).padStart(3, '0')}
                    </td>

                    <td style={{
                      ...styles.td,
                      textTransform: 'capitalize'
                    }}>
                      {pokemon.nombre}
                    </td>

                    <td style={styles.td}>
                      {pokemon.tipoPrimario?.nombre || pokemon.tipoPrimarioId}
                    </td>

                    <td style={styles.td}>
                      {pokemon.habilidad?.nombre || pokemon.habilidadId}
                    </td>

                    <td style={styles.td}>

                      <div style={styles.actions}>

                        <button
                          onClick={() => editarPokemon(pokemon)}
                          style={styles.editButton}
                        >
                          EDITAR
                        </button>

                        <button
                          onClick={() => eliminarPokemon(pokemon)}
                          style={styles.deleteButton}
                        >
                          ELIMINAR
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};



const styles: Record<string, React.CSSProperties> = {

  container: {
    padding: '10px',
    fontFamily: 'monospace',
    color: '#f0f4f8'
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    borderBottom: '2px solid #3a86ff',
    paddingBottom: '15px',
    marginBottom: '20px'
  },

  title: {
    color: '#ffffff',
    fontSize: '1.2rem',
    margin: 0
  },

  subtitle: {
    color: '#829ab1',
    fontSize: '0.7rem'
  },

  logoutButton: {
    background: '#5c1c2b',
    color: '#ff8fa3',
    border: '1px solid #ff4d6d',
    borderRadius: '6px',
    padding: '9px',
    cursor: 'pointer',
    fontFamily: 'monospace'
  },

  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px',
    marginBottom: '20px'
  },

  sectionTitle: {
    color: '#00f5d4',
    fontSize: '1rem',
    margin: '0 0 5px'
  },

  total: {
    color: '#829ab1',
    fontSize: '0.75rem'
  },

  addButton: {
    background: '#00f5d4',
    color: '#102a43',
    border: 'none',
    borderRadius: '7px',
    padding: '12px 15px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: 'monospace'
  },

  formContainer: {
    background: '#102a43',
    border: '2px solid #00f5d4',
    borderRadius: '12px',
    padding: '18px',
    marginBottom: '25px'
  },

  formTitle: {
    color: '#00f5d4',
    fontSize: '1rem',
    marginTop: 0,
    marginBottom: '20px'
  },

  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '15px'
  },

  label: {
    display: 'block',
    color: '#bcccdc',
    fontSize: '0.75rem',
    marginBottom: '7px',
    marginTop: '12px'
  },

  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px',
    background: '#243b53',
    color: '#f0f4f8',
    border: '1px solid #486581',
    borderRadius: '6px',
    outline: 'none',
    fontFamily: 'monospace'
  },

  textarea: {
    width: '100%',
    boxSizing: 'border-box',
    minHeight: '80px',
    padding: '10px',
    background: '#243b53',
    color: '#f0f4f8',
    border: '1px solid #486581',
    borderRadius: '6px',
    resize: 'vertical',
    fontFamily: 'monospace'
  },

  formActions: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    marginTop: '20px'
  },

  saveButton: {
    flex: 1,
    minWidth: '150px',
    background: '#00f5d4',
    color: '#102a43',
    border: 'none',
    borderRadius: '6px',
    padding: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: 'monospace'
  },

  cancelButton: {
    background: '#334e68',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '12px',
    cursor: 'pointer',
    fontFamily: 'monospace'
  },

  listContainer: {
    background: '#102a43',
    border: '1px solid #334e68',
    borderRadius: '10px',
    padding: '10px',
    overflow: 'hidden'
  },

  tableWrapper: {
    width: '100%',
    overflowX: 'auto'
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '0.75rem'
  },

  th: {
    color: '#00f5d4',
    padding: '12px 8px',
    borderBottom: '2px solid #334e68',
    whiteSpace: 'nowrap'
  },

  td: {
    color: '#f0f4f8',
    padding: '12px 8px',
    borderBottom: '1px solid #334e68'
  },

  actions: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap'
  },

  editButton: {
    background: '#243b53',
    color: '#00f5d4',
    border: '1px solid #00f5d4',
    borderRadius: '5px',
    padding: '6px',
    fontSize: '0.65rem',
    cursor: 'pointer'
  },
  adminButton: {
  background: '#7b2cbf',
  color: '#ffffff',
  border: '1px solid #c77dff',
  borderRadius: '7px',
  padding: '12px 15px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontFamily: 'monospace'
},

  deleteButton: {
    background: '#5c1c2b',
    color: '#ff8fa3',
    border: '1px solid #ff4d6d',
    borderRadius: '5px',
    padding: '6px',
    fontSize: '0.65rem',
    cursor: 'pointer'
  },

  loading: {
    textAlign: 'center',
    padding: '30px',
    color: '#00f5d4'
  },

  success: {
    background: '#123d35',
    color: '#00f5d4',
    padding: '12px',
    borderRadius: '7px',
    marginBottom: '15px',
    fontSize: '0.8rem'
  },

  error: {
    background: '#5c1c2b',
    color: '#ff8fa3',
    padding: '12px',
    borderRadius: '7px',
    marginBottom: '15px',
    fontSize: '0.8rem'
  }
  

};
