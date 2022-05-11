import { State } from './stateInterfaces';
import { Server, Socket } from 'socket.io';
import { Keys, Position } from './interfaces';

export interface ServerToClientEvents {
  sendState: (state: State) => void;
}

export interface ClientToServerEvents {
  sendKeys: (keys: Keys, mousePos: Position) => void;
}

export interface InterServerEvents {}

export interface SocketData {}

type ServerInterface = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type SocketInterface = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export default ServerInterface;
