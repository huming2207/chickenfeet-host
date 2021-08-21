import { FastifyInstance } from "fastify";

import action from "./action";

export default async function bootstrap(server: FastifyInstance): Promise<void> {
  await server.register(action);
}
