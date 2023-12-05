import express, { Request, Response } from 'express';

const mangaRouter = express.Router();

mangaRouter.get('/mangas/:query', async (req: Request, res: Response) => {

  const mangaId = req.params.query;
  
  res.json({
     response: "Olá"   
  });

});

export { mangaRouter };