import upload from "../../../../Infrastructures/Multer/Upload";

const documentRoutes = (express: any, controller: any) => {
    const router = express.Router();
    router.get('/request/:request_id', controller.getRequestedDocument);
    router.get('/requests/search', controller.searchRequest);
    router.get('/requests', controller.getRequests);
    router.post('/', upload.array('document', 10), controller.uploadDocument);
    router.post('/downloads', controller.downloadMultipleDocument);
    router.put('/request/:requestId', controller.changeStatus)
    router.delete('/compress', controller.deleteCompresedDocument);


    return router;
};

export default documentRoutes;