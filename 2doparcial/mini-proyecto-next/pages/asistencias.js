import { useState, useEffect } from 'react';
import Link from 'next/link';
import { pedirJSON } from '../lib/api';
import { formatearFechaHora, ocultarBoleta } from '../lib/formato';
import estilos from '../styles/Talleres.module.css';

export default function AsistenciasPage() {
  const [filas, setFilas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    cargarAsistencias();
  }, []);

  async function cargarAsistencias() {
    try {
      const talleres = await pedirJSON('/talleres');
      // Se piden las asistencias de todos los talleres al mismo tiempo (igual que en /perfil).
      const listas = await Promise.all(talleres.map((t) => pedirJSON(`/talleres/${t.id}/asistencias`)));
      setFilas(talleres.flatMap((t, i) => listas[i].map((a) => ({ ...a, taller: t }))));
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  const texto = busqueda.trim().toLowerCase();
  const visibles = filas.filter((f) => `${f.nombre_alumno} ${f.taller.nombre}`.toLowerCase().includes(texto));

  return (
    <main>
      <h1>Asistencias</h1>

      <input
        className={estilos.buscador}
        type="search"
        placeholder="Buscar por alumno o taller"
        aria-label="Buscar asistencias por alumno o taller"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {cargando && <p>Cargando asistencias…</p>}
      {error && <p className="error">{error}</p>}
      {!cargando && !error && filas.length === 0 && <p>Todavía no hay asistencias registradas.</p>}
      {!cargando && !error && filas.length > 0 && visibles.length === 0 && (
        <p>No hay asistencias que coincidan con la búsqueda.</p>
      )}

      {visibles.length > 0 && (
        <div className={estilos.tablaScroll}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Taller</th>
                <th>Alumno</th>
                <th>Boleta</th>
                <th>Registro</th>
              </tr>
            </thead>
            <tbody>
              {visibles.map((f, i) => (
                <tr key={f.id}>
                  <td>{i + 1}</td>
                  <td><Link href={`/talleres/${f.taller.id}`}>{f.taller.nombre}</Link></td>
                  <td>{f.nombre_alumno}</td>
                  <td>{ocultarBoleta(f.boleta)}</td>
                  <td>{formatearFechaHora(f.fecha_registro)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
