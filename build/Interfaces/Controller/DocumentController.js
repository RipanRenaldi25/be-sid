"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClientError_1 = __importDefault(require("../../Commons/Exceptions/ClientError"));
const DocumentRepository_1 = __importDefault(require("../../Infrastructures/Repository/DocumentRepository"));
const PrismaClient_1 = __importDefault(require("../../Infrastructures/Database/Prisma/PostgreSQL/PrismaClient"));
const adm_zip_1 = __importDefault(require("adm-zip"));
const uuid_1 = require("uuid");
const fs_extra_1 = __importDefault(require("fs-extra"));
const NotFoundError_1 = __importDefault(require("../../Commons/Exceptions/NotFoundError"));
const path_1 = __importDefault(require("path"));
const RequestRepository_1 = __importDefault(require("../../Infrastructures/Repository/RequestRepository"));
const documentRepository = new DocumentRepository_1.default({ prisma: PrismaClient_1.default, idGenerator: uuid_1.v4 });
const requestRepository = new RequestRepository_1.default({ prisma: PrismaClient_1.default });
class DocumentController {
    static uploadDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.user;
                const { documentKind } = req.body;
                const documents = req.files;
                yield documentRepository.insertMultipleDocuments(documents, id, documentKind);
                res.status(200).json({
                    status: 'success',
                    message: 'Upload succeed'
                });
            }
            catch (err) {
                if (err instanceof ClientError_1.default) {
                    res.status(err.statusCode).json({
                        status: 'fail',
                        message: err.message
                    });
                }
                else {
                    res.status(500).json({
                        message: err.message
                    });
                }
            }
        });
    }
    static downloadMultipleDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { request_id } = req.body;
                const requestedDocuments = yield requestRepository.getRequestedDocument(request_id);
                console.log(requestedDocuments);
                const isDocumentsExists = requestedDocuments.documents.every(document => fs_extra_1.default.existsSync(`upload/${document.url}`));
                if (!isDocumentsExists) {
                    throw new NotFoundError_1.default('Some document did not exists');
                }
                ;
                const zip = new adm_zip_1.default();
                for (let document of requestedDocuments.documents) {
                    zip.addLocalFile(`upload/${document.url}`);
                }
                const fileName = `doc-${+new Date()}`;
                const outDir = `compress/`;
                zip.writeZip(`${outDir}/${fileName}.zip`);
                res.download(`${outDir}/${fileName}.zip`);
            }
            catch (err) {
                if (err instanceof ClientError_1.default) {
                    res.status(err.statusCode).json({
                        status: 'fail',
                        message: err.message
                    });
                }
                else {
                    res.status(500).json({
                        status: 'fail',
                        message: err
                    });
                }
            }
        });
    }
    static deleteCompresedDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { path } = req.body;
                console.log({ path });
                if (!fs_extra_1.default.existsSync(`compress/${path}`)) {
                    throw new NotFoundError_1.default('Compressed file did not found');
                }
                fs_extra_1.default.removeSync(`compress/${path}`);
                res.status(200).json({
                    status: 'success',
                    message: 'Compresse document deleted'
                });
            }
            catch (err) {
                if (err instanceof ClientError_1.default) {
                    res.status(err.statusCode).json({
                        status: 'fail',
                        message: err.message
                    });
                }
                else {
                    res.status(500).json({
                        status: 'fail',
                        message: err
                    });
                }
            }
        });
    }
    static getRequestedDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { request_id } = req.params;
                console.log({ request_id });
                const requestedDocument = yield requestRepository.getRequestedDocument(request_id);
                res.status(200).json({
                    status: 'success',
                    message: 'Document found',
                    data: requestedDocument.documents
                });
            }
            catch (err) {
                if (err instanceof ClientError_1.default) {
                    res.status(err.statusCode).json({
                        status: 'fail',
                        message: err.message
                    });
                }
                else {
                    res.status(500).json({
                        status: 'fail',
                        message: err
                    });
                }
            }
        });
    }
    static getRequests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requests = yield requestRepository.getRequests();
                res.status(200).json({
                    status: 'success',
                    data: requests
                });
            }
            catch (err) {
                if (err instanceof ClientError_1.default) {
                    res.status(err.statusCode).json({
                        status: 'fail',
                        message: err.message
                    });
                }
                else {
                    res.status(500).json({
                        status: 'fail',
                        message: `Server error ${err.message}`
                    });
                }
            }
        });
    }
    static getUrlToDownload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.user;
                const documentRepository = new DocumentRepository_1.default({ prisma: PrismaClient_1.default, idGenerator: uuid_1.v4 });
                const documentsPath = yield documentRepository.getDocuments(id);
                res.send('success');
            }
            catch (err) {
                if (err instanceof ClientError_1.default) {
                    res.status(err.statusCode).json({
                        status: 'fail',
                        message: err.message
                    });
                }
                else {
                    res.status(500).json({
                        status: 'fail',
                        message: `Server error ${err.message}`
                    });
                }
            }
        });
    }
    static getUrlDocumentKind(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.user;
                const { kind } = req.params;
                const documentRepository = new DocumentRepository_1.default({ prisma: PrismaClient_1.default, idGenerator: uuid_1.v4 });
                const documentsPath = yield documentRepository.getUrlToDownloadByDocumentKind(id, kind);
                res.status(200).json({
                    status: 'success',
                    message: 'Document ditemukan',
                    documents: documentsPath
                });
            }
            catch (err) {
                if (err instanceof ClientError_1.default) {
                    res.status(err.statusCode).json({
                        status: 'fail',
                        message: err.message
                    });
                }
                else {
                    res.status(500).json({
                        status: 'fail',
                        message: `Server error ${err.message}`
                    });
                }
            }
        });
    }
    static downloadSingleDokumen(req, res) {
        try {
            const { path } = req.params;
            if (!fs_extra_1.default.existsSync(`upload/${path}`)) {
                throw new NotFoundError_1.default('Document not found');
            }
            ;
            res.download(path_1.default.resolve(`upload/${path}`));
        }
        catch (err) {
            if (err instanceof ClientError_1.default) {
                res.status(err.statusCode).json({
                    status: 'fail',
                    message: err.message
                });
            }
            else {
                res.status(500).json({
                    status: 'fail',
                    message: `Error ${err.message}`
                });
            }
        }
    }
}
exports.default = DocumentController;
