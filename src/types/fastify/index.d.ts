// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FastifySchema } from "fastify";
import { JSONSchema7 } from "json-schema";

declare module "fastify" {
  export interface FastifySchema {
    hide?: boolean;
    tags?: string[];
    description?: string;
    summary?: string;
    consumes?: string[];
    produces?: string[];
    security?: Array<{ [securityLabel: string]: string[] }>;
    body?: JSONSchema7 | unknown;
    querystring?: JSONSchema7 | unknown;
    params?: JSONSchema7 | unknown;
    headers?: JSONSchema7 | unknown;
    response?: JSONSchema7 | unknown;
  }
}
