import { State } from './stateInterfaces';
import { Server, Socket as ServerSocket } from 'socket.io';
import { Keys } from './interfaces';
import { Socket as ClientSocket } from 'socket.io-client';

type GameMode = 'deepio' | 'undertale';

export interface ServerToClientEvents {
  sendState: (state: State) => void;
  switchMode: (mode: GameMode) => void;
}

export interface ClientToServerEvents {
  sendKeys: (keys: Keys, angle: number) => void;
  joinGame: (token: string) => void;
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
