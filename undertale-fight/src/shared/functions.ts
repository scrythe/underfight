export function deepFreeze<T>(object: T) {
  const objectKeys = Object.getOwnPropertyNames(object);
  objectKeys.forEach((key) => {
    const property = (object as any)[key];
    if (typeof property === 'object' && !Object.isFrozen(property)) {
      deepFreeze(property);
    }
  });
  return Object.freeze(object);
}
