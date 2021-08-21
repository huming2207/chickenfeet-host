import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { InternalError } from "../../common/errors";
import serial, { serialSendData } from "../../common/serial";
import { ActionSchema } from "../../schemas/requestSchema";

const setPosition = async (
  req: FastifyRequest<{ Body: { x: number; y: number; z: number } }>,
  reply: FastifyReply,
): Promise<void> => {
  const { x, y, z } = req.body;
  if (!serial.isOpen) {
    throw new InternalError("Serial port is not started");
  }

  try {
    const written = await serialSendData(`X${x} Y${y} Z${z}\r\n`);
    await reply.type("application/json").send({
      message: "OK",
      data: {
        written: written,
      },
    });
  } catch (err) {
    throw new InternalError(`Serial error: ${err}`);
  }
};

export default async function bootstrap(server: FastifyInstance): Promise<void> {
  server.post("/pos", { schema: ActionSchema }, setPosition);
}
