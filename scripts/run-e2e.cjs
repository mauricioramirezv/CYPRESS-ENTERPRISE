const cypress = require('cypress');
async function main() {
  const { createServer } = await import('vite');
  const server = await createServer({ server: { port: 0, host: '127.0.0.1', strictPort: false } });
  await server.listen();
  try {
    const options = { config: { baseUrl: `http://127.0.0.1:${server.httpServer.address().port}` } };
    if (process.argv[2]) options.browser = process.argv[2];
    const result = await cypress.run(options);
    process.exitCode = result.status === 'failed' || result.totalFailed > 0 || !result.totalTests ? 1 : 0;
  } finally { await server.close(); }
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
