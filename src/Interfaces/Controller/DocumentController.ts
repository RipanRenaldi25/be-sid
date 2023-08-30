import ClientError from "../../Commons/Exceptions/ClientError"
import express from 'express';
import DocumentRepository from "../../Infrastructures/Repository/DocumentRepository";
import prismaClient from "../../Infrastructures/Database/Prisma/PostgreSQL/PrismaClient";
import databaseHelper from "../../Commons/Helpers/DatabaseHelper";
import RegisterUser from "../../Domains/Entities/Users/RegisterUser";
import Document from "../../Domains/Entities/Documents/Document";
import { v4 } from "uuid";
const documentRepository = new DocumentRepository({prisma: prismaClient, idGenerator: v4});

export type DocumentType = {
    name: string,
    kind: string,
    created_at: string,
    url: string,
};

class DocumentController {
    static async uploadDocument(req: express.Request, res: express.Response) {
        try{
            const { id }: { id: string } = req.user;
            const { documentKind } = req.body;
            const documents: any = req.files;
            await documentRepository.insertMultipleDocuments(documents, id, documentKind);
            res.status(200).json({
                status: 'success',
                message: 'Upload succeed'
            });
        }catch(err: any){
            if(err instanceof ClientError){
                res.status(err.statusCode).json({
                    status: 'fail',
                    message: err.message
                });
            }
            res.status(500).json({
                message: err.message
            })
        }
    }

    static async getUrlToDownload (req: express.Request, res: express.Response) {
        try{
            const {id}: {id: string} = req.user;
            const documentRepository = new DocumentRepository({prisma: prismaClient, idGenerator: v4});
            const documentsPath = await documentRepository.getDocuments(id);

            res.send('success');
        }catch(err: any){
            if(err instanceof ClientError) {
                res.status(err.statusCode).json({
                    status: 'fail',
                    message: err.message
                });
            }
            res.status(500).json({
                status: 'fail',
                message: `Server error ${err.message}`
            })
        }
    }

    static async getUrlDocumentKind(req: express.Request, res: express.Response) {
        try{
            const { id }: {id: string} = req.user;
            const { kind } = req.params;
            console.log(kind);
            
            const documentRepository = new DocumentRepository({prisma: prismaClient, idGenerator: v4});
            const documentsPath = await documentRepository.getUrlToDownloadByDocumentKind(id, kind);
            console.log({documentsPath});
            res.send('success');
        }catch(err: any){
            if(err instanceof ClientError) {
                res.status(err.statusCode).json({
                    status: 'fail',
                    message: err.message
                });
            }
            res.status(500).json({
                status: 'fail',
                message: `Server error ${err.message}`
            })
        }
    }

}

export default DocumentController;