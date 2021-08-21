import { FastifySchema } from "fastify";

export const ActionSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      x: { type: "integer", minimum: 0, maximum: 160 },
      y: { type: "integer", minimum: 0, maximum: 100 },
      z: { type: "integer", minimum: 0, maximum: 35 },
    },
  },
};

export const StateSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      x: { type: "integer", minimum: 0, maximum: 160 },
      y: { type: "integer", minimum: 0, maximum: 100 },
      z: { type: "integer", minimum: 0, maximum: 35 },
    },
  },
};
