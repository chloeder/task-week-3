// const multer = require("multer");

// // file type
// const FILE_TYPE = {
//   "image/png": "png",
//   "image/jpeg": "jpeg",
//   "image/jpg": "jpg",
//   "image/gif": "gif",
//   "image/webp": "webp",
// };

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // variable to check if file type is valid
//     const isValidFile = FILE_TYPE[file.mimetype];
//     let errorUploadFile = new Error("invalid image type");

//     // check if file is valid
//     if (isValidFile) {
//       errorUploadFile = null;
//     }

//     cb(errorUploadFile, "public/uploads");
//   },
//   filename: function (req, file, cb) {
//     // create unique file name
//     const fileName = file.originalname.split(" ").join("-");
//     const extFile = FILE_TYPE[file.mimetype];
//     const uniqueFileName = `${fileName}-${Date.now()}.${extFile}`;

//     cb(null, uniqueFileName);
//   },
// });

// const upload = multer({ storage });
// module.exports = upload;

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

module.exports = upload;
