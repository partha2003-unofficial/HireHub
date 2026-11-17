import type { Request, Response, NextFunction } from "express";

export function accessControlMiddleware(request: Request, response: Response, next: NextFunction) {
    response.header('Access-Control-Allow-Origin', "*");
    response.header('Access-Control-Allow-Headers', "Content-Type, Authorization");
    response.header('Access-Control-Allow-Methods', "GET,POST,OPTIONS");

    if (request.method === 'OPTIONS') return response.sendStatus(204);
    next();
}