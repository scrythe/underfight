import { State } from './stateInterfaces';
import { Socket } from 'socket.io-client';
import { Keys, Position } from './interfaces';

export interface ServerToClientEvents {
  sendState: (state: State) => void;
}

export interface ClientToServerEvents {
  sendKeys: (keys: Keys, mousePos: Position) => void;
}

export interface InterServerEvents {}

export interface SocketData {}

type ServerInterface = Socket<ServerToClientEvents, ClientToServerEvents>;

export default ServerInterface;
