const makeDelaySearch = (delay = 200) => {
  let timeout = null;

  return (callback) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(function () {
      callback();
    }, delay);
  };
};

export default makeDelaySearch;
export { makeDelaySearch };