import { FastifySchema } from "fastify";

export const ActionSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      x: { type: "number", minimum: 0, maximum: 160 },
      y: { type: "number", minimum: 0, maximum: 100 },
      z: { type: "number", minimum: 0, maximum: 35 },
    },
  },
};

export const StateSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      x: { type: "number", minimum: 0, maximum: 160 },
      y: { type: "number", minimum: 0, maximum: 100 },
      z: { type: "number", minimum: 0, maximum: 35 },
    },
  },
};
