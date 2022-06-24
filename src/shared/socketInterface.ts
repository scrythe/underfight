import { State } from './stateInterfaces';
import { State as UndertaleState } from './undertale-fight/stateInterface';
import { Server, Socket as ServerSocket } from 'socket.io';
import { Keys } from './interfaces';
import { Keys as UndertaleKeys } from './undertale-fight/interface';
import { Socket as ClientSocket } from 'socket.io-client';

export type GameMode = 'deepio' | 'undertale';

export interface ServerToClientEvents {
  sendState: (state: State) => void;
  sendStateUndertale: (state: UndertaleState) => void;
  switchMode: (mode: GameMode) => void;
}

export interface ClientToServerEvents {
  sendKeys: (keys: Keys, angle: number) => void;
  sendKeysUndertale: (pressedKey: keyof UndertaleKeys, value: boolean) => void;
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
