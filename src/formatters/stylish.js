import _ from 'lodash';

const objStylish = (key, value, prefix, char = ' ') => {
  const startLine = `${prefix}${char} ${key}: {`;
  const endLine = `${prefix}  }`;
  const mainLine = `${prefix}${char} ${key}: ${value}`;
  const getInnerLines = () => {
    const innerList = Object.entries(value)
      .map(([subKey, subValue]) => objStylish(subKey, subValue, `    ${prefix}`))
      .join('\n');
    return innerList;
  };
  return _.isObject(value) ? `${startLine}\n${getInnerLines()}\n${endLine}` : mainLine;
};

const createDiffList = (config) => {
  const defPrefix = '  ';

  const createSubList = (subConfig, prefix) => {
    const list = subConfig.map((item) => {
      const fnStylishByType = {
        added: () => objStylish(item.key, item.value, prefix, '+'),
        removed: () => objStylish(item.key, item.value, prefix, '-'),
        unchanged: () => objStylish(item.key, item.value, prefix, ' '),
        changed: () => {
          const removeLine = objStylish(item.key, item.value1, prefix, '-');
          const addLine = objStylish(item.key, item.value2, prefix, '+');
          return `${removeLine}\n${addLine}`;
        },
        children: () => {
          const startLine = `  ${prefix}${item.key}: {`;
          const childList = createSubList(item.value, `${prefix}    `).map((subItem) => subItem).join('\n');
          const endLine = `  ${prefix}}`;
          return `${startLine}\n${childList}\n${endLine}`;
        },
      };

      return fnStylishByType[item.type]();
    }, []);

    return list;
  };

  const diffList = createSubList(config, defPrefix).join('\n');

  return `{\n${diffList}\n}`;
};

export default createDiffList;
