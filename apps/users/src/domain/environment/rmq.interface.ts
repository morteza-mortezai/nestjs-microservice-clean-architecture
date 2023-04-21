export interface RmqConfig {
    getRabbitMQOptions(name: string, noAck: boolean): any;
}