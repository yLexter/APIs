import { PuppeteerNode } from "puppeteer";
import { IMangaDetails } from "../entities/entities";
import { IMangaSource } from "./interfaces";

export class LerMangaSource implements IMangaSource {
  public readonly url: string;

  constructor(public readonly browser: PuppeteerNode) {
    this.url = "https://lermanga.org";
  }

  async search(query: string): Promise<IMangaDetails> {
    throw new Error("Method not implemented.");
  }

  getQuery(query: string) {
    return `${this.url}/?s=%s#gsc.tab=0&gsc.q=%s&gsc.page=1`.replace(
      /"%s"/g,
      query
    );
  }
}
