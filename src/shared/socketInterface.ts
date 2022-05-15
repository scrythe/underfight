import { State } from './stateInterfaces';
import { Server, Socket as ServerSocket } from 'socket.io';
import { Keys, Position } from '../server/interfaces';
import { Socket as ClientSocket } from 'socket.io-client';

export interface ServerToClientEvents {
  sendState: (state: State) => void;
  collision: () => void;
}

export interface ClientToServerEvents {
  sendKeys: (keys: Keys, angle: number, name: string) => void;
  joinGame: (name: string) => void;
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
