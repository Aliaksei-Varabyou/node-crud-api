import dotenv from 'dotenv';
import { buildApp } from "./app.js";

dotenv.config({debug: false});
const port = parseInt(process.env.PORT || '3000', 10);

const start = async () => {
  const app = buildApp();
  try {
    await app.listen({ port: port });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
