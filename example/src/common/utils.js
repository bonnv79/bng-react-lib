export function getRootUrl(url) {
  return `https://github.com/bonnv79/bng-react-lib/${url}`;
}

export function getURL(url) {
  return getRootUrl(`tree/master/example/src/demo/${url}`);
}

export function getDemoURL(id = '') {
  return `/bng-react-lib/${id}`;
}