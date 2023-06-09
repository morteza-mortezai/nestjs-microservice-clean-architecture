export enum RMQ_SERVICES {
    MAILER = 'MAILER',
    USERS = 'USERS',
}
export enum RMQ_EVENTS {
    NEW_USER_CREATED = 'NEW_USER_CREATED',
}

export const RMQ_CMD = {
    CREATE_NEW_USER: { cmd: 'CREATE_NEW_USER' },
    GET_USER_BY_ID: { cmd: 'GET_USER_BY_ID' },
    GET_AVATAR_BY_ID: { cmd: 'GET_AVATAR_BY_ID' },
    DELETE_AVATAR_BY_ID: { cmd: 'DELETE_AVATAR_BY_ID' }
}