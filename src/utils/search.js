import _toString from 'lodash/toString';

const search = (value, searchKey) => {
  const source = _toString(value).toLowerCase();
  const dif = _toString(searchKey).toLowerCase();
  return source.indexOf(dif) !== -1;
};

export default search;
export { search };