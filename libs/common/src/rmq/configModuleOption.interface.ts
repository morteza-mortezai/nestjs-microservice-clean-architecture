import { Transport } from "@nestjs/microservices"

export interface ConfigModuleOptions {
    transport: any
    options: {
        urls: string[]
        queue: string
    },
}