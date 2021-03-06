import { resolve, logger, resolveCwd } from 'just-task';
import { exec, encodeArgs } from './exec';
import path from 'path';
import fs from 'fs';

export interface ITsLintTaskOptions {
  config?: string;
}

export function tslintTask(options: ITsLintTaskOptions = {}) {
  const projectFile = resolveCwd('./tsconfig.json');

  return function tslint() {
    const tslintCmd = resolve('tslint/lib/tslintCli.js');

    if (projectFile && tslintCmd && fs.existsSync(projectFile)) {
      logger.info(`Running tslint`);

      const args = ['--project', projectFile, '-t', 'stylish', '-r', path.dirname(resolve('tslint-microsoft-contrib') || '')];

      const cmd = encodeArgs([process.execPath, tslintCmd, ...args]).join(' ');
      logger.info(cmd);
      return exec(cmd, { stdout: process.stdout, stderr: process.stderr });
    } else {
      return Promise.resolve();
    }
  };
}
