export type Arg = string | Record<string, unknown> | ((arg?: any) => any);

type GlobalThis = typeof globalThis &
  Window & {
    NaN: never;
    Infinity: never;
  };

declare interface ExtendedGlobal extends GlobalThis {
  zE: (...args: Arg[]) => void;
  zESettings: Record<string, unknown>;
}
