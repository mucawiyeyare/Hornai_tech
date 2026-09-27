import multer from 'multer';
import path from 'node:path';
import crypto from 'node:crypto';

const ALLOWED = ['.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg', '.zip', '.txt', '.ppt', '.pptx'];

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!ALLOWED.includes(ext)) return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'File type not allowed'));
    cb(null, true);
  },
});
