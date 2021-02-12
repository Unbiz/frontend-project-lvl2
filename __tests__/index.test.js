import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFuxturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getFuxturePath(fileName), 'utf8');

const beforeJson = getFuxturePath('flat/file1.json');
const afterJson = getFuxturePath('flat/file2.json');

const beforeYaml = getFuxturePath('flat/file1.yml');
const afterYaml = getFuxturePath('flat/file2.yml');

test('flat json', () => {
  expect(genDiff(beforeJson, afterJson)).toBe(readFile('flat/jsonResult'));
});

test('flat yaml', () => {
  expect(genDiff(beforeYaml, afterYaml)).toBe(readFile('flat/jsonResult'));
});
