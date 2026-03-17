import _ from 'lodash';
import jsdoc2md from 'jsdoc-to-markdown';

import { getRelativePath, writeFileAsync } from './file.js';

const src = getRelativePath(import.meta.url, ['..', 'node_modules', 'lodash', 'lodash.js']);
const jsdocData = await jsdoc2md.getJsdocData({ files: src });

const excludedList = ['_', 'VERSION'];
const methodList = Object.keys(_).filter((name) => !excludedList.includes(name));
const descList = {};

jsdocData.forEach((item) => {
  const name = item.meta?.code?.name;

  if (name && methodList.includes(name) && item.description) {
    descList[`_.${name}`] = item.description;
  }
});

const json = JSON.stringify(descList, undefined, 2);
const typescript = `export const lodash:Record<string, string> = ${json};`;

const dest = getRelativePath(import.meta.url, ['..', '.generated', 'lodash.ts']);
await writeFileAsync(typescript, dest);
