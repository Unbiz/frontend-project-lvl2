import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const readFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf8');

const toJson = (data) => JSON.parse(data);

const typeOfChange = (item) => {
  if (item.value1 === null) return 'added';
  if (item.value2 === null) return 'deleted';
  if (item.value2 === item.value1) return 'unchanged';

  return 'changed';
};

const createDiffList = (config) => {
  const list = config.reduce((acc, item) => {
    const type = typeOfChange(item);
    switch (type) {
      case 'added':
        acc.push(`  + ${item.key}: ${item.value2}`);
        break;
      case 'deleted':
        acc.push(`  - ${item.key}: ${item.value1}`);
        break;
      case 'unchanged':
        acc.push(`    ${item.key}: ${item.value2}`);
        break;
      case 'changed':
        acc.push(`  - ${item.key}: ${item.value1}`);
        acc.push(`  + ${item.key}: ${item.value2}`);
        break;
      default:
        break;
    }
    return acc;
  }, []);
  return list;
};

export default (path1, path2) => {
  const data1 = readFile(path.resolve(path1));
  const data2 = readFile(path.resolve(path2));
  const config1 = toJson(data1);
  const config2 = toJson(data2);
  const keys1 = Object.keys(config1);
  const keys2 = Object.keys(config2);

  const configsKeys = _.union(keys1, keys2).sort();

  const diffConfig = configsKeys.map((key) => {
    const value1 = _.has(config1, key) ? config1[key] : null;
    const value2 = _.has(config2, key) ? config2[key] : null;
    return { key, value1, value2 };
  });

  const diffList = createDiffList(diffConfig).join('\n');

  return `\n{\n${diffList}\n}\n`;
};
