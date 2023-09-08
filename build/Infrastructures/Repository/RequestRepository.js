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
const NotFoundError_1 = __importDefault(require("../../Commons/Exceptions/NotFoundError"));
var process;
(function (process) {
    process[process["unprocessed"] = 0] = "unprocessed";
    process[process["processed"] = 1] = "processed";
    process[process["completed"] = 2] = "completed";
})(process || (process = {}));
class RequestRepository {
    constructor({ prisma }) {
        this.prisma = prisma;
    }
    createRequest(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this.prisma.request.create({
                include: {
                    documents: true,
                    requestedBy: true
                }
            });
            return request;
        });
    }
    getRequestedDocument(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this.prisma.request.findUnique({
                where: {
                    request_id: requestId
                },
                include: {
                    documents: true,
                    requestedBy: {
                        select: {
                            name: true,
                            id: true,
                        }
                    }
                }
            });
            if (!(request === null || request === void 0 ? void 0 : request.documents)) {
                throw new NotFoundError_1.default('Document not found');
            }
            return request;
        });
    }
    getRequests() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this.prisma.request.findMany({
                orderBy: [{
                        created_at: 'desc'
                    }],
                include: {
                    requestedBy: true
                }
            });
            return request;
        });
    }
    changeRequest(requestId, process) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this.prisma.request.update({
                where: {
                    request_id: requestId
                },
                data: {
                    processed: process
                },
                include: {
                    documents: true
                }
            });
            return request;
        });
    }
    getRequestDocumentBySearch({ keyword, date, status }) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this.prisma.request.findMany({
                where: {
                    AND: [
                        {
                            requestedBy: {
                                some: {
                                    name: {
                                        contains: keyword ? keyword.toLowerCase() : undefined,
                                        mode: 'insensitive'
                                    }
                                }
                            }
                        },
                        {
                            created_at: {
                                gte: date ? new Date(date + 'T00:00:00').toISOString() : undefined,
                                lte: date ? new Date(date + 'T23:59:59').toISOString() : undefined
                            }
                        },
                        {
                            processed: status ? status : undefined
                        }
                    ]
                },
                include: {
                    requestedBy: true
                }
            });
            return request;
        });
    }
}
exports.default = RequestRepository;
