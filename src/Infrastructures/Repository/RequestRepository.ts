import { PrismaClient } from "@prisma/client";
import { DateTime } from 'luxon';
import NotFoundError from "../../Commons/Exceptions/NotFoundError";

enum process {
    unprocessed,
    processed,
    completed,
}

type RequestPayloadType = {
    processed?: 'unprocessed' | 'processed' | 'completed',
    type: string
}

class RequestRepository {
    prisma: PrismaClient
    constructor({prisma}: {prisma: PrismaClient}){
        this.prisma = prisma;
    }

    async createRequest (payload: RequestPayloadType) {
        const request = await this.prisma.request.create({
            include: {
                documents: true,
                requestedBy: true
            }
        });
        return request;
    }

    async getRequestedDocument(requestId: string){
        const request = await this.prisma.request.findUnique({
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
        })
        if(!request?.documents){
            throw new NotFoundError('Document not found');
        }

        return request;
    }

    async getRequests() {
        const request = await this.prisma.request.findMany({
            orderBy: [{
                created_at: 'desc'
            }],
            include: {
                requestedBy: true
            }
        });

        return request;
    }

    async changeRequest(requestId: string, process: 'unprocessed' | 'processed' | 'completed'){
        const request = await this.prisma.request.update({
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
    }

    async getRequestDocumentBySearch({keyword, date, status}: {keyword?: string, date?: string, status?: 'unprocessed' | 'processed' | 'completed'}){
        let indonesiaTime;
        if(date){
            indonesiaTime = DateTime.fromFormat(date, 'yyyy-MM-dd', {zone: 'Asia/Jakarta'});
        }
        const gteIso = indonesiaTime ? indonesiaTime.startOf('day').toISO() : undefined
        const letIso = indonesiaTime ? indonesiaTime.endOf('day').toISO() : undefined
        const request = await this.prisma.request.findMany({
            where: {
                AND: [
                    {
                        requestedBy: {
                            some: {
                                name: {
                                    contains: keyword? keyword.toLowerCase() : undefined,
                                    mode: 'insensitive'
                                }
                            }
                        }
                    },
                    {
                        created_at: {
                            gte: date ? gteIso! : undefined,
                            lte: date ? letIso! : undefined
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
    }
}

export default RequestRepository