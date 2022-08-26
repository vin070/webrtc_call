import { PlatformLocation } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class Utils {
  constructor(private _platform_location: PlatformLocation) {}

  copy_text(text: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (window.navigator.clipboard) {
        window.navigator?.clipboard
          .writeText(text)
          .then((res: any) => resolve(res))
          .catch((err: any) => reject(err));
      } else reject("window.navigator?.clipboard api not supported");
    });
  }

  get_url(): string {
    const { protocol, hostname, port, hash } = this._platform_location;
    let url: string = `${protocol}//${hostname}`;
    if (port) url += `:${port}/`;
    if (hash) url += "#/";

    return url;
  }
}
