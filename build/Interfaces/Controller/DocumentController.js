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
const uuid_1 = require("uuid");
const documentRepository = new DocumentRepository_1.default({ prisma: PrismaClient_1.default, idGenerator: uuid_1.v4 });
class DocumentController {
    static uploadDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log({ files: req.files });
                const documents = req.files;
                const { documentKind } = req.body;
                yield documentRepository.insertMultipleDocuments(documents, 'user-123', documentKind);
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
                res.status(500).json({
                    message: err.message
                });
            }
        });
    }
}
exports.default = DocumentController;
