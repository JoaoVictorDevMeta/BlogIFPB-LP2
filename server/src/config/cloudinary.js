import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.C_API_KEY, 
  api_secret: process.env.C_API_SECRET
});

export default cloudinary;