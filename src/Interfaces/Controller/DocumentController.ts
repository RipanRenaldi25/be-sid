import ClientError from "../../Commons/Exceptions/ClientError"
import express from 'express';
import DocumentRepository from "../../Infrastructures/Repository/DocumentRepository";
import prismaClient from "../../Infrastructures/Database/Prisma/PostgreSQL/PrismaClient";
import Zipper from "adm-zip";
import { v4 } from "uuid";
import fs from 'fs-extra';
import NotFoundError from "../../Commons/Exceptions/NotFoundError";
import p from 'path';
import RequestRepository from "../../Infrastructures/Repository/RequestRepository";
const documentRepository = new DocumentRepository({prisma: prismaClient, idGenerator: v4});
const requestRepository = new RequestRepository({prisma: prismaClient});

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
            const { documentKind }: { documentKind: string } = req.body;
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
            }else{
                res.status(500).json({
                    message: err.message
                })

            }
        }
    }
    
    static async downloadMultipleDocument(req: express.Request, res: express.Response) {
        try{
            const { request_id } = req.body;
            const requestedDocuments = await requestRepository.getRequestedDocument(request_id);
            console.log(requestedDocuments);
            const isDocumentsExists = requestedDocuments!.documents.every(document => fs.existsSync(`upload/${document.url}`));
            if(!isDocumentsExists){
                throw new NotFoundError('Some document did not exists');
            };

            const zip = new Zipper();
            for(let document of requestedDocuments!.documents) {
                zip.addLocalFile(`upload/${document.url}`);
            }
            const fileName=`doc-${+new Date()}`;
            const outDir = `compress/`;
            zip.writeZip(`${outDir}/${fileName}.zip`);
            res.download(`${outDir}/${fileName}.zip`);
        }catch(err: any){
            if(err instanceof ClientError){
                res.status(err.statusCode).json({
                    status: 'fail',
                    message: err.message
                });
            }else{
                res.status(500).json({
                    status: 'fail',
                    message: err
                })

            }
        }
    }

    static async deleteCompresedDocument (req: express.Request, res: express.Response) {
        try{
            const { path } = req.body;
            console.log({path});
            if(!fs.existsSync(`compress/${path}`)) {
                throw new NotFoundError('Compressed file did not found');
            }
            fs.removeSync(`compress/${path}`);
            res.status(200).json({
                status: 'success',
                message: 'Compresse document deleted'
            })
        }catch(err: any){
            if(err instanceof ClientError){
                res.status(err.statusCode).json({
                    status: 'fail',
                    message: err.message
                });
            }else{
                res.status(500).json({
                    status: 'fail',
                    message: err
                })

            }
        }
    }

    static async getRequestedDocument (req: express.Request, res: express.Response) {
        try{
            const {request_id} = req.params;
            console.log({request_id});
            const requestedDocument = await requestRepository.getRequestedDocument(request_id);
            
            res.status(200).json({
                status: 'success',
                message: 'Document found',
                data: requestedDocument!.documents
            })

        }catch(err: any){
            if(err instanceof ClientError){
                res.status(err.statusCode).json({
                    status: 'fail',
                    message: err.message
                });
            }else{
                res.status(500).json({
                    status: 'fail',
                    message: err
                })

            }
        }
    }

    static async getRequests (req: express.Request, res:express.Response) {
        try{
            const requests = await requestRepository.getRequests();
            res.status(200).json({
                status: 'success',
                data: requests
            });
        }catch(err: any){
            if(err instanceof ClientError) {
                res.status(err.statusCode).json({
                    status: 'fail',
                    message: err.message
                });
            }else{
                res.status(500).json({
                    status: 'fail',
                    message: `Server error ${err.message}`
                })

            }
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
            }else{
                res.status(500).json({
                    status: 'fail',
                    message: `Server error ${err.message}`
                })

            }
        }
    }

    static async getUrlDocumentKind(req: express.Request, res: express.Response) {
        try{
            const { id }: {id: string} = req.user;
            const { kind } = req.params;
            
            const documentRepository = new DocumentRepository({prisma: prismaClient, idGenerator: v4});
            const documentsPath = await documentRepository.getUrlToDownloadByDocumentKind(id, kind);
            res.status(200).json({
                status: 'success',
                message: 'Document ditemukan',
                documents: documentsPath
            })
        }catch(err: any){
            if(err instanceof ClientError) {
                res.status(err.statusCode).json({
                    status: 'fail',
                    message: err.message
                });
            }else{
                res.status(500).json({
                    status: 'fail',
                    message: `Server error ${err.message}`
                })

            }
        }
    }

    static downloadSingleDokumen (req: express.Request, res: express.Response) {
        try{
            const { path } = req.params;
            if(!fs.existsSync(`upload/${path}`)){
                throw new NotFoundError('Document not found');
            };
            res.download(p.resolve(`upload/${path}`));
        }catch(err: any){
            if(err instanceof ClientError){
                res.status(err.statusCode).json({
                    status: 'fail',
                    message: err.message
                });
            }else {
                res.status(500).json({
                    status: 'fail',
                    message: `Error ${err.message}`
                })
            }
        }
    }


}

export default DocumentController;