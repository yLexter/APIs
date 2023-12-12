import express, { Request, Response, NextFunction } from "express";

interface MeusHeaders {
   url?: string;
}

const headerHandler = (req: Request, res: Response, next: NextFunction) => {
   const headers: MeusHeaders = req.headers as MeusHeaders;

   if (headers.url !== undefined && typeof headers.url !== "string") {
      res.status(400).send(
         "Headers inválidos! consulte o formato do headers no repositório do github:  https://github.com/yLexter/APIs"
      );
      return;
   }

   next();
};

export { headerHandler };
