import dotenv from "dotenv";

import { buildServer } from "./common/server";

dotenv.config();

buildServer()
  .then(() => {
    console.log("Started");
  })
  .catch((err) => {
    console.error(err);
  });
