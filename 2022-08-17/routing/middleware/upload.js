import multer from 'multer'

// konfiguruojam upload funkcija

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../public/images/");
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split(".");
        const uniqueSuffix =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            "." +
            ext[ext.length - 1];
        cb(null, uniqueSuffix);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, next) {
        if (
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/gif"
        ) {
            next(null, true);
        } else {
            next(null, false);
        }
    },
});

export { storage, upload }