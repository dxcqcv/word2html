import * as fs from 'fs';
import * as path from 'path';

const appDirectory = fs.realpathSync(process.cwd());
export const resolveApp = (relativePath: string): string =>
  path.resolve(appDirectory, relativePath);

export const appPublic = resolveApp('public');
export const appHtml = resolveApp('app/src/template.html');
export const appSrc = resolveApp('app/src');
export const appDist = resolveApp('app/dist');
export const appTsConfig = resolveApp('tsconfig.json');
export const nodeModules = resolveApp('node_modules');
