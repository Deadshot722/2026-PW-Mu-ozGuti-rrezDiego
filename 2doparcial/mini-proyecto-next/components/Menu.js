import Link from 'next/link';

export default function Menu() {
  return (
    <nav aria-label="Navegación principal">
      <Link href="/">Inicio</Link>
      <Link href="/talleres">Talleres</Link>
      <Link href="/usuarios">Usuarios</Link>
      <Link href="/asistencias">Asistencias</Link>
      <Link href="/perfil">Mi perfil</Link>
      <Link href="/alumnos/perfil">Mis inscripciones</Link>
      <Link href="/practica/1">Práctica /1</Link>
      <Link href="/mini-servidor">Mini-servidor</Link>
    </nav>
  );
}
