# Cypress Enterprise: laboratorio React + API local

Ejemplos para estudiar pruebas E2E, de API, componentes y accesibilidad. El formulario ahora consulta una API local, muestra errores y permite ingresar a un panel y cerrar la sesión.

## Requisitos

Node.js 22 o 24 LTS, npm y conexión para instalar dependencias y Cypress. Git es opcional si descarga el ZIP.

## Inicio rápido

```powershell
git clone https://github.com/mauricioramirezv/CYPRESS-ENTERPRISE.git
cd CYPRESS-ENTERPRISE
npm ci
npm test
```

Con el ZIP actualizado, abra PowerShell en la carpeta descomprimida y ejecute `npm ci` y `npm test`.

`npm test` ejecuta la comprobación de API con Node, las **13 pruebas E2E** y las **4 pruebas de componentes**. El comando E2E inicia Vite en un puerto disponible y lo cierra al terminar. Los componentes usan su propio servidor de Cypress. No se necesita un servidor abierto para estos comandos.

## Explorar con la interfaz de Cypress

En una terminal:

```powershell
npm run dev
```

En otra terminal, en el mismo proyecto:

```powershell
npm run cy:open
```

```powershell
npm test
```

Seleccione **E2E Testing** para los flujos completos, o **Component Testing** para `LoginForm`. Aplicación: http://127.0.0.1:5173. Credenciales: **admin / admin123**.

## Qué comprueba cada carpeta

| Ruta | Propósito |
| --- | --- |
| `cypress/e2e/regression/` | Ingreso real, respuesta HTTP, panel, saludo y cierre de sesión |
| `cypress/e2e/api/` | Consultar, crear y rechazar usuarios; verificar persistencia en memoria |
| `cypress/e2e/security/` | Rechazo de credenciales y valores concretos de cabeceras |
| `cypress/e2e/ui/` | Campos vacíos y envío con Enter |
| `cypress/e2e/accessibility/` | Comprobaciones automáticas con axe en formulario y panel |
| `cypress/e2e/studio/` | Flujo manual de referencia para compararlo con una grabación |
| `cypress/component/` | Formulario aislado con respuestas simuladas de la API |

## E2E, API y componentes

- **E2E:** el navegador usa React y la API real de este laboratorio. `cy.intercept(...).as('login')` observa la petición sin reemplazar su respuesta; `cy.wait('@login')` espera esa petición.
- **API:** `cy.request()` envía HTTP sin interactuar con la interfaz. Los códigos esperados son 200, 201, 400 y 401 según el caso. Para comprobar un rechazo se usa `failOnStatusCode: false` y se valida explícitamente la respuesta.
- **Componentes:** `cy.mount()` monta `LoginForm` y `cy.intercept()` simula éxito o rechazo. Se verifica el mensaje y si se invocó `onSuccess`.

Todas las pruebas comprueban resultados con `should` o `expect`. Hacer clic por sí solo no demuestra que el ingreso funcionó.

## API de demostración

| Método y ruta | Resultado |
| --- | --- |
| `POST /api/login` | 200 con credenciales válidas; 401 incorrectas; 400 campos faltantes |
| `GET /api/users` | Lista de usuarios |
| `POST /api/users` | 201 con nombre/correo válidos; 400 en caso contrario |
| `POST /api/reset` | Restablece los dos usuarios iniciales para aislar las pruebas |

Los datos se guardan en memoria y se pierden al reiniciar. `/api/reset` es una herramienta didáctica. El ingreso solo cambia el estado de React: **no genera una sesión o token ni protege rutas de la API**. No utilice esta implementación como autenticación de producción.

## Otros comandos

```powershell
npm run test:api
npm run test:e2e
npm run test:component
npm run test:chrome
npm run build
```

`test:chrome` requiere Chrome instalado. `build` genera los archivos estáticos en `dist`; la API es middleware de desarrollo y no forma parte de esos archivos.

Mochawesome guarda reportes HTML/JSON en `mochawesome-report/`. Las capturas de fallas aparecen en `cypress/screenshots/`. Estos archivos y las dependencias están excluidos de Git.

## Actividades para clase

1. Agregue un rechazo por contraseña vacía y compruebe el mensaje.
2. Cree un usuario por API y verifique su correo en la consulta posterior.
3. Simule un error de red en una prueba del componente y compruebe el mensaje de conexión.
4. Grabe un flujo con Cypress Studio, si su instalación lo ofrece, y añada una aserción antes de conservarlo.

Las comprobaciones de cabeceras y credenciales no equivalen a una auditoría de seguridad. axe detecta parte de los problemas de accesibilidad; complete la revisión con teclado y pruebas manuales. Este proyecto no calcula cobertura de código ni métricas de UI Coverage.

## Versiones y solución de problemas

Se mantiene **Cypress 14.5.4 con Vite 5** para conservar la compatibilidad de Component Testing; las versiones exactas están en `package-lock.json`. Use `npm ci`. Actualizar a otra versión mayor requiere revisar la compatibilidad del servidor de componentes.

Si falla la descarga del ejecutable, revise conexión/proxy y ejecute `npx cypress install`, seguido de `npx cypress verify`. Si falla una prueba, revise su aserción, la petición HTTP y la captura antes de agregar esperas fijas.
