import { buildApp } from "./app.ts";

const start = async () => {
  const app = buildApp();
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
