import * as Joi from 'joi';

export const validationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
    APP_PORT: Joi.number().default(3000),
    // RMQ_URI: Joi.string().required(),
    // RMQ_USERS_QUEUE: Joi.string().required(),
})