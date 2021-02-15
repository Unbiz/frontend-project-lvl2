import stylish from './stylish.js';
import plain from './plain.js';

const formatters = (outFormat) => {
  switch (outFormat) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    default:
      throw new Error('Bad value for outFormat');
  }
};

export default formatters;
