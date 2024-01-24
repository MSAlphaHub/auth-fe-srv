export enum STORAGE {
  LANGUAGE,
  USER_TOKEN,
  USER_DATA,
  USER_REFRESH,
  TWO_FACTOR,
}

export function getLocalStorage(key: STORAGE) {
  return localStorage.getItem(STORAGE[key]);
}

export function setLocalStorage(key: STORAGE, value: string) {
  return localStorage.setItem(STORAGE[key], value);
}

export function removeLocalStorage(key: STORAGE) {
  return localStorage.removeItem(STORAGE[key]);
}
