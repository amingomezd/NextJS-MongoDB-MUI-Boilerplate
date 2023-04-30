import cloudinary from 'cloudinary';

export const uploadPicture = async (filePath) => {
  if (process.env.CLOUDINARY_URL) {
    const { hostname: cloud_name, username: api_key, password: api_secret } = new URL(process.env.CLOUDINARY_URL);

    cloudinary.config({
      cloud_name,
      api_key,
      api_secret
    });
  }

  if (!filePath) {
    return null;
  }

  const image = await cloudinary.uploader.upload(filePath, {
    width: 512,
    height: 512,
    crop: 'fill'
  });
  return image.secure_url;
};
