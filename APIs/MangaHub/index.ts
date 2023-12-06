import express from "express";
import { mangaRouter } from "./controllers/MangaController";
import puppeteer from "puppeteer";

//const app = express();
//const PORT = 3000;

const wait = (s: number) => new Promise((res) => setTimeout(res, s * 1000));

(async () => {
   const browser = await puppeteer.launch({ headless: false });
   const page = await browser.newPage();

   await page.goto(
      `https://lermanga.org/?s=%s#gsc.tab=0&gsc.q=%s&gsc.page=1`.replace(
         /%s/g,
         "berserk"
      )
   );

   await wait(2);

   const data = await page.evaluate(() =>
      Array.from(document.querySelectorAll("a"), (e) => e.href)
   );

   console.log(data);
})();

/*
app.use('/api', mangaRouter);

app.listen(PORT, () => {
  console.log(`Servidor Rodando na Porta: ${PORT}`);
});
*/
