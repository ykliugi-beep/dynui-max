#!/usr/bin/env node

import { access, constants, readdir, rm } from 'fs/promises';
import path from 'path';
import { setTimeout as wait } from 'timers/promises';

const RETRY_LIMIT = 3;
const RETRY_DELAY_MS = 1_000;
const cwd = process.cwd();

const STATIC_TARGETS = [
  path.join(cwd, '.turbo'),
  path.join(cwd, 'node_modules', '.cache'),
  path.join(cwd, 'node_modules', '.vite')
];

const WORKSPACE_FOLDERS = ['apps', 'packages', 'tools'];

const formatTarget = (targetPath) => {
  const relative = path.relative(cwd, targetPath) || '.';
  return relative.replace(/\\/g, '/');
};

const collectWorkspaceTargets = async () => {
  const targets = new Set();

  for (const folder of WORKSPACE_FOLDERS) {
    const folderPath = path.join(cwd, folder);

    try {
      const entries = await readdir(folderPath, { withFileTypes: true });

      for (const entry of entries) {
        if (!entry.isDirectory()) continue;

        targets.add(path.join(folderPath, entry.name, 'node_modules', '.cache'));
        targets.add(path.join(folderPath, entry.name, 'node_modules', '.vite'));
      }
    } catch {
      // Folder might not exist in every workspace configuration.
    }
  }

  return Array.from(targets);
};

const targetExists = async (target) => {
  try {
    await access(target, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const removeWithRetry = async (target) => {
  let attempt = 0;

  while (attempt < RETRY_LIMIT) {
    attempt += 1;

    try {
      await rm(target, { recursive: true, force: true });
      console.log(`✅ Cleared ${formatTarget(target)}`);
      return true;
    } catch (error) {
      if (attempt >= RETRY_LIMIT) {
        console.error(
          `❌ Failed to clear ${formatTarget(target)} (${error?.message ?? error})`
        );
        return false;
      }

      console.warn(
        `⚠️  Attempt ${attempt} to clear ${formatTarget(target)} failed (${error?.message ?? error}). Retrying in ${RETRY_DELAY_MS}ms...`
      );
      await wait(RETRY_DELAY_MS);
    }
  }

  return false;
};

(async () => {
  console.log('🧹 Cleaning cache directories...');

  const dynamicTargets = await collectWorkspaceTargets();
  const targets = [...new Set([...STATIC_TARGETS, ...dynamicTargets])];

  let failures = 0;

  for (const target of targets) {
    if (!(await targetExists(target))) {
      console.log(`ℹ️  ${formatTarget(target)} is already clean.`);
      continue;
    }

    const success = await removeWithRetry(target);
    if (!success) {
      failures += 1;
    }
  }

  if (failures > 0) {
    console.error('❌ Clean operation finished with errors.');
    process.exitCode = 1;
    return;
  }

  console.log('✅ Clean operation completed.');
})();
