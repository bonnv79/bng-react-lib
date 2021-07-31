import React from 'react';
import { Utils } from 'bng-react-lib';
import FormLabel from '../common/FormLabel';
import { Title } from '../common/Form';

const { makeDelaySearch, search } = Utils;

let delaySearch = makeDelaySearch(200); // delay 200ms

const data = [];

for (let i = 1; i < 20; i += 1) {
  data.push({
    id: i,
    name: `name ${i}`
  });
}

const DelaySearchExample = () => {
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
    <Title>Note: Use makeDelaySearch and search in Utils</Title>

    <FormLabel label='Delay:'>
      200ms
    </FormLabel>
    <FormLabel label='Search:'>
      <input value={searchKey} onChange={handleSearch} />
    </FormLabel>
    <FormLabel label='Search Value:'>
      {searchKey1}
    </FormLabel>

    <table style={{ borderCollapse: 'collapse' }}>
      <tbody>
        {
          data.filter(item => search(item.name, searchKey1)).map(item => (
            <tr key={item.id}>
              <td style={{ border: '1px solid black', padding: '0 5px' }}>{item.id}</td>
              <td style={{ border: '1px solid black', padding: '0 5px' }}>{item.name}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
}

export default DelaySearchExample;
