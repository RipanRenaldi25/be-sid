import { DocumentType } from "../../../Interfaces/Controller/DocumentController"
import documentSchema from "./Schema/DocumentSchema";
class Document {
    name: string;
    kind: string;
    url: string;
    created_at: string;
    
    constructor(payload: DocumentType) {
        this.name = payload.name;
        this.kind = payload.kind;
        this.url = payload.url;
        this.created_at = payload.created_at;
    }

    _validate(payload: DocumentType) {
        const result = documentSchema.validate(payload);
        if(result.error){
            throw new Error(result.error.message);
        }
    }
};

export default Document;