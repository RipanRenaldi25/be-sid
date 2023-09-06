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
            const isDocumentsExists = requestedDocuments!.documents.every(document => fs.existsSync(`${document.url}`));
            if(!isDocumentsExists){
                throw new NotFoundError('Some document did not exists');
            };

            const zip = new Zipper();
            for(let document of requestedDocuments!.documents) {
                zip.addLocalFile(`${document.url}`);
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

    static async changeStatus(req: express.Request, res: express.Response) {
        try{
            const { requestId } = req.params;
            const { process } = req.body;
            const request = await requestRepository.changeRequest(requestId, process);
            res.status(200).json({
                status: 'success',
                message: 'berhasil mengubah status',
                data: request
            })
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

    static async deleteCompresedDocument (req: express.Request, res: express.Response) {
        try{
            fs.emptyDirSync('compress/');
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

    static async searchRequest(req: express.Request, res: express.Response) {
        try{
            const { keyword, date, status }: {keyword?: string, date?: string, status?: 'unprocessed' | 'processed' | 'completed'} = req.query;
            console.log({keyword, date, status})
            const requests = await requestRepository.getRequestDocumentBySearch({
                keyword,
                date,
                status
            });

            res.status(200).json({
                status: 'success',
                message: 'Request found',
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


}

export default DocumentController;