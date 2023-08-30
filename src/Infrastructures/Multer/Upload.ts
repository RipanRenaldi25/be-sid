import multer from 'multer';
import Utilities from '../../Commons/Helpers/Utilities';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/');
    },
    filename: (req, file, cb) => {
        const [filename, extension] = Utilities.getFileNameAndExtension(file.originalname);
        cb(null, `${+new Date()}-${filename}.${extension}`);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

export default upload;