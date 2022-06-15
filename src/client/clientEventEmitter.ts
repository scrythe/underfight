import StrictEventEmitter from '../shared/strictEventEmitter';

export interface ClientEvents {
  startGame(): void;
}

class ClientEventEmitter extends StrictEventEmitter<ClientEvents> {}

export default ClientEventEmitter;
