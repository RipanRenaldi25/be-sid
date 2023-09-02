import { PrismaClient } from "@prisma/client";


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
}

export default RequestRepository