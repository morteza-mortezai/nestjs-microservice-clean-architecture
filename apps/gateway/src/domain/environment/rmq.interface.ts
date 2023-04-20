export interface RmqConfig {
    // _getQueue(name: string): string
    // _getRmqUri(): string;
    getRabbitMQOptions(name: string, noAck: boolean): any;
    // getRmqUsersQueue(): string;
}