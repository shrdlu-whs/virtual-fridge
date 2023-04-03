import devConfig from "./app.config.dev";
import prodConfig from "./app.config.prod";

export const config =
  process.env.NODE_ENV === "production" ? prodConfig : devConfig;

