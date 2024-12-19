/* eslint-disable @typescript-eslint/no-explicit-any */
type AsyncFunction = (...args: any[]) => Promise<void>;
type VoidFunction = (...args: any[]) => void;

export const createCancelable = <T extends AsyncFunction>(fn: T) => {
  let cancel: VoidFunction = () => undefined;

  const invoke = (...args: Parameters<T>) =>
    new Promise((resolve, reject) => {
      cancel = reject;
      fn(...args)
        .then(resolve)
        .catch(reject);
    });

  return {
    invoke,
    cancel,
  };
};
