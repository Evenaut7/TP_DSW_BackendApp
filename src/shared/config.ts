import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Validar que existan las variables necesarias
const requiredEnvVars = ['JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Variables de entorno faltantes: ${missingEnvVars.join(', ')}\n` +
    `Asegúrate de crear un archivo .env con estas variables.`
  );
}

// Exportar variables de forma tipada y segura
export const config = {
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET as string,
    refreshSecret: process.env.JWT_REFRESH_SECRET as string,
    saltRounds: parseInt(process.env.SALT_ROUNDS || '10', 10),
  },
  server: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  },
};

export default config;