import { NotionAPI } from "notion-client";

class NotionClient {
  private static _client: NotionClient;
  public notion: NotionAPI;

  private constructor() {
    this.notion = new NotionAPI();
  }

  private static client(): NotionClient {
    if (!this._client) {
      this._client = new NotionClient();
    }

    return this._client;
  }

  public static getPage(id: string, opts?) {
    return this.client().notion.getPage(id, opts);
  }
}

export default NotionClient;
