import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { InternalError } from "../../common/errors";
import serial from "../../common/serial";
import { ActionSchema } from "../../schemas/requestSchema";

const setPosition = async (
  req: FastifyRequest<{ Body: { x: number; y: number; z: number } }>,
  reply: FastifyReply,
): Promise<void> => {
  const { x, y, z } = req.body;
  if (!serial.serial.isOpen) {
    throw new InternalError("Serial port is not started");
  }

  try {
    const written = await serial.sendData(`X${x.toFixed(3)} Y${y.toFixed(3)} Z${z.toFixed(3)}\r\n`);
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

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const getPosition = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
  
// };

export default async function bootstrap(server: FastifyInstance): Promise<void> {
  server.post("/pos", { schema: ActionSchema }, setPosition);
}
