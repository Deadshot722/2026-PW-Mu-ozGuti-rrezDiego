import { useEffect, useState } from 'react';

// Página que consume el mini-servidor Express de las semanas 6-7 (GET /saludo y POST /eco).
// next.config.js reenvía /mini/... al servidor, por eso aquí se pide /mini/saludo.
export default function MiniServidor() {
  const [saludo, setSaludo] = useState('');
  const [texto, setTexto] = useState('');
  const [eco, setEco] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/mini/saludo')
      .then((res) => res.json())
      .then((data) => setSaludo(data.mensaje))
      .catch(() => setError('El mini-servidor no responde. Arráncalo con npm start en express-proyecto.'));
  }, []);

  async function enviarEco(e) {
    e.preventDefault();
    setError('');
    setEco('');
    try {
      const res = await fetch('/mini/eco', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto }),
      });
      const data = await res.json();
      if (res.ok) {
        setEco(data.eco);
        setTexto('');
      } else {
        setError(`Error: ${data.error}`);
      }
    } catch {
      setError('El mini-servidor no responde. Arráncalo con npm start en express-proyecto.');
    }
  }

  return (
    <main>
      <h1>Mini-servidor Express</h1>

      <h2>GET /saludo</h2>
      <p>{saludo || 'Cargando…'}</p>

      <h2>POST /eco</h2>
      <form onSubmit={enviarEco} className="formulario">
        <input placeholder="Texto" value={texto} onChange={(e) => setTexto(e.target.value)} />
        <button type="submit">Enviar</button>
      </form>
      {eco && <p>El servidor respondió: {eco}</p>}
      {error && <p className="error">{error}</p>}
    </main>
  );
}
