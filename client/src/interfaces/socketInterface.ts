import { State } from './stateInterfaces';
import { Socket } from 'socket.io-client';

export interface ServerToClientEvents {
  sendState: (state: State) => void;
}

export interface ClientToServerEvents {}

export interface InterServerEvents {}

export interface SocketData {}

type ServerInterface = Socket<ServerToClientEvents, ClientToServerEvents>;

export default ServerInterface;
