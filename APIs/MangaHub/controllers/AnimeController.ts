import express, { Request, Response } from "express";
import { animeSourceHandler } from "../sources";

const animesRouter = express.Router();

animesRouter.get("/about/:query", async (req: Request, res: Response) => {
   try {
      const animeQuery = req.params.query;
      const data = await animeSourceHandler.search(animeQuery);

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

export { animesRouter };
