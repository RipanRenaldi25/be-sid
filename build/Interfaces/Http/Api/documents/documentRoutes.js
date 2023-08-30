"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Upload_1 = __importDefault(require("../../../../Infrastructures/Multer/Upload"));
const documentRoutes = (express, controller) => {
    const router = express.Router();
    router.post('/', Upload_1.default.array('document', 10), controller.uploadDocument);
    return router;
};
exports.default = documentRoutes;
