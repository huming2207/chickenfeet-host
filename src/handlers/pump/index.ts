import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { InternalError } from "../../common/errors";
import serial from "../../common/serial";
import { SetPumpSchema } from "../../schemas/requestSchema";

const setPump = async (
  req: FastifyRequest<{ Body: { level: number } }>,
  reply: FastifyReply,
): Promise<void> => {
  const { level } = req.body;
  if (!serial.serial.isOpen) {
    throw new InternalError("Serial port is not started");
  }

  try {
    const written = await serial.sendData(`M3 S${level}\r\n`);
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
  server.post("/pump", { schema: SetPumpSchema }, setPump);
}
