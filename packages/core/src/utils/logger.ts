const shouldLog = () =>
  typeof process === 'undefined' || process.env?.NODE_ENV !== 'production';

export const logger = {
  warn: (...args: Parameters<typeof console.warn>) => {
    if (shouldLog()) {
      console.warn(...args);
    }
  },
} as const;

export type Logger = typeof logger;
