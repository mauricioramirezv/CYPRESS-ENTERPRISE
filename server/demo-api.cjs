const initialUsers = () => [
  { id: 1, name: 'Ana', email: 'ana@example.com' },
  { id: 2, name: 'Bruno', email: 'bruno@example.com' },
];
function createDemoApi() {
  let users = initialUsers();
  return async (req, res, next) => {
    const path = new URL(req.url, 'http://localhost').pathname;
    if (!path.startsWith('/api/')) return next();
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('Cache-Control', 'no-store');
    const send = (status, data) => {
      res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(data));
    };
    try {
      let body = {};
      if (req.method === 'POST') {
        let raw = '';
        for await (const chunk of req) {
          raw += chunk;
          if (Buffer.byteLength(raw) > 100000) return send(413, { error: 'Solicitud demasiado grande' });
        }
        body = JSON.parse(raw || '{}');
        if (!body || typeof body !== 'object' || Array.isArray(body)) return send(400, { error: 'JSON inválido' });
      }
      if (path === '/api/login' && req.method === 'POST') {
        if (typeof body.username !== 'string' || typeof body.password !== 'string' || !body.username.trim() || !body.password) return send(400, { error: 'Complete usuario y contraseña' });
        if (body.username === 'admin' && body.password === 'admin123') return send(200, { user: { username: 'admin' }, message: 'Inicio de sesión exitoso' });
        return send(401, { error: 'Credenciales inválidas' });
      }
      if (path === '/api/users' && req.method === 'GET') return send(200, users);
      if (path === '/api/users' && req.method === 'POST') {
        if (typeof body.name !== 'string' || !body.name.trim() || typeof body.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return send(400, { error: 'Nombre y correo válidos son obligatorios' });
        const user = { id: Math.max(0, ...users.map(u => u.id)) + 1, name: body.name.trim(), email: body.email };
        users.push(user); return send(201, user);
      }
      if (path === '/api/reset' && req.method === 'POST') { users = initialUsers(); return send(200, { message: 'Datos restablecidos' }); }
      return send(404, { error: 'Ruta no encontrada' });
    } catch (error) {
      send(error instanceof SyntaxError ? 400 : 500, { error: error instanceof SyntaxError ? 'JSON inválido' : 'Error interno' });
    }
  };
}
module.exports = { createDemoApi };
