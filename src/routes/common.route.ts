import CommonController from '../controllers/common.controller';
import AuthMiddleware from '../middleware/auth';
const express = require('express');
const commonRoom = express.Router();
const multer = require('multer');
const app = express();
const path = require('path');

/* const strorage  */
const storage = multer.diskStorage({
    destination: 'src/uploads/img',
    filename: (req: any, file: any, cb: any) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file?.originalname)}`);
    },
});

const upload = multer({ storage: storage });

commonRoom.post(
    '/upload-images',
    AuthMiddleware.Authentication,
    upload.single('avatar'),
    CommonController.uploadImages,
);

commonRoom.get('get-images', express.static('src/uploads/img'));

export default commonRoom;
