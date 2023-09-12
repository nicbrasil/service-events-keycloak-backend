import { ServerRMQ } from '@nestjs/microservices';

export class RabbitmqServerFactory extends ServerRMQ {
  constructor(options: any) {
    super(options);
  }

  setupChannel(channel: any, callback: () => null): Promise<void> {
    const { exchange } = this.options as any;
    channel.assertExchange(exchange);
    channel.assertQueue(this.queue, { durable: true });
    channel.bindQueue(this.queue, exchange, this.queue);

    return super.setupChannel(channel, callback);
  }

  async handleEvent(pattern, packet, context) {
    if (!pattern) {
      pattern = this.options.queue;
      packet = {
        ...packet,
        pattern,
      };
    }

    return super.handleEvent(pattern, packet, context);
  }
}
