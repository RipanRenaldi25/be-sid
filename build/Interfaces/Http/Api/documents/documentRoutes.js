"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Upload_1 = __importDefault(require("../../../../Infrastructures/Multer/Upload"));
const documentRoutes = (express, controller) => {
    const router = express.Router();
    router.get('/request/:request_id', controller.getRequestedDocument);
    router.get('/requests/search', controller.searchRequest);
    router.get('/requests', controller.getRequests);
    router.post('/', Upload_1.default.array('document', 10), controller.uploadDocument);
    router.post('/downloads', controller.downloadMultipleDocument);
    router.put('/request/:requestId', controller.changeStatus);
    router.delete('/compress', controller.deleteCompresedDocument);
    return router;
};
exports.default = documentRoutes;
