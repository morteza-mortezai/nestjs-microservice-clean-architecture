import * as Joi from 'joi';
export const validationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
    APP_PORT: Joi.number().default(3001),
    RMQ_URI: Joi.string().required(),
    RMQ_MAILER_QUEUE: Joi.string().required(),
    MAILER_TRANSPORT: Joi.string().required()
})
