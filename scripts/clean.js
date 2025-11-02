#!/usr/bin/env node

import { access, constants, rm } from 'fs/promises';
import path from 'path';

const RETRY_LIMIT = 3;
const RETRY_DELAY_MS = 1000;
const cwd = process.cwd();

const targets = [
  path.join(cwd, 'node_modules', '.cache')
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const formatTarget = (targetPath) => {
  const relative = path.relative(cwd, targetPath) || '.';
  return relative.replace(/\\/g, '/');
};

(async () => {
  console.log('🧹 Cleaning cache directories...');

  let hasErrors = false;

  for (const target of targets) {
    const label = formatTarget(target);

    try {
      await access(target, constants.F_OK);
    } catch {
      console.log(`ℹ️  ${label} is already clean.`);
      continue;
    }

    let attempt = 0;
    let removed = false;

    while (attempt < RETRY_LIMIT && !removed) {
      attempt += 1;

      try {
        await rm(target, { recursive: true, force: true });
        console.log(`✅ Cleared ${label}`);
        removed = true;
      } catch (error) {
        if (attempt >= RETRY_LIMIT) {
          console.error(`❌ Failed to clear ${label}: ${error.message}`);
          hasErrors = true;
          break;
        }

        console.warn(
          `⚠️ Attempt ${attempt} to clear ${label} failed (${error.message}). Retrying in ${RETRY_DELAY_MS}ms...`
        );
        await sleep(RETRY_DELAY_MS);
      }
    }
  }

  if (hasErrors) {
    console.error('❌ Clean operation finished with errors.');
    process.exitCode = 1;
    return;
  }

  console.log('✅ Clean operation completed.');
})();
