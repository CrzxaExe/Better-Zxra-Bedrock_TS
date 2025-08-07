type ObjectValues<T> = T[keyof T];

type KeyOf<T> = keyof typeof T;

type GetValues<T> = (typeof T)[keyof typeof T];

type Prettify<T> = {
  [K in keyof T]: Prettify<T[K]>;
} & {};
