export function filterObject(obj, callback) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, val]) => callback(val, key))
  );
}
export * from './patterns';
