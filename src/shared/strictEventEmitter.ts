import EventEmitter from 'events';

export interface EventsMap {
  [event: string]: any;
}

type EventNames<EventList extends EventsMap> = keyof EventList &
  (string | symbol);

type EvemtListener<
  EventList extends EventsMap,
  Event extends EventNames<EventList>
> = EventList[Event];

type EventParameters<
  EventList extends EventsMap,
  Event extends EventNames<EventList>
> = Parameters<EvemtListener<EventList, Event>>;

class StrictEventEmitter<EventList extends EventsMap> extends EventEmitter {
  override on<Event extends EventNames<EventList>>(
    eventName: Event,
    listener: EvemtListener<EventList, Event>
  ) {
    return super.on(eventName, listener);
  }

  override emit<Event extends EventNames<EventList>>(
    eventName: Event,
    ...args: EventParameters<EventList, Event>
  ) {
    return super.emit(eventName, args);
  }
}

export default StrictEventEmitter;
