import { afterEach, describe, expect, it, vi } from 'vitest';
import { logger } from './logger';

const ORIGINAL_NODE_ENV = process.env.NODE_ENV;

afterEach(() => {
  process.env.NODE_ENV = ORIGINAL_NODE_ENV;
  vi.restoreAllMocks();
});

describe('logger', () => {
  it('forwards warnings when not in production', () => {
    process.env.NODE_ENV = 'development';
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    logger.warn('test warning');

    expect(consoleSpy).toHaveBeenCalledWith('test warning');
  });

  it('suppresses warnings in production', () => {
    process.env.NODE_ENV = 'production';
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    logger.warn('test warning');

    expect(consoleSpy).not.toHaveBeenCalled();
  });
});
