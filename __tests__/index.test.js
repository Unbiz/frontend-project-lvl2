import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFuxturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getFuxturePath(fileName), 'utf8');

const before = getFuxturePath('flat/file1.json');
const after = getFuxturePath('flat/file2.json');

test('flat json', () => {
  expect(genDiff(before, after)).toBe(readFile('flat/jsonResult'));
});
