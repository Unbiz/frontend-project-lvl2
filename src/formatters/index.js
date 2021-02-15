import stylish from './stylish.js';

const formatters = (outFormat) => {
  switch (outFormat) {
    case 'stylish':
      return stylish;
    default:
      throw new Error('Bad value for outFormat');
  }
};

export default formatters;
