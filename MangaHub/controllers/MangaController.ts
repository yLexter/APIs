import express, { Request, Response } from "express";
import { app } from "../sources";

const mangaRouter = express.Router();

mangaRouter.get("/about/:query", async (req: Request, res: Response) => {
   try {
      const site = req.headers["url"] as string | undefined;
      const animeQuery = req.params.query;
      const data = await app.manga.search(animeQuery, site);

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
