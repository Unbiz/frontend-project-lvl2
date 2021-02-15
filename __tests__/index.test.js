import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFuxturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getFuxturePath(fileName), 'utf8');

const beforeJson = getFuxturePath('file1.json');
const afterJson = getFuxturePath('file2.json');

const beforeYaml = getFuxturePath('file1.yml');
const afterYaml = getFuxturePath('file2.yml');

test('json', () => {
  expect(genDiff(beforeJson, afterJson)).toBe(readFile('result'));
});

test('yaml', () => {
  expect(genDiff(beforeYaml, afterYaml)).toBe(readFile('result'));
});
