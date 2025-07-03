type ObjectValues<T> = T[keyof T];

type Prettify<T> = {
  [K in keyof T]: Prettify<T[K]>;
} & {};
