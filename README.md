# Trabajo Práctico Desarrollo de Software - Aplicación Backend

## Profesores
- Meca, Adrian
- Tabacman, Ricardo

## Integrantes
- Joaquin Murua
- Valentino Laveggi
- Gabriel Romero (com 304)

---

# ⚙️ TP DSW - Backend App

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)]()
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express&logoColor=white)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)]()
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)]()
[![JWT](https://img.shields.io/badge/JWT-black?style=flat&logo=JSON%20web%20tokens)]()
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=Cloudinary&logoColor=white)]()
[![Mocha](https://img.shields.io/badge/Mocha-8D6748?style=flat&logo=mocha&logoColor=white)]()

Repositorio backend para el Trabajo Práctico de DSW. Esta aplicación es una API RESTful encargada de gestionar los datos de los Puntos de Interés (PDI), manejar la subida de imágenes, asegurar la plataforma y proveer la información al frontend.

🔗 **Frontend asociado:** [TP_DSW_FrontendApp](https://github.com/TU_USUARIO/TU_REPOSITORIO_FRONTEND)

---

## ✨ Características Principales

* **Autenticación Segura (JWT):** Sistema de sesiones manejado mediante cookies `HttpOnly`. Implementa un flujo de rotación de tokens (Access y Refresh Token) para maximizar la seguridad y mejorar la experiencia del usuario.
* **Testing y Calidad de Código:** Suite completa de pruebas unitarias y de integración para garantizar la fiabilidad de los endpoints y controladores (incluyendo *mocks* y *stubs* para aislar la base de datos). Formateo estandarizado con Prettier.
* **Validación Estricta:** Uso de **Zod** a través de un middleware personalizado para asegurar que el `body`, `params` y `query` de cada petición cumplan con los esquemas de datos esperados, retornando errores tipados y semánticos.
* **ORM y Persistencia:** Integración con **MikroORM** para la gestión eficiente de la base de datos MySQL, con sincronización automática de esquemas en desarrollo.
* **Gestión Dinámica de Imágenes:** Integración con **Multer** para archivos temporales/locales y **Cloudinary** para el almacenamiento en la nube cuando se despliega en producción.

## 🛠️ Tecnologías Utilizadas

* **Entorno & Framework:** Node.js, Express.js, TypeScript
* **Base de Datos & ORM:** MySQL, MikroORM
* **Seguridad & Validación:** JSON Web Tokens (JWT), Zod, Cookie Parser
* **Archivos Multimedia:** Multer, Cloudinary SDK
* **Testing:** Mocha, Chai, Sinon (Mocks/Stubs), Supertest

## 🚀 Instalación y Uso Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/Evenaut7/TP_DSW_BackendApp.git
cd TP_DSW_BackendApp
```

### 2. Instalar dependencias
Asegúrate de tener [Node.js](https://nodejs.org/) instalado. Luego ejecuta:
```bash
pnpm install
```

### 3. Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto. Asegúrate de configurar todas las claves necesarias:

```env
# Configuración del Servidor
PORT=3000
NODE_ENV=development
BACKEND_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173

# Base de Datos
DB_NAME=traveldb
DATABASE_URL="mysql://dsw:dsw@localhost:3306/traveldb"

# JWT Secrets (Configúralos en tu config/environment)
ACCESS_TOKEN_SECRET=tu_secreto_access
REFRESH_TOKEN_SECRET=tu_secreto_refresh

# Credenciales de Cloudinary (Para producción)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

### 4. Ejecutar el servidor de desarrollo
El ORM está configurado para actualizar los esquemas automáticamente mediante `syncSchema()`.
```bash
pnpm start:dev
```

## 📜 Scripts Disponibles

El proyecto utiliza `pnpm` como gestor de paquetes. Puedes ejecutar los siguientes comandos:

| Comando | Descripción |
|---|---|
| `pnpm start:dev` | Inicia el servidor en modo desarrollo con recarga automática usando `tsc-watch`. |
| `pnpm test` | Ejecuta la suite completa de pruebas unitarias e integrales con Mocha. |
| `pnpm build` | Compila el proyecto TypeScript a JavaScript en el directorio `/dist`. |
| `pnpm format` | Formatea todo el código fuente utilizando Prettier. |
| `pnpm seed` | Ejecuta el script para poblar la base de datos con datos iniciales. |
| `pnpm geocode` | Ejecuta el script auxiliar para procesar la geolocalización de los PDI. |

## 📡 Endpoints Principales

*(Nota: Muchas rutas requieren de autenticación vía cookie y pasan por la validación de Zod antes de alcanzar el controlador).*

### Gestión de Puntos de Interés
| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/puntosDeInteres` | Obtiene la lista de todos los PDI. |
| `POST` | `/api/puntosDeInteres` | Crea un nuevo Punto de Interés (Protegido por Zod/Auth). |

### Gestión de Imágenes (`multipart/form-data`)
| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/imagenes` | Sube una nueva imagen y retorna la URL generada. |
| `PUT` | `/api/imagenes/:id` | Reemplaza una imagen existente. |
| `DELETE`| `/api/imagenes/:id` | Elimina una imagen del almacenamiento. |

## 📁 Estructura del Proyecto

```text
src/
├── controllers/    # Controladores (lógica de negocio por endpoint)
├── routes/         # Definición de rutas Express
├── models/         # Entidades de MikroORM (*.entity.ts)
├── middlewares/    # Funciones intermedias (sessionData.ts, schemaValidator.ts)
├── shared/         # Configuración global, seeders y utilidades (MikroORM, Multer)
├── tests/          # Archivos de pruebas unitarias e integrales (*.test.ts)
└── app.ts          # Punto de entrada y configuración de middlewares globales
```

---
*Proyecto desarrollado para la cátedra de Desarrollo de Software (DSW).*
