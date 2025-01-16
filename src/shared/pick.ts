export const pickValidPropertyWithValue = <
  T extends Record<string, unknown>,
  k extends keyof T
>(
  obj: T,
  keys: k[]
): Partial<T> => {
  const newObj: Partial<T> = {};
  keys.forEach((key) => {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};
