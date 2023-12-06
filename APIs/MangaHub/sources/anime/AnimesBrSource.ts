import { error } from "console";
import { BrowserHandler, Source } from "..";
import { IAnimeDetails, IAnimeResponse, IMangaDetails } from "../../entities";

class AnimesVisionSource extends Source {
   constructor(browserHandler: BrowserHandler) {
      super(browserHandler, "https://animes.vision/");
   }

   public getQuery(query: string): string {
      const querySanitized = query.replace(" ", "+");

      return `$${this.url}search?nome=${querySanitized}`;
   }

   public async fetchData(query: string): Promise<IAnimeResponse> {
      const url = this.getQuery(query);
      const browser = await this.browserHandler.getBrowser();
      const page = await browser.newPage();

      await page.goto(url);

      const results = await page.evaluate(() => {
         const items = [...document.querySelectorAll("flw-item")];

         if (items.length == 0) return null;

         return items.map((item) => {
            const tagAnchor = item.querySelector("a.dynamic-name");

            if (tagAnchor instanceof HTMLAnchorElement) return tagAnchor;

            throw new Error("Is not Tag Anchor");
         });
      });

      if (!results) throw new Error("Not Found Anime");

      const resultLink = results[0].href;

      await page.goto(resultLink);
      await page.waitForSelector("a.btn-more-desc");
      await page.click("a.btn-more-desc");

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
            ...data.querySelectorAll('.item.item-title:not([class~="w-hide"])'),
         ];

         if (!childrens.length) return null;
      });

      console.log(name, description, stats, moreInfo);

      return {};
   }

   public search(query: string): Promise<IMangaDetails> {
      throw new Error("Method not implemented.");
   }
}

export { AnimesVisionSource };
