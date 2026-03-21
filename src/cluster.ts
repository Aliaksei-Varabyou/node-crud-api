import dotenv from 'dotenv';
import cluster from 'node:cluster';
import os from 'node:os';
import http from 'node:http';
import { buildApp } from './app.js';

dotenv.config({debug: false});
const PORT = parseInt(process.env.PORT || '3000', 10);
const workersCount: number = os.availableParallelism() - 1;

if (cluster.isPrimary) {
  const workers: number[] = [];

  for (let i = 0; i < workersCount; i++) {
    const port = PORT + i + 1;

    const worker = cluster.fork({
      PORT: port.toString(),
    });

    workers.push(port);
  }

  let current = 0;

  const server = http.createServer((req, res) => {
    const targetPort = workers[current];

    current = (current + 1) % workers.length;

    const proxyReq = http.request(
      {
        hostname: 'localhost',
        port: targetPort,
        path: req.url,
        method: req.method,
        headers: req.headers,
      },
      (proxyRes) => {
        res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
        proxyRes.pipe(res);
      }
    );

    req.pipe(proxyReq);
  });

  server.listen(PORT, () => {
    console.log(`Load balancer running on ${PORT}`);
  });
} else {
  const workerPort = parseInt(process.env.PORT || '4000', 10);

  const app = buildApp();
  try {
    await app.listen({ port: workerPort }, () => {
      console.log(`Worker started at http://localhost:${workerPort}`);
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }

  app.addHook('onRequest', async (req) => {
    req.log.info({
      workerPort: process.env.PORT,
      workerPid: process.pid,
      method: req.method,
      url: req.url,
    }, 'incoming request');
  });
}
