import React from 'react';
import { Utils } from 'bng-react-lib';
import FormLabel from './Common/FormLabel';

const { makeDelaySearch } = Utils;
let delaySearch = makeDelaySearch();

const DelaySearchDemo = () => {
  const [searchKey, setSearchKey] = React.useState('');
  const [searchKey1, setSearchKey1] = React.useState('');

  const handleSearch = (e) => {
    const val = e.target.value
    setSearchKey(val);

    delaySearch(() => {
      setSearchKey1(val);
    })
  }

  return <div>
    <FormLabel label='Delay:'>
      200ms
    </FormLabel>
    <FormLabel label='Search:'>
      <input value={searchKey} onChange={handleSearch} />
    </FormLabel>
    <FormLabel label='Search Value:'>
      {searchKey1}
    </FormLabel>
  </div>
}

export default DelaySearchDemo;
