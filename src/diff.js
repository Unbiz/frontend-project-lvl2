import _ from 'lodash';

const getNodeType = (key, config1, config2) => {
  const value1 = config1[key];
  const value2 = config2[key];

  const isObjectNotArray = (value) => _.isObject(value) && !_.isArray(value);

  const checkList = {
    added: () => (!(key in config1) && key in config2),
    removed: () => (!(key in config2) && key in config1),
    children: () => (isObjectNotArray(value1) && isObjectNotArray(value2)),
    unchanged: () => (_.isEqual(value1, value2)),
  };

  return Object.keys(checkList).find((type) => checkList[type]()) || 'changed';
};

const getDiffConfig = (config1, config2) => {
  const keys1 = Object.keys(config1);
  const keys2 = Object.keys(config2);
  const configsKeys = _.union(keys1, keys2).sort();

  const getNodeByTypes = (key, nodeType, value1, value2) => {
    const fnByNode = {
      changed: () => ({
        key, value1, value2, type: 'changed',
      }),
      added: () => ({ key, value: value2, type: 'added' }),
      removed: () => ({ key, value: value1, type: 'removed' }),
      unchanged: () => ({ key, value: value2, type: 'unchanged' }),
      children: () => ({ key, value: getDiffConfig(value1, value2), type: 'children' }),
    };

    return fnByNode[nodeType]();
  };

  const diffConfig = configsKeys.map((key) => {
    const value1 = config1[key];
    const value2 = config2[key];
    const nodeType = getNodeType(key, config1, config2);

    return getNodeByTypes(key, nodeType, value1, value2);
  });

  return diffConfig;
};

export default getDiffConfig;
