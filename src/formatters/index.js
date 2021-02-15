import stylish from './stylish.js';

const formatters = (outFormat) => {
  switch (outFormat) {
    case 'stylish':
      return stylish;
    default:
      break;
  }
  return;
};

export default formatters;
