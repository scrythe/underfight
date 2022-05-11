import { State } from './stateInterfaces';
import { Server } from 'socket.io';

export interface ServerToClientEvents {
  sendState: (state: State) => void;
}

export interface ClientToServerEvents {}

export interface InterServerEvents {}

export interface SocketData {}

type ServerInterface = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export default ServerInterface;
