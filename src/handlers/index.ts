import { FastifyInstance } from "fastify";

import action from "./position";

export default async function bootstrap(server: FastifyInstance): Promise<void> {
  await server.register(action);
}
