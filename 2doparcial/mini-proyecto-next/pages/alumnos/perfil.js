import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { pedirJSON } from '../../lib/api';
import { formatearFecha, formatearFechaHora, yaPaso } from '../../lib/formato';
import { validarBoleta } from '../../lib/validaciones';
import estilos from '../../styles/Talleres.module.css';

// Versión corta de /perfil: usa la ruta del backend GET /api/alumnos/:boleta/talleres,
// que ya trae las inscripciones de una boleta (sin pedir las asistencias de cada taller).
// Acepta /alumnos/perfil?boleta=2026090001 para abrirla ya con la búsqueda hecha.
export default function PerfilAlumno() {
  const router = useRouter();
  const [boleta, setBoleta] = useState('');
  const [buscada, setBuscada] = useState('');
  const [inscripciones, setInscripciones] = useState([]);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (router.isReady && router.query.boleta) {
      const b = String(router.query.boleta);
      setBoleta(b);
      consultar(b);
    }
  }, [router.isReady, router.query.boleta]);

  async function consultar(valor) {
    setError('');
    setBuscada('');
    const b = valor.trim();
    if (!validarBoleta(b)) return setError('La boleta debe tener 10 dígitos.');

    setCargando(true);
    try {
      setInscripciones(await pedirJSON(`/alumnos/${b}/talleres`));
      setBuscada(b);
    } catch (err) {
      setInscripciones([]);
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  function buscar(e) {
    e.preventDefault();
    consultar(boleta);
  }

  return (
    <main>
      <h1>Mis inscripciones</h1>
      <p>
        Escribe tu boleta para ver los talleres en los que estás inscrito. Para ver también los talleres
        con lugar, usa <Link href="/perfil">Mi perfil</Link>.
      </p>

      <form onSubmit={buscar} className="formulario">
        <input placeholder="Tu boleta (10 dígitos)" value={boleta} onChange={(e) => setBoleta(e.target.value)} />
        <button type="submit" disabled={cargando}>{cargando ? 'Buscando…' : 'Buscar'}</button>
      </form>
      {error && <p className="error">{error}</p>}

      {buscada && inscripciones.length === 0 && <p>La boleta {buscada} no tiene inscripciones.</p>}
      {inscripciones.length > 0 && (
        <div className={estilos.tablaScroll}>
          <table>
            <thead>
              <tr>
                <th>Taller</th>
                <th>Instructor</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Inscrito a nombre de</th>
                <th>Registro</th>
              </tr>
            </thead>
            <tbody>
              {inscripciones.map((t) => (
                <tr key={t.id}>
                  <td><Link href={`/talleres/${t.id}`}>{t.nombre}</Link></td>
                  <td>{t.instructor || 'Por confirmar'}</td>
                  <td>{formatearFecha(t.fecha)}</td>
                  <td>{yaPaso(t.fecha) ? 'Ya pasó' : 'Próximo'}</td>
                  <td>{t.nombre_alumno}</td>
                  <td>{formatearFechaHora(t.fecha_registro)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
