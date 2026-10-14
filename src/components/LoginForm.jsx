import { useState } from 'react';
export default function LoginForm({ onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [failed, setFailed] = useState(false);
  const [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault();
    if (!username.trim() || !password) { setFailed(true); setMessage('Complete usuario y contraseña'); return; }
    setBusy(true);
    try {
      const response = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) });
      const result = await response.json();
      setFailed(!response.ok); setMessage(result.message || result.error);
      if (response.ok) onSuccess?.(result.user);
    } catch { setFailed(true); setMessage('No fue posible conectar con el servidor'); }
    finally { setBusy(false); }
  }
  return <section>
    <h1>Ingreso al laboratorio</h1>
    <form onSubmit={submit} noValidate>
      <label htmlFor="username">Usuario</label>
      <input id="username" data-cy="username" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)} />
      <label htmlFor="password">Contraseña</label>
      <input id="password" data-cy="password" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} />
      <button data-cy="login-btn" type="submit" disabled={busy}>{busy ? 'Ingresando…' : 'Ingresar'}</button>
    </form>
    {message && <output data-cy="login-message" role={failed ? 'alert' : undefined} className={failed ? 'error' : ''}>{message}</output>}
  </section>;
}
