import express, { Request, Response } from "express";
import { animeSourceHandler } from "../sources";

const animesRouter = express.Router();

animesRouter.get("/about/:query", async (req: Request, res: Response) => {});

export { animesRouter };
