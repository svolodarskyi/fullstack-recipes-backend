import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { getEnvVar } from '../utils/getEnvVar.js';

cloudinary.config({
  cloud_name: getEnvVar('CLOUDINARY_CLOUD_NAME'),
  api_key: getEnvVar('CLOUDINARY_API_KEY'),
  api_secret: getEnvVar('CLOUDINARY_API_SECRET'),
});

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'recipes' },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        }
      },
    );
    uploadStream.end(file.buffer);
  });
};

export const deleteImage = async (publicId) => {
  await cloudinary.uploader.destroy(publicId);
};

export const uploadRecipeImage = [
  upload.single('image'),
  async (req, res, next) => {
    if (!req.file) return next();
    try {
      const { secure_url, public_id } = await uploadImage(req.file);
      req.body.image = secure_url;
      req.body.imagePublicId = public_id;
      next();
    } catch (err) {
      next(err);
    }
  },
];
