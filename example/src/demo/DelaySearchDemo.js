import React from 'react';
import BngLib from 'bng-react-lib';

let delaySearch = BngLib.utils.makeDelaySearch();

const FormLabel = ({ children, label }) => (
  <div style={{ display: 'flex' }}>
    <div style={{ marginRight: 10 }}>
      {label}
    </div>
    <div>
      {children}
    </div>
  </div>
)

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
