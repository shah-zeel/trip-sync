import fastify, { FastifyInstance } from "fastify";
import { AppDataSource } from "./data-source";
import config from "./config";
class Application {
  server: FastifyInstance;

  constructor() {
    this.server = fastify();
  }

  async startHttpServer() {
    try {
      const address = await this.server.listen({ port: config.port });
      console.log(`Server listening at ${address}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  async main() {
    await AppDataSource.initialize(); // Initialse data source
    await this.startHttpServer(); // Start the server
  }
}

const appInstance = new Application();
appInstance.main();
