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

    async insertDocumentToSpecificUser (payload: DocumentType, userId: string) {
        const id = `doc-${this.idGenerator()}`;
        const document = new Document(payload);
        const insertedDocument = await this.prisma.document.create({
            data: {
                id,
                ...document,
                user_id: userId
            }
        });
        console.log({insertedDocument: {...insertedDocument}});
        console.log(`insert document invoked ${id}`);
    };


    async insertMultipleDocuments(documents: any[], userId: string, documentKind: string) {
        const documentsToInsert = documents.map((document) => {
            const id = `doc-${this.idGenerator()}`;
            const [filename]: string[] | string = Utilities.getFileNameAndExtension(document.originalname)[0];
            return {
                id,
                kind: documentKind,
                name: filename,
                url: document.path,
                created_at: `${new Date().toISOString()}`,
                user_id: userId
            }
        });
        const test = await this.prisma.document.createMany({
            data: documentsToInsert
        });
        if(!test.count){
            throw new InvariantError('Gagal mengupload document');
        }
    };
};

export default DocumentRepository;