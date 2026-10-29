import Link from 'next/link';
import estilos from '../styles/Dashboard.module.css';

export default function Inicio() {
  return (
    <div className={estilos.contenedor}>
      <header className={estilos.encabezado}>
        <h1>Registro de Asistencia - CECyT 9</h1>
        <p>¡Bienvenido al sistema! Desde aquí puedes consultar los módulos disponibles.</p>
      </header>

      <section className={estilos.modulos}>
        <h2>Módulos</h2>
        <p>Elige qué quieres consultar:</p>
        <div className={estilos.tarjetas}>
          <article className={estilos.tarjeta}>
            <h3>Usuarios</h3>
            <p>Lista de usuarios registrados en el sistema.</p>
            <Link className={`${estilos.boton} ${estilos.usuarios}`} href="/usuarios">Ver usuarios</Link>
          </article>
          <article className={estilos.tarjeta}>
            <h3>Talleres</h3>
            <p>Talleres disponibles, lugares libres e inscripción.</p>
            <Link className={`${estilos.boton} ${estilos.talleres}`} href="/talleres">Ver talleres</Link>
          </article>
          <article className={estilos.tarjeta}>
            <h3>Asistencias</h3>
            <p>Alumnos inscritos en cada taller.</p>
            <Link className={`${estilos.boton} ${estilos.asistencia}`} href="/asistencias">Ver asistencias</Link>
          </article>
        </div>
      </section>

      <footer className={estilos.pie}>
        <p>
          ¿Quieres ver tus talleres? Entra a <Link href="/perfil">Mi perfil</Link>. También están la{' '}
          <Link href="/practica/1">práctica de ruta dinámica</Link> y el <Link href="/mini-servidor">mini-servidor</Link>.
        </p>
      </footer>
    </div>
  );
}
