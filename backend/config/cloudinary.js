import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";



// We use .replace to remove any possible hidden quotes or spaces
const clean = (val) => val?.replace(/['"]+/g, '').trim();



cloudinary.config({
  cloud_name: clean(process.env.CLOUDINARY_CLOUD_NAME),
  api_key: clean(process.env.CLOUDINARY_API_KEY),
  api_secret: clean(process.env.CLOUDINARY_API_SECRET),
  secure: true
});


try {
    const result = await cloudinary.api.ping();
    console.log("CLOUDINARY PING SUCCESS:", result);
} catch (err) {
    console.log("PING FAILED:", err);
}
// TEST LOG: Run your server and check if this prints correctly
console.log("Cloudinary Check:", {
    name: clean(process.env.CLOUDINARY_CLOUD_NAME),
    key: clean(process.env.CLOUDINARY_API_KEY),
    secret: clean(process.env.CLOUDINARY_API_SECRET)?.slice(0, 4) + "****"
});

export default cloudinary;