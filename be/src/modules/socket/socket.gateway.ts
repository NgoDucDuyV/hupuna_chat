import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('SocketGateway');

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    client.emit('test_event', { message: 'Welcome to Hupuna Chat Socket Server' });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('test_event')
  handleTestEvent(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): void {
    this.logger.log(`Received test_event from ${client.id}: `, data);
    this.server.emit('test_event', { senderId: client.id, message: data.message });
  }
}
