import { error } from "console";
import { BrowserHandler, Source } from "..";
import {
   IAnimeDetails,
   IAnimeVisionDetails,
   IAnimeVisionResponse,
   IMangaDetails,
} from "../../entities";

class AnimesVisionSource extends Source {
   constructor(browserHandler: BrowserHandler) {
      super(browserHandler, "https://animes.vision/");
   }

   public getQuery(query: string): string {
      const querySanitized = query.replace(" ", "+");

      return `$${this.url}search?nome=${querySanitized}`;
   }

   public sanitizeData(data: IAnimeVisionResponse): IAnimeVisionDetails {
      const sanitizedData: IAnimeVisionResponse = {
         name:  null,
         description: null,
         stats: null,
         moreInfo: null,
       };
     
       sanitizedData.description = data.description?.replace(/<span class="btn-more-desc less">- Menos<\/span>(\s*\[.*?\])?$/, '').trim() || undefined;
       sanitizedData.stats = data.stats?.map((status) => status.replace(/<\/?[^>]+(>|$)/g, '').trim()) || null;   .
       sanitizedData.moreInfo = data.moreInfo?.map((info) => {
         if (!info)
            return null

         if (info?.length === 2) {
           return info.map((item) => item.replace(/<\/?[^>]+(>|$)/g, '').trim()) || null;
         } else if (info.length > 2) {
           return [info[0], ...info.slice(1).map((item) => item.replace(/<\/?[^>]+(>|$)/g, '').trim())] || null;
         }
         return null;
       });
     
       return sanitizedData;
   }

   public async fetchData(query: string): Promise<IAnimeVisionResponse> {
      const url = `https://animes.vision/search?nome=jujutsu+kaisen`;
      const browser = await this.browserHandler.getBrowser();
      const page = await browser.newPage();

      await page.goto(url);

      const results = await page.evaluate(() => {
         const items = [...document.querySelectorAll(".flw-item")];

         if (items.length == 0) 
            throw new Error("Not Found Anime");

         return items.map((item) => {
            const tagAnchor = item.querySelector("a.dynamic-name");

            if (tagAnchor instanceof HTMLAnchorElement) return tagAnchor.href;

            throw new Error("Is not Tag Anchor");
         });
      });

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
   }

   public async search(query: string): Promise<IMangaDetails> {
      const data = await this.fetchData(query);
   }
}

export { AnimesVisionSource };
