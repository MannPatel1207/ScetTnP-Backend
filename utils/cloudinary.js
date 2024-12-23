const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ScetTnP',
        allowed_formats: ['jpg', 'jpeg', 'png'], // `allowed_formats` should be in snake_case
        transformation: [{ width: 500, height: 500, crop: 'limit' }], // Optional transformations
    },
});

// Multer configuration
const upload = multer({ storage });

// imageUpload function
const imageUpload = (path) => (req, res, next) => {
    // Use Multer middleware to handle file uploads
    upload.array(path)(req, res, (err) => {
        if (err) {
            // Handle errors during file upload
            return res.status(400).json({ message: "File upload error", error: err });
        }
        
        // Ensure `req.files` is populated with the uploaded files
        if (req.files) {
            req.files = req.files.map(file => ({
                filename: file.filename,
                path: file.path
            }));
        } else {
            req.files = []; // No files uploaded
        }

        // Proceed to the next middleware or route handler
        next();
    });
};

module.exports = { storage, imageUpload };
