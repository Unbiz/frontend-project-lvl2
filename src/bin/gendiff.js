#!/usr/bin/env node
import program from 'commander';
import genDiff from '../index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'Output format', 'stylish')
  .usage('[options] <filepath1> <filepath2>')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const { format } = program.opts();
    console.log(genDiff(filepath1, filepath2, format));
  })
  .parse(process.argv);
