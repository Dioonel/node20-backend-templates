import { unauthorized } from "@hapi/boom";

export function checkRoles(roles: any[]) {
    return (req: any, res: any, next: any) => {
        const user = req.user;
        if ((roles).includes(user.role)){
            next();
        } else {
            throw unauthorized('Unauthorized role');
        }
    }
}