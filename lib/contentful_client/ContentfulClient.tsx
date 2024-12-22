import {
  ContentfulClientApi,
  createClient as createDeliveryClient,
} from "contentful";
import {
  createClient as createManagementClient,
  PlainClientAPI,
} from "contentful-management";
import { remark } from "remark";
import html from "remark-html";

/**
 * Singleton API Client for Contentful.
 */
class ContentfulClient {
  private static _client: ContentfulClient;
  public _deliveryClient: ContentfulClientApi<undefined>;
  public _previewClient: ContentfulClientApi<undefined>;
  public _managementClient: PlainClientAPI;

  private constructor() {
    this._deliveryClient = createDeliveryClient({
      host:
        process.env.VERCEL_ENV === "production"
          ? "cdn.contentful.com"
          : "preview.contentful.com",
      // This is the space ID. A space is like a project folder in Contentful terms
      space: process.env.CONTENTFUL_SPACE_ID,
      // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
      accessToken: process.env.CONTENTFUL_DELIVERY_KEY,
    });

    // We use the preview client to read Orders data. For now, we are not making the second
    // call to publish orders after creating them programmatically, so we read drafted orders
    // using this client.
    this._previewClient = createDeliveryClient({
      host: "preview.contentful.com",
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_DELIVERY_PREVIEW_KEY,
    });

    this._managementClient = createManagementClient(
      {
        accessToken: process.env.CONTENTFUL_MANAGEMENT_KEY,
      },
      {
        type: "plain",
        defaults: {
          spaceId: process.env.CONTENTFUL_SPACE_ID,
          environmentId: "master",
        },
      },
    );
  }

  private static get client() {
    if (!this._client) {
      this._client = new ContentfulClient();
    }

    return this._client;
  }

  public static get readClient() {
    return this.client._deliveryClient;
  }

  public static get readPreview() {
    return this.client._previewClient;
  }

  public static get writeClient() {
    return this.client._managementClient;
  }

  /**
   * Retrieve all content for a given content type as a set of key-value text entries.
   *
   * @param pageName - The name of the Content Type to retrieve from Contentful
   * @param fieldNames - A list of fieldNames to include. If no names are provided, returns all fields.
   * @returns Key-value text entries for each field in the Content Type, ready to insert as HTML.
   */
  public static async getPageContent(
    pageName: string,
    fieldNames?: string[],
  ): Promise<Object> {
    const [contentType, entries] = await Promise.all([
      this.readClient.getContentType(pageName),
      this.readClient.getEntries({ content_type: pageName }),
    ]);

    const fields = entries.items[0].fields;
    const fieldTypes = Object.fromEntries(
      contentType.fields.map((field) => {
        return [field.id, field.type];
      }),
    );

    let keysToParse = Object.keys(fields);

    if (fieldNames) {
      keysToParse = keysToParse.filter((key) => fieldNames.includes(key));
    }

    return Promise.all(
      keysToParse.map(async (key) => {
        if (fieldTypes[key] === "Text") {
          const item = await remark().use(html).process(fields[key].toString());
          return [key, item.toString()];
        } else {
          return [key, fields[key]];
        }
      }),
    ).then(Object.fromEntries);
  }
}

export default ContentfulClient;
