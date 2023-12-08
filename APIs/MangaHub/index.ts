import express from "express";
import puppeteer from "puppeteer";
import { mangaRouter } from "./controllers/MangaController";
import { animesRouter } from "./controllers/AnimeController";

(async () => {
   const url = `https://animes.vision/search?nome=jujutsu+kaisen`;
   const browser = await puppeteer.launch({ headless: false });
   const page = await browser.newPage();

   await page.goto(url);

   const results = await page.evaluate(() => {
      const items = [...document.querySelectorAll(".flw-item")];

      if (items.length == 0) return null;

      return items.map((item) => {
         const tagAnchor = item.querySelector("a.dynamic-name");

         if (tagAnchor instanceof HTMLAnchorElement) return tagAnchor.href;

         throw new Error("Is not Tag Anchor");
      });
   });

   if (!results) throw new Error("Not Found Anime");

   const resultLink = results[0];

   await page.goto(resultLink);
   await page.waitForSelector("span.btn-more-desc");
   await page.click("span.btn-more-desc");

   const name = await page.evaluate(() => {
      const h2 = document.querySelector("h2.film-name");

      if (!h2) return null;

      return h2.innerHTML;
   });

   const description = await page.evaluate(() => {
      const data = document.querySelector(".film-description");

      if (!data) return null;

      return data.querySelector("div")?.innerHTML;
   });

   const stats = await page.evaluate(() => {
      const data = document.querySelector(".film-stats");

      if (!data) return null;

      const spans = [...data.querySelectorAll("span.item")];

      if (!spans) return null;

      return spans.map((span) => span.innerHTML);
   });

   const moreInfo = await page.evaluate(() => {
      const data = document.querySelector(".anisc-info");

      if (!data) return null;

      const childrens = [
         ...data.querySelectorAll('.item:not([class~="w-hide"])'),
      ];

      if (!childrens.length) return null;

      return childrens.map((children) => {
         const spans = [...children.querySelectorAll("span, a")];

         if (!spans) return null;

         return spans.map((span) => span.innerHTML);
      });
   });

   return {
      name,
      description,
      stats,
      moreInfo,
   };
})();

/*
const app = express();
const PORT = 3000;

app.use("/mangas", mangaRouter);
app.use("/animes", animesRouter);

app.listen(PORT, () => {
   console.log(`Server Running in: ${PORT}`);
});
*/
