import { error } from "console";
import { BrowserHandler, Source } from "../services";
import {
   IAnimeMangaDetails,
   IAnimeVisionDetails,
   IAnimeVisionResponse,
} from "../../entities";

class AnimesVisionSource extends Source {
   constructor(browserHandler: BrowserHandler) {
      super(browserHandler, "https://animes.vision/");
   }

   public getQuery(query: string): string {
      const querySanitized = query.replace(" ", "+");

      return `${this.url}search?nome=${querySanitized}`;
   }

   private assembleResponse(data: IAnimeVisionResponse): IAnimeVisionDetails {
      return {
         name: data.name,
         description: data.description,
         genres:
            data.moreInfo?.find(info => info[0] === "Gêneros:")?.slice(1) || [],
         totalEps: parseInt(
            data.stats
               ?.find(stat => stat.startsWith("Episódios"))
               ?.split(" ")[1] || "0",
            10
         ),
         age: parseInt(
            data.stats?.find(stat => stat.startsWith("+"))?.substring(1) || "0",
            10
         ),
         season:
            data.moreInfo?.find(info => info[0] === "Temporada:")?.[1] || "",
         status: data.moreInfo?.find(info => info[0] === "Status:")?.[1] || "",
         epDuration:
            data.stats?.find(stat => stat.endsWith("min por ep")) || "",
         producers:
            data.moreInfo?.find(info => info[0] === "Produtores:")?.slice(1) ||
            [],
         studies:
            data.moreInfo?.find(info => info[0] === "Estúdios:")?.slice(1) ||
            [],
      };
   }

   private sanitizeData(data: IAnimeVisionResponse) {
      const sanitizedData: IAnimeVisionResponse = {
         name: null,
         description: null,
         stats: null,
         moreInfo: null,
      };

      sanitizedData.name = data.name;

      sanitizedData.description =
         data.description
            ?.replace(
               /<span class="btn-more-desc less">- Menos<\/span>(\s*\[.*?\])?$/,
               ""
            )
            .trim() || null;
      sanitizedData.stats =
         data.stats?.map(status =>
            status.replace(/<\/?[^>]+(>|$)/g, "").trim()
         ) || null;
      sanitizedData.moreInfo =
         data.moreInfo?.map(info => {
            if (info?.length === 2) {
               return info.map(item =>
                  item?.replace(/<\/?[^>]+(>|$)/g, "").trim()
               );
            } else if (info.length > 2) {
               return (
                  [
                     info[0],
                     ...info
                        .slice(1)
                        .map(item =>
                           item?.replace(/<\/?[^>]+(>|$)/g, "").trim()
                        ),
                  ] || ""
               );
            } else {
               return info;
            }
         }) || null;

      return sanitizedData;
   }

   private async fetchData(query: string): Promise<IAnimeVisionResponse> {
      const url = this.getQuery(query);
      const browser = await this.browserHandler.getBrowser();
      const page = await browser.newPage();

      await page.goto(url);

      const results = await page.evaluate(() => {
         const items = [...document.querySelectorAll(".flw-item")];

         if (items.length == 0) throw new Error("Not Found Anime");

         return items.map(item => {
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

         return h2 && h2.innerHTML;
      });

      const description = await page.evaluate(() => {
         const data = document.querySelector(".film-description");

         if (!data) return null;

         const div = data.querySelector("div");

         if (!div) throw new Error("Div description not found");

         return div.innerHTML;
      });

      const stats = await page.evaluate(() => {
         const data = document.querySelector(".film-stats");

         if (!data) return null;

         const spans = [...data.querySelectorAll("span.item")];

         if (!spans) return null;

         return spans.map(span => span.innerHTML);
      });

      const moreInfo = await page.evaluate(() => {
         const data = document.querySelector(".anisc-info");

         if (!data) return null;

         const childrens = [
            ...data.querySelectorAll('.item:not([class~="w-hide"])'),
         ];

         if (!childrens.length) return null;

         return childrens.map(children => {
            const spans = [...children.querySelectorAll("span, a")];

            if (!spans) return [];

            return spans.map(span => span.innerHTML);
         });
      });

      return {
         name,
         description,
         stats,
         moreInfo,
      };
   }

   public async search(query: string): Promise<IAnimeMangaDetails> {
      const data = await this.fetchData(query);
      const sanitizeData = this.sanitizeData(data);
      const dataFormatted = this.assembleResponse(sanitizeData);

      return dataFormatted;
   }
}

export { AnimesVisionSource };
