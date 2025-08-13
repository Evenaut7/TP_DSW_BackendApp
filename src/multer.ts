import multer from 'multer';
import {ParsedPath, extname} from 'path';

const types = ['image/jpeg', 'image/png']

export const uploadImages = multer({ 
  storage: multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + extname(file.originalname))
    }
  }),
  fileFilter: (req, file, cb) => {
    if(types.includes(file.mimetype)) cb(null, true)
    else cb(new Error(`Solo se permiten los tipos de dato: ${types.join(' ')}`))
  },
  limits: {
    fieldSize: 1024 * 1024 * 10,
    files: 20
  }
});