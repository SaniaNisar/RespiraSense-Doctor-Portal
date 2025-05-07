const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors({
	origin: "http://localhost:3000", // Adjust this if your frontend runs on a different port
	methods: ["GET", "POST"],
}));

app.use(express.json());

// Create upload directory if not exist
const UPLOADS_DIR = path.join(__dirname, "uploads");

if (!fs.existsSync(UPLOADS_DIR)) {
	fs.mkdirSync(UPLOADS_DIR);
}
app.use("/uploads", express.static(UPLOADS_DIR));

// Multer storage configuration
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, UPLOADS_DIR); // Destination directory
	},
	filename: (req, file, cb) => {
		const filePath = path.join(UPLOADS_DIR, file.originalname);
		if (fs.existsSync(filePath)) {
			// If the file already exists, append a number to make it unique
			const ext = path.extname(file.originalname);
			const baseName = path.basename(file.originalname, ext);
			let counter = 1;

			let newFileName = `${baseName}(${counter})${ext}`;
			while (fs.existsSync(path.join(UPLOADS_DIR, newFileName))) {
				counter++;
				newFileName = `${baseName}(${counter})${ext}`;
			}
			cb(null, newFileName);
		} else {
			// If the file does not exist, save it with its original name
			cb(null, file.originalname);
		}
	},
});

// File filter to accept only certain types
const fileFilter = (req, file, cb) => {
	const allowedTypes = ["image/jpeg", "image/png", "application/pdf", "text/csv"];
	if (allowedTypes.includes(file.mimetype)) {
		cb(null, true); // Accept file
	} else {
		cb(new Error("Invalid file type! Only images, PDFs, and CSVs are allowed."), false);
	}
};

const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// Upload endpoint
app.post("/upload-report", upload.single("file"), (req, res) => {
	if (!req.file) {
		return res.status(400).json({ message: "No file uploaded!" });
	}
	res.status(200).json({
		message: "File uploaded successfully",
		filePath: `/uploads/${req.file.filename}`,
	});
});

// Endpoint to fetch uploaded files
app.get("/uploaded-files", (req, res) => {
	fs.readdir(UPLOADS_DIR, (err, files) => {
		if (err) {
			return res.status(500).json({ message: "Error reading the uploads directory." });
		}

		const fileDetails = files.map((file) => {
			const stats = fs.statSync(path.join(UPLOADS_DIR, file));
			return {
				name: file,
				path: `/uploads/${file}`, // Ensure the correct path to serve files
				date: stats.mtime, // File modification time (upload time)
			};
		});

		res.status(200).json(fileDetails);
	});
});

// Endpoint to serve a specific file for download
app.get("/uploaded-files/:filename", (req, res) => {
	const fileName = req.params.filename;
	const filePath = path.join(UPLOADS_DIR, fileName);

	console.log(`Requested file: ${filePath}`);

	if (!fs.existsSync(filePath)) {
		console.error("File not found:", filePath);
		return res.status(404).send("File not found.");
	}

	res.download(filePath, fileName, (err) => {
		if (err) {
			console.error("Error downloading the file:", err);
			res.status(500).send("File download failed.");
		}
	});
});

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: err.message || "Internal Server Error" });
});

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
