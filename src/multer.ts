import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: './uploads/historias/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

export const uploadHistoriaImage = multer({ storage });