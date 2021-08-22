import { FastifySchema } from "fastify";

export const ActionSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      x: { type: "number", minimum: -160, maximum: 160 },
      y: { type: "number", minimum: -100, maximum: 100 },
      z: { type: "number", minimum: -35, maximum: 35 },
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

export const SetPumpSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      level: { type: "integer", minimum: 0, maximum: 1000 },
    },
  },
};
