export function logError(err: any, req: any, res: any, next: any) {
    console.error(err);
    next(err);
}

export function errorHandler(err: any, req: any, res: any, next: any) {
    res.status(400).json({ message: err.message, stack: err.stack });
}

export function boomErrorHandler(err: any, req: any, res: any, next: any) {
    if (!err.isBoom) {
        next(err);
    } else {
        res.status(err.output.statusCode).json(err.output.payload);
    }
}