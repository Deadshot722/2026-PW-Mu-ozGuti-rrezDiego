import { useState, useEffect } from 'react';
import { pedirJSON } from '../lib/api';
import { ocultarBoleta } from '../lib/formato';
import estilos from '../styles/Talleres.module.css';

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    cargarUsuarios();
  }, []);

  async function cargarUsuarios() {
    try {
      setUsuarios(await pedirJSON('/usuarios'));
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  const texto = busqueda.trim().toLowerCase();
  const visibles = usuarios.filter((u) => `${u.nombre} ${u.correo} ${u.rol}`.toLowerCase().includes(texto));

  return (
    <main>
      <h1>Usuarios</h1>

      <input
        className={estilos.buscador}
        type="search"
        placeholder="Buscar por nombre, correo o rol"
        aria-label="Buscar usuarios por nombre, correo o rol"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {cargando && <p>Cargando usuarios…</p>}
      {error && <p className="error">{error}</p>}
      {!cargando && !error && usuarios.length === 0 && <p>No hay usuarios registrados.</p>}
      {!cargando && !error && usuarios.length > 0 && visibles.length === 0 && (
        <p>No hay usuarios que coincidan con la búsqueda.</p>
      )}

      {visibles.length > 0 && (
        <div className={estilos.tablaScroll}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Boleta</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {visibles.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.nombre}</td>
                  <td>{u.correo}</td>
                  <td>{ocultarBoleta(u.boleta)}</td>
                  <td>{u.rol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
