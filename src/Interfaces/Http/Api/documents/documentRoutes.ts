import upload from "../../../../Infrastructures/Multer/Upload";

const documentRoutes = (express: any, controller: any) => {
    const router = express.Router();
    router.post('/', upload.array('document', 10), controller.uploadDocument);
    router.get('/:kind', controller.getUrlDocumentKind)

    return router;
};

export default documentRoutes;