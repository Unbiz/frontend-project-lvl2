import _ from 'lodash';

const sheckValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (value === null || typeof value === 'boolean' || Number.isNaN(value)) return value;
  return `'${value}'`;
};

const getPropLine = (config, namePrefix = '') => {
  const plainList = config.map((prop) => {
    const currentName = `${namePrefix}${prop.key}`;
    switch (prop.type) {
      case 'children':
        return getPropLine(prop.value, `${currentName}.`);
      case 'added':
        return `Property '${currentName}' was added with value: ${sheckValue(prop.value)}`;
      case 'removed':
        return `Property '${currentName}' was removed`;
      case 'changed':
        return (
          `Property '${currentName}' was updated. From ${sheckValue(prop.value1)} to ${sheckValue(prop.value2)}`
        );
      case 'unchanged':
        return null;
      default:
        throw new Error('Bad value for type of property');
    }
  });

  return `${plainList.filter((n) => n).join('\n')}`;
};

export default getPropLine;
