import { badData } from "@hapi/boom";
import { ObjectSchema } from "joi";

export function joiValidator(schema: ObjectSchema, property: string) {
    return (req: any, res: any, next: any) => {
        const { error } = schema.validate(req[property], { abortEarly: false });
        
        if (error) {
            next(badData(error));
        } else {
            next();
        }
    }
}