# Gestión de Envíos y Rutas Logísticas — Frontend

Frontend de una plataforma web para la gestión logística de envíos, rutas y transportistas.

La aplicación permite a los usuarios autenticarse, registrar envíos, consultar el estado de sus pedidos y, para los usuarios administradores, gestionar rutas, transportistas y consultar reportes logísticos.

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS
- Recharts
- ESLint

## Funcionalidades

### Autenticación

- Registro de usuarios.
- Inicio de sesión.
- Manejo de autenticación mediante JWT.
- Protección de rutas según autenticación y rol.
- Persistencia del token en el navegador.

### Gestión de envíos

- Creación de nuevos envíos.
- Consulta de envíos.
- Visualización del estado del envío.
- Seguimiento del proceso de entrega.

### Gestión administrativa

- Dashboard administrativo.
- Gestión de transportistas.
- Gestión de rutas.
- Asignación de rutas a envíos.
- Asignación de transportistas.
- Filtrado de envíos por estado.

### Reportes

- Consulta de reportes de envíos.
- Filtros de información.
- Visualización de métricas logísticas.
- Gráficos para facilitar el análisis de información.

## Requisitos previos

Antes de ejecutar el proyecto se requiere tener instalado:

- Node.js
- npm
- Git

El backend de la aplicación debe estar ejecutándose para poder realizar las operaciones que requieren comunicación con la API.

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/felipe-094/logistics-frontend.git