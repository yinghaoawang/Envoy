function exclude(obj: any, keys: string[]) {
  for (let key of keys) {
    delete obj[key];
  }
  return obj;
}

function filterKeys(obj: any, keys: string[]) {
  exclude(obj, keys);
  for (let value of Object.values(obj)) {
    if (value instanceof Object) {
      filterKeys(value, keys);
    }
  }
  return obj;
}

module.exports = {
  exclude,
  filterKeys
};
