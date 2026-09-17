import { Promethei } from "@promethei-project/promethei-sdk-js";
import { WebStorage } from "../utils/web-storage";

let client: Promethei = new Promethei(import.meta.env.VITE_PROMETHEI_API_URL);
let url: string = import.meta.env.VITE_PROMETHEI_API_URL;

export const PrometheiSdk = {
  url() {
    return url;
  },

  load() {
    return WebStorage.get<string>("nim-promethei-node-url").then((u) => {
      url = u || import.meta.env.VITE_PROMETHEI_API_URL;
      client = new Promethei(url);
    });
  },

  updateURL(u: string) {
    url = u;
    client = new Promethei(url);

    return WebStorage.set("nim-promethei-node-url", url);
  },

  debug() {
    return client.debug
  },

  data() {
    return client.data
  },

  node() {
    return client.node
  },

  marketplace() {
    return client.marketplace
  },
};
