# Frontend — Portafolio (Angular)

App Angular del portafolio. En esta rama (`full-stack`) consume la API propia del backend en vez de archivos JSON estáticos, y agrega el panel administrativo en `/admin`.

## Desarrollo local

```bash
npm install
npm start
```

Abre `http://localhost:4200/`. La app recarga automáticamente al guardar cambios. Asegúrate de que el backend esté corriendo (ver [`../backend/README.md`](../backend/README.md)) para que las páginas carguen datos reales.

## Estructura relevante

- `src/app/core/services/portfolio-data.service.ts` — contrato único de acceso a datos (implementado por `ApiDataService`).
- `src/app/core/services/api-data.service.ts` — consume la API REST del backend.
- `src/app/features/admin/` — panel administrativo (`/admin`): resumen, CRUD de proyectos/experiencia/skills y bandeja de mensajes. Sin autenticación por ahora.
- `src/environments/environment.ts` y `environment.development.ts` — configuran `apiUrl` (URL base del backend).

## Build de producción

```bash
npm run build
```

Los artefactos quedan en `dist/portfolio/browser/`.

## Tests unitarios

```bash
npm test
```

## Desplegar (Vercel / Netlify)

Esta carpeta es la raíz del proyecto Angular, así que al configurar el proveedor:

- **Root Directory**: `frontend`
- **Build command**: `npm run build`
- **Output / Publish directory**: `dist/portfolio/browser`

Antes de desplegar, actualiza `apiUrl` en `src/environments/environment.ts` con la URL pública de tu backend, y configura `CORS_ORIGIN` en el backend con la URL pública de este frontend.
