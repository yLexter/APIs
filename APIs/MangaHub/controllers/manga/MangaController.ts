import express, { Request, Response } from "express";
import { mangaSourceHandler } from "../../sources/manga";

const mangaRouter = express.Router();

mangaRouter.get("/manga/:query", async (req: Request, res: Response) => {
   try {
      const mangaQuery = req.params.query;
      const data = await mangaSourceHandler.search(mangaQuery);

      res.status(200).json({
         data: data,
      });
   } catch (e) {
      const message = e instanceof Error ? e.message : "unknown cause";

      res.status(400).json({
         error: message,
      });
   }
});

export { mangaRouter };
