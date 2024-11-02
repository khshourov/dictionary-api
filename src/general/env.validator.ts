import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),

  THROTTLE_TTL: Joi.number().min(1).required(),
  THROTTLE_LIMIT: Joi.number().min(0).required(),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().min(0).required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),

  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_REDIRECT_URL: Joi.string().uri().required(),

  JWT_SECRET: Joi.string().required(),
});
