import fastify, { FastifyInstance } from "fastify";
import { AppDataSource } from "./data-source";
import config from "./config";
class Application {
  server: FastifyInstance;

  constructor() {
    this.server = fastify();
  }

  async main() {
    await AppDataSource.initialize();

    this.server.get("/ping", async (request, reply) => {
      return "pong\n";
    });

    this.server.listen({ port: config.port }, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    });
  }
}

const appInstance = new Application();
appInstance.main();
