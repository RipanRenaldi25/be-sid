"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const Utilities_1 = __importDefault(require("../../Commons/Helpers/Utilities"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/');
    },
    filename: (req, file, cb) => {
        const [filename, extension] = Utilities_1.default.getFileNameAndExtension(file.originalname);
        cb(null, `${+new Date()}-${filename}.${extension}`);
    }
});
const upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});
exports.default = upload;
