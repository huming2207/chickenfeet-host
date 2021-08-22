import { FastifyInstance } from "fastify";

import action from "./position";
import pump from "./pump";

export default async function bootstrap(server: FastifyInstance): Promise<void> {
  await server.register(action);
  await server.register(pump);
}
