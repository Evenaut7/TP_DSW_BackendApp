import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = config.server.nodeEnv === 'production';

if (isProd) {
  cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
  });
}

const storageLocal = multer.diskStorage({
  destination: path.join(__dirname, '..', '..', 'uploads'),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const storageCloud = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'traveldb',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    public_id: (req: any, file: any) => file.originalname.replace(/\.[^.]+$/, ''),
  } as any,
});

export const upload = multer({
  storage: isProd ? storageCloud : storageLocal,
});

export { cloudinary };