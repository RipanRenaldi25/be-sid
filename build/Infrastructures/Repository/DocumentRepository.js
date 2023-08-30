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
const Document_1 = __importDefault(require("../../Domains/Entities/Documents/Document"));
const InvariantError_1 = __importDefault(require("../../Commons/Exceptions/InvariantError"));
const Utilities_1 = __importDefault(require("../../Commons/Helpers/Utilities"));
class DocumentRepository {
    constructor({ prisma, idGenerator }) {
        this.prisma = prisma;
        this.idGenerator = idGenerator;
    }
    insertDocumentToSpecificUser(payload, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = `doc-${this.idGenerator()}`;
            const document = new Document_1.default(payload);
            const insertedDocument = yield this.prisma.document.create({
                data: Object.assign(Object.assign({ id }, document), { user_id: userId })
            });
            console.log({ insertedDocument: Object.assign({}, insertedDocument) });
            console.log(`insert document invoked ${id}`);
        });
    }
    ;
    insertMultipleDocuments(documents, userId, documentKind) {
        return __awaiter(this, void 0, void 0, function* () {
            const documentsToInsert = documents.map((document) => {
                const id = `doc-${this.idGenerator()}`;
                const [filename] = Utilities_1.default.getFileNameAndExtension(document.originalname)[0];
                return {
                    id,
                    kind: documentKind,
                    name: filename,
                    url: document.path,
                    created_at: `${new Date().toISOString()}`,
                    user_id: userId
                };
            });
            const test = yield this.prisma.document.createMany({
                data: documentsToInsert
            });
            if (!test.count) {
                throw new InvariantError_1.default('Gagal mengupload document');
            }
        });
    }
    ;
}
;
exports.default = DocumentRepository;
