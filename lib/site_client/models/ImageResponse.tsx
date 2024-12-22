import merge from "lodash.merge";

export default class ImageResponse {
  title: string;
  description: string;
  fileUrl: string;
  contentType: string;

  constructor(attrs: Partial<ImageResponse>) {
    merge(this, attrs);
  }

  static fromJson(json: any) {
    return new ImageResponse({
      title: json.title,
      description: json.description,
      fileUrl: "https:" + json.file?.url,
      contentType: json.file?.contentType,
    });
  }
}
