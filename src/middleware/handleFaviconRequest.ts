import { Request, Response, NextFunction } from "express";

export function handleFaviconRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.originalUrl === "/favicon.ico") res.status(204).end();
  else next();
}
