import fastify, { FastifyInstance } from "fastify";
import fastifySwagger from "fastify-swagger";
import pino from "pino";

import handlers from "../handlers";

export const buildFastify = async (): Promise<FastifyInstance> => {
  const logger = pino({
    level: process.env.CF_LOG_LEVEL || "warn",
    prettyPrint: process.env.CF_LOG_PRETTY === "true" ? { colorize: true, crlf: false } : false,
    name: "cf-host-api",
  });

  const server = fastify({
    logger,
  });

  if (process.env.CF_DISABLE_SWAGGER !== "true") {
    server.register(fastifySwagger, {
      routePrefix: "/api/documentation",
      exposeRoute: true,
      openapi: {
        info: {
          title: "Chickenfeet Demo",
          description: "",
          version: "v0.0.1",
        },
        servers: [{ url: "http://localhost:5000", description: "Local" }],
      },
    });
  }

  await server.register(handlers, { prefix: "/api" });

  return server;
};

export const buildServer = async (): Promise<void> => {
  try {
    const fastify = await buildFastify();

    await fastify.listen(
      parseInt(process.env.CF_PORT || "5000"),
      process.env.CF_ADDR || "localhost",
    );

    fastify.log.info("Fastify is started.");
    fastify.ready((err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      if (process.env.CF_DISABLE_SWAGGER !== "true") fastify.swagger();
    });
  } catch (err) {
    console.error(`Failed when starting API server: ${err}`);
    process.exit(1);
  }
};
