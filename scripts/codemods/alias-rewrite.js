const fs = require('fs');

module.exports = function transformer(fileInfo, api, options) {
  const j = api.jscodeshift;
  const oldAlias = options.oldAlias;
  const newAlias = options.newAlias;
  if (!oldAlias || !newAlias) return fileInfo.source;

  let changed = false;
  const replacePath = (p) => {
    if (typeof p !== 'string') return p;
    if (p.startsWith(oldAlias + '/')) {
      changed = true;
      return p.replace(oldAlias + '/', newAlias + '/');
    }
    if (p === oldAlias) {
      changed = true;
      return newAlias;
    }
    return p;
  };

  const root = j(fileInfo.source);

  root.find(j.ImportDeclaration).forEach((path) => {
    path.node.source.value = replacePath(path.node.source.value);
  });

  root.find(j.ExportNamedDeclaration).forEach((path) => {
    if (path.node.source) path.node.source.value = replacePath(path.node.source.value);
  });

  return changed ? root.toSource() : fileInfo.source;
};
