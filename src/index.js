import fs from 'fs';
import path from 'path';
import parser from './parsers.js';
import getDiffConfig from './diff.js';
import getFormatter from './formatters/index.js';

const readFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf8');
const getTypeOfFile = (fileName) => path.extname(fileName).substring(1);

export default (path1, path2, format = 'stylish') => {
  const data1 = readFile(path.resolve(path1));
  const data2 = readFile(path.resolve(path2));
  const type1 = getTypeOfFile(path1);
  const type2 = getTypeOfFile(path2);
  const config1 = parser(data1, type1);
  const config2 = parser(data2, type2);

  const diffConfig = getDiffConfig(config1, config2);
  const formatter = getFormatter(format);
  const diffList = formatter(diffConfig);
  return `${diffList}\n`;
};
