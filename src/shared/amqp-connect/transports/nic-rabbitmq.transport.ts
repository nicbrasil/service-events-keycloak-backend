import { ConfigService } from '@nestjs/config';
import { ClientRMQ, ClientsModule } from '@nestjs/microservices';
import { Connection, Channel } from 'amqplib';
import { Observable } from 'rxjs';

export default class NicRabbitmqTransport extends ClientRMQ {
  protected readonly exchange: string;
  protected queue: string;
  protected connection: Connection;
  protected channel: Channel;

  constructor(protected readonly options: any) {
    super(options);
    this.exchange = options.exchange;
    this.queue = options.queue;
  }

  setupChannel(channel: Channel, callback: () => null): Promise<void> {
    const { exchange } = this.options as any;
    channel.assertExchange(exchange, 'direct');
    channel.assertQueue(this.queue, this.options);
    channel.bindQueue(this.queue, exchange, this.queue);

    return super.setupChannel(channel, callback);
  }

  static getOptionsModuleRmq(queue: string, options: any = {}): any {
    return {
      urls: [process.env.URL_RABBITMQ], // Substitua pelo URL correto do RabbitMQ
      exchange: 'direct-exchange', // Substitua pelo nome do exchange desejado
      persistent: true,
      durable: true,
      prefetchCount: 1,
      ...options,
      queue,
    };
  }

  static registerModule(queue: string, options?: any) {
    return ClientsModule.register([
      {
        name: `${queue.toUpperCase().trim()}-EMITTER`,
        customClass: NicRabbitmqTransport,
        options: NicRabbitmqTransport.getOptionsModuleRmq(queue, options),
      },
    ]);
  }

  static async registerModuleAsync(queue: string, options?: any) {
    return ClientsModule.registerAsync([
      {
        name: `${queue.toUpperCase().trim()}-EMITTER`,
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => {
          const urls = options?.urls || config.getOrThrow('URL_RABBITMQ');
          options = {
            urls,
            ...options,
          };
          return {
            customClass: NicRabbitmqTransport,
            options: NicRabbitmqTransport.getOptionsModuleRmq(queue, options),
          };
        },
      },
    ]);
  }

  // Quando der um emmit para outra fila, precisa chamar novamente o setupChannel
  // para que o channel seja reconfigurado para a nova fila
  emit<TResult = any, TInput = any>(
    pattern: any,
    data: TInput,
  ): Observable<TResult> {
    if (this.queue !== pattern) {
      this.close();
      this.queue = pattern;
    }
    return super.emit(pattern, data);
  }
}
