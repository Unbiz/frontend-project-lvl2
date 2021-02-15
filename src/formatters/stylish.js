import _ from 'lodash';

const objStylish = (acc, key, value, prefix, char = ' ') => {
  if (_.isObject(value)) {
    acc.push(`${prefix}${char} ${key}: {`);
    Object.entries(value).forEach(([subKey, subValue]) => objStylish(acc, subKey, subValue, `    ${prefix}`));
    acc.push(`${prefix}  }`);
  } else {
    acc.push(`${prefix}${char} ${key}: ${value}`);
  }
};

const createDiffList = (config) => {
  const defPrefix = '  ';

  const createSubList = (subConfig, prefix) => {
    const list = subConfig.reduce((acc, item) => {
      const fnStylishByType = {
        added: () => objStylish(acc, item.key, item.value, prefix, '+'),
        removed: () => objStylish(acc, item.key, item.value, prefix, '-'),
        unchanged: () => objStylish(acc, item.key, item.value, prefix, ' '),
        changed: () => {
          objStylish(acc, item.key, item.value1, prefix, '-');
          objStylish(acc, item.key, item.value2, prefix, '+');
        },
        children: () => {
          acc.push(`  ${prefix}${item.key}: {`);
          createSubList(item.value, `${prefix}    `).forEach((subItem) => acc.push(subItem));
          acc.push(`  ${prefix}}`);
        },
      };

      fnStylishByType[item.type]();

      return acc;
    }, []);

    return list;
  };

  const diffList = createSubList(config, defPrefix).join('\n');

  return `{\n${diffList}\n}`;
};

export default createDiffList;
