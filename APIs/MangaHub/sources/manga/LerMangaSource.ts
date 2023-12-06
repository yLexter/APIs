import { Browser } from "puppeteer";
import { IMangaDetails, IMangaResponse } from "../../entities/manga/entities";
import { Source } from "../";
import { BrowserHandler } from "../";

export class LerMangaSource extends Source {
   constructor(browserHandler: BrowserHandler) {
      super(browserHandler, "https://lermanga.org");
   }

   sanitizeMangaObject(mangaObject: IMangaResponse): IMangaDetails {
      const sanitizedObject = { ...mangaObject };

      sanitizedObject.name = sanitizedObject.name?.replace(/^Ler Mangá /, "");
      sanitizedObject.genres = sanitizedObject.genres?.map((genre) =>
         genre.replace(/\n/g, "")
      );
      sanitizedObject.description = sanitizedObject.description?.replace(
         /<[^>]*>/g,
         ""
      );
      sanitizedObject.rating = sanitizedObject.rating?.replace(/\n/g, "");
      sanitizedObject.totalChapters = sanitizedObject.totalChapters?.replace(
         /\D/g,
         ""
      );

      return sanitizedObject;
   }

   async fetchData(query: string): Promise<IMangaResponse> {
      const regexNotFound = /Nenhum|Nenhum resultado/gi;
      const regex = /^https:\/\/lermanga\.org\/mangas\/[^/]+\/$/;
      const browser = await this.browserHandler.getBrowser();
      const page = await browser.newPage();
      const url = this.getQuery(query);

      await page.goto(url);

      await this.sleep(1);

      const notFoundManga = await page.evaluate(() => {
         return document.querySelector("gs-snippet")?.innerHTML;
      });

      if (notFoundManga && regexNotFound.test(notFoundManga))
         throw new Error("Not found Manga");

      const data: string[] = await page.evaluate(() =>
         Array.from(document.querySelectorAll("a"), (e) => e.href)
      );

      const filtred = data.filter((link) => regex.test(link));
      const linkManga = filtred[0];

      await page.goto(linkManga);

      await this.sleep(1);

      const year = await page.evaluate(() => {
         const onlyNumbers = /^[0-9]+$/;
         const data = document.querySelector(".fd-infor");

         if (!data) return null;

         const tagsAnchor = [...data.querySelectorAll("a")];

         if (!tagsAnchor.length) return null;

         return tagsAnchor.find((a) => onlyNumbers.test(a.innerHTML))
            ?.innerHTML;
      });

      const genreList = await page.evaluate(() => {
         const data = document.querySelector(".genre-list");

         if (!data) return null;

         return [...data?.children].map((li) => li.children[0]?.innerHTML);
      });

      const name = await page.evaluate(() => {
         const data = document.querySelector(".boxAnimeSobreLast");

         if (!data) return null;

         const title = data.querySelector("h1");

         if (!title) return null;

         return title.querySelector("a")?.innerHTML;
      });

      const rating = await page.evaluate(() => {
         const data = document.querySelector(".kksr-legend");

         return data?.innerHTML;
      });

      const description = await page.evaluate(() => {
         const data = document.querySelector(".boxAnimeSobreLast");

         if (!data) return null;

         return data.querySelector("p")?.innerHTML;
      });

      const totalChapters = await page.evaluate(() => {
         const data = document.querySelectorAll("strong");

         if (!data) return null;

         return data[1]?.innerHTML;
      });

      const image = await page.evaluate(() => {
         const data = document.querySelector(".capaMangaInfo");

         if (!data) return null;

         return data.querySelector("img")?.currentSrc;
      });

      return {
         name: name,
         genres: genreList,
         description: description,
         releaseDate: year,
         coverImageURL: image,
         rating: rating,
         totalChapters: totalChapters,
      };
   }

   async search(query: string): Promise<IMangaDetails> {
      const data = await this.fetchData(query);
      const dataSanitized = this.sanitizeMangaObject(data);

      return dataSanitized;
   }

   public getQuery(query: string): string {
      return `${this.url}/?s=%s#gsc.tab=0&gsc.q=%s&gsc.page=1`.replace(
         /%s/g,
         query
      );
   }
}
