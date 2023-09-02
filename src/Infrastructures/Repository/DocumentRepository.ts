import { PrismaClient } from "@prisma/client";
import { DocumentType } from "../../Interfaces/Controller/DocumentController";
import Document from "../../Domains/Entities/Documents/Document";
import InvariantError from "../../Commons/Exceptions/InvariantError";
import { v4 } from 'uuid';
import Utilities from "../../Commons/Helpers/Utilities";

class DocumentRepository {
    prisma: PrismaClient
    idGenerator: Function

    constructor({prisma, idGenerator}: {prisma: PrismaClient, idGenerator: Function}) {
        this.prisma = prisma;
        this.idGenerator = idGenerator
    }

    async insertDocumentToSpecificUser (payload: DocumentType, userId: string, requestId = '') {
        const id = `doc-${this.idGenerator()}`;
        const document = new Document(payload);
        await this.prisma.document.create({
            data: {
                id,
                ...document,
                user_id: userId,
                request_id: requestId
            }
        });
    };


    async insertMultipleDocuments(documents: any[], userId: string, documentKind: string) {
        const documentsToInsert = documents.map((document) => {
            const [filename]: string[] | string = Utilities.getFileNameAndExtension(document.originalname)[0];
            return {
                kind: documentKind,
                name: filename,
                url: document.path,
                created_at: `${new Date().toISOString()}`,
                user_id: userId,
            }
        });
        // const test = await this.prisma.document.createMany({
        //     data: documentsToInsert
        // });
        const test = await this.prisma.request.create({
            data: {
                documents: {
                    createMany: {
                        data: documentsToInsert
                    }
                }
            }
        });
        
        
        if(!test){
            throw new InvariantError('Gagal mengupload document');
        }
    };

    async getDocuments (userId: string) {
        const documents = await this.prisma.document.findMany({
            where: {
                user_id: userId
            },
            include: {
                user: true
            }
        });

        return documents;
    }

    async getUrlToDownloadByDocumentKind (userId: string, documentKind: string) {
        const documents = await this.prisma.document.findMany({
            where: {
                AND: [
                    {
                        user_id: userId
                    },
                    {
                        kind: documentKind
                    }
                ]
            },
            include: {
                user: true
            }
        });
        return documents;
    }
};

export default DocumentRepository;