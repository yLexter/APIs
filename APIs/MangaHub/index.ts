import express from "express";
import { mangaRouter } from "./controllers/MangaController";
import puppeteer from "puppeteer";

//const app = express();
//const PORT = 3000;

(async () => {
   const browser = await puppeteer.launch();
   const page = await browser.newPage();

   await page.goto("https://developer.chrome.com/");
})();

/*
app.use('/api', mangaRouter);

app.listen(PORT, () => {
  console.log(`Servidor Rodando na Porta: ${PORT}`);
});
*/
