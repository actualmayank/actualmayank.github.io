const globalScope = globalThis as typeof globalThis & {
  process?: { env: Record<string, string | undefined> };
};

globalScope.process ??= { env: {} };
globalScope.process.env ??= {};
globalScope.process.env.NODE_ENV ??= import.meta.env.MODE;
