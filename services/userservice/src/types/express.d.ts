import {User} from "../entity/User";

declare module 'express-serve-static-core' {
    interface Request {
        user?: User | null;
    }
}

export interface UserPayload {
    id: number;
    // Puoi aggiungere altre proprietà se necessario
}
