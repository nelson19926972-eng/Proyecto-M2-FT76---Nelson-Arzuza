# Mini Blog

Mini Blog es una API REST sencilla construida con Node.js y Express para gestionar autores y entradas (posts). Está organizada por capas: rutas, controladores, servicios y configuración de base de datos. Incluye pruebas y un archivo SQL de semillas (`seed.sql`).

## Deployment (OpenAPI Swagger UI)

https://proyecto-m2-ft76-nelson-arzuza-production.up.railway.app/api-docs

## Requisitos

- Todos los requisitos y dependencias se encuentran en `package.json' `

## Cómo jecutar en local

1. Clona el repositorio:

```bash
git clone <repo-url>
```

2. Instala dependencias:

```bash
npm install
```

3. Crea la base de datos:

```
# adapta usuario y base de datos según tu entorno
Usa progrestsql (recomendado)
```

4. Configura las variables de entorno creando un archivo `.env`

sigue la configuracion del `.env.example`


5. Inicia la aplicación:

```bash
npm run dev
```

6. Ejecuta las pruebas:

```bash
npm test
```

## Cómo usar 

- Inicia la aplicacion:

```bash
npm run dev
```

- La API expone endpoints REST para gestionar autores y entradas (posts). Desde tu máquina local la base URL es `http://localhost:3000`. Ejemplos básicos (usa `thunder client, insomnia, etc`):

- Listar autores:
`http://localhost:3000/authors`

- Listar posts:
`http://localhost:3000/posts`

- Usa el sawgger para probar todas las rutas (`solo en el navegador`):
`http://localhost:3000/api-docs`

## Cómo funciona

- `index.js` arranca la aplicación y carga la configuración básica.
- `src/server.js` configura Express, middlewares y la conexión al router.
- `src/routers/rutas.js` define las rutas públicas (por ejemplo `/authors`, `/posts`).
- Las rutas delegan en controladores (`src/controllers/*`) que reciben la petición, validan y llaman a los servicios.
- Los servicios (`src/services/*`) contienen la lógica de negocio y usan la capa de acceso a datos en `src/config/db_conect.js` y `src/config/db_init.js`.
- `seed.sql` contiene el esquema y los datos iniciales para la base de datos.
- `src/middlewares/*` contiene middlewares específicos para los métodos (GET, POST, PUT, DELETE) y validaciones.
- Los tests en la carpeta `test/` usan Vitest para comprobar controladores y middlewares.

## Deployment Railway (guia basica)

1. Prepara tu proyecto localmente
- Asegúrate de que tu proyecto tenga esta estructura mínima:
```
mi-api/
├── src/ (o index.js en la raíz)
├── package.json
├── .env (no se sube a git)
├── .gitignore
└── README.md
```

2. Sube tu proyecto a GitHub
```bash
git init
git add . 
git commit -m "Primer commit - API lista para deploy"
git branch -M main
git remote add origin https://github.com/tu-usuario/mi-api.git
git push -u origin main
```

3. Crea una cuenta en Railway
- Ve a railway.app
- Regístrate (recomendado con tu cuenta de GitHub para vincular repos fácilmente)

4. Crea un nuevo proyecto
En el dashboard, click en "New Project"
Selecciona "Deploy from GitHub repo"
Autoriza a Railway el acceso a tus repositorios (si es la primera vez)
Selecciona el repositorio de tu API

Railway detectará automáticamente que es un proyecto Node.js y comenzará el build.

5. Configura las variables de entorno
Si tu API usa variables (.env), agrégalas manualmente en Railway:

Dentro de tu proyecto, ve a la pestaña "Variables"
Click en "New Variable"

Agrega cada una, por ejemplo:
`DATABASE_URL=postgresql://...`
`NODE_ENV=production`

6. Conecta una base de datos
Si tu API necesita una base de datos:

En el mismo proyecto, click en "New" → "Database"
Elige PostgreSQL, MySQL, MongoDB o Redis
Railway generará automáticamente la variable `DATABASE_URL` (o similar) y la puedes referenciar en tu servicio

7. Verifica el build y el deploy

Ve a la pestaña "Deployments"
Railway ejecuta automáticamente:

`npm install`
`npm run dev`

Revisa los logs en tiempo real para confirmar que no hay errores

8. Genera un dominio público

Ve a la pestaña "Settings" del servicio
En la sección "Networking", click en "Generate Domain"
Railway te dará una URL tipo:

`https://mi-api-production.up.railway.app`

9. Prueba tu API en producción
Abrela en el link generado por Railway: `https://mi-api-production.up.railway.app`

10. Deploys automáticos
Por defecto, cada git push a la rama main dispara un nuevo deploy automáticamente. Puedes cambiar esto en Settings → Deploy Triggers si prefieres deploys manuales o desde otra rama.

## Documentación AI

1. EJECUCION DE LA SEED Y CRUD ENDPOINTS

- Prompt:
![pregunta](/src/img/image.png)
- Res AI:
![respuesta](/src/img/image-1.png)
- Código:
![código](/src/img/image-2.png)

- Prompt:
![pregunta](/src/img/image-3.png)
- Res AI:
![respuesta](/src/img/image-4.png)
- Código:
![código](/src/img/image-5.png)

- Prompt:
![pregunta](/src/img/image-6.png)
- Res AI:
![respuesta](/src/img/image-7.png)
- Código:
![código](/src/img/image-8.png)

- Prompt:
![pregunta](/src/img/image-9.png)
- Res AI:
![respuesta](/src/img/image-10.png)
- Código:
![código](/src/img/image-11.png)

- Prompt:
![pregunta](/src/img/image-12.png)
- Res AI:
![respuesta](/src/img/image-13.png)
- Código:
![código](/src/img/image-14.png)

- Prompt:
![pregunta](/src/img/image-15.png)
- Res AI:
![respuesta](/src/img/image-16.png)
- Código:
![código](/src/img/image-17.png)

- Prompt:
![pregunta](/src/img/image-18.png)
- Res AI:
![respuesta](/src/img/image-19.png)
- Código:
![código](/src/img/image-20.png)


2. VALIDACIONES ENDPOINTS (MIDDLEWARES)

- Prompt:
![pregunta](/src/img/image-21.png)
- Res AI:
![respuesta](/src/img/image-22.png)
- Código:
![código](/src/img/image-23.png)

- Prompt:
![pregunta](/src/img/image-24.png)
- Res AI:
![respuesta](/src/img/image-25.png)

- Prompt:
![pregunta](/src/img/image-26.png)
- Res AI:
![respuesta](/src/img/image-27.png)


3. SWAGGER UI (DOCUMENTACION OPENAPI UI)

- Prompt:
![pregunta](/src/img/image-28.png)
- Res AI:
![respuesta](/src/img/image-29.png)
- Código:
![código](/src/img/image-30.png)


4. PEQUEÑAS MODIFICACIONES
- Tambien pedi para la ia algunas pequeñas modificacion de seguridad
para que la aplicacion no se colgara, como por ejemplo:
que al iniciar la base de datos no me duplicara los insert en las tablas
si ya tenia esos datos, o que al actualizar un registro me rellenara la
info por default a los compos que no fueron enviados, me explico, si no
se envia la fecha que tome la fecha actual del sistema.

- Tambien pedi cambios en los codigos que me entregaba para que se ajustara 
mas a mi gusto y algunas cosas las cambie a mano.