import { useState } from 'react';
import LoginForm from './components/LoginForm';
import './styles.css';
export default function App() {
  const [user, setUser] = useState(null);
  return <main>{user ? <section data-cy="dashboard">
    <h1>Panel de práctica</h1>
    <output data-cy="success-message">Inicio de sesión exitoso</output>
    <p data-cy="welcome">Bienvenido, {user.username}</p>
    <button data-cy="logout-btn" onClick={() => setUser(null)}>Cerrar sesión</button>
  </section> : <LoginForm onSuccess={setUser} />}</main>;
}
