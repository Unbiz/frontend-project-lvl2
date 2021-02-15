import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = (outFormat) => {
  switch (outFormat) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return json;
    default:
      throw new Error('Bad value for outFormat');
  }
};

export default formatters;
