import { Socket as ClientSocket } from 'socket.io-client';
import { Server, Socket as ServerSocket } from 'socket.io';
import { State } from './stateInterface';
import { Keys, Position } from './interface';

export interface ServerToClientEvents {
  sendState: (state: State) => void;
}

export interface ClientToServerEvents {
  startGame: () => void;
  sendKey: (pressedKey: keyof Keys, value: boolean) => void;
  sendPos: (pos: Position) => void;
}

export interface InterServerEvents {}

export interface SocketData {}

// Client
export type ClientInterface = ClientSocket<
  ServerToClientEvents,
  ClientToServerEvents
>;

// Server
export type ServerInterface = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type SocketInterface = ServerSocket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
