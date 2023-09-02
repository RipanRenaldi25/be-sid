import upload from "../../../../Infrastructures/Multer/Upload";

const documentRoutes = (express: any, controller: any) => {
    const router = express.Router();
    router.get('/:kind', controller.getUrlDocumentKind);
    router.get('/download/:path', controller.downloadSingleDokumen);
    router.post('/', upload.array('document', 10), controller.uploadDocument);
    router.post('/downloads', controller.downloadMultipleDocument);
    router.delete('/compress', controller.deleteCompresedDocument);


    return router;
};

export default documentRoutes;