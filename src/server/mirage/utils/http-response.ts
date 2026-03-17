import { Response } from 'miragejs';

type ErrorDetails = Record<string, unknown> | undefined;
type ResponseHeaders = Record<string, string>;
type JsonBody =
  | string
  | number
  | boolean
  | null
  | Record<string, unknown>
  | unknown[];

function normalizeMirageBody(body: JsonBody): string | object {
  if (typeof body === 'string') {
    return body;
  }

  if (typeof body === 'number' || typeof body === 'boolean' || body === null) {
    return JSON.stringify(body);
  }

  return body;
}

function json(status: number, body: JsonBody, headers: ResponseHeaders = {}) {
  return new Response(
    status,
    {
      'Content-Type': 'application/json',
      ...headers,
    },
    normalizeMirageBody(body),
  );
}

function errorBody(message: string, details?: ErrorDetails) {
  if (!details) {
    return { message };
  }

  return {
    details,
    message,
  };
}

export const httpResponse = {
  ok(body: JsonBody, headers?: ResponseHeaders) {
    return json(200, body, headers);
  },
  created(body: JsonBody, headers?: ResponseHeaders) {
    return json(201, body, headers);
  },
  noContent(headers: ResponseHeaders = {}) {
    return new Response(204, headers);
  },
  badRequest(message: string, details?: ErrorDetails) {
    return json(400, errorBody(message, details));
  },
  unauthorized(message = 'Não autorizado.', details?: ErrorDetails) {
    return json(401, errorBody(message, details));
  },
  forbidden(message = 'Acesso negado.', details?: ErrorDetails) {
    return json(403, errorBody(message, details));
  },
  notFound(message: string, details?: ErrorDetails) {
    return json(404, errorBody(message, details));
  },
  conflict(message: string, details?: ErrorDetails) {
    return json(409, errorBody(message, details));
  },
  unprocessableEntity(message: string, details?: ErrorDetails) {
    return json(422, errorBody(message, details));
  },
  internalServerError(
    message = 'Erro interno do servidor.',
    details?: ErrorDetails,
  ) {
    return json(500, errorBody(message, details));
  },
};
