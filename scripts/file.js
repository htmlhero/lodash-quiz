import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * @param baseUrl {string}
 * @param filePath {string[]}
 * @returns {string}
 */
export const getRelativePath = (baseUrl, filePath) => {
  const __dirname = dirname(fileURLToPath(baseUrl));
  return join(__dirname, ...filePath);
};

/**
 * @param content {string}
 * @param filePath {string}
 * @returns {Promise<void>}
 */
export const writeFileAsync = async (content, filePath) => {
  const fileDir = dirname(filePath);
  await mkdir(fileDir, { recursive: true });
  await writeFile(filePath, content);
};
