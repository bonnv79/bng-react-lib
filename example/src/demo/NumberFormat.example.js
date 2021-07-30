import React from 'react';
import { Utils } from 'bng-react-lib';
import { FormLabel, Container } from '../common/Form';

let { makeNumberFormat, LOCALES, numberDecimal } = Utils; // LOCALES.enUS, LOCALES.deDE

const NumberFormatExample = () => {
  const [searchKey, setSearchKey] = React.useState('1001');
  const [minimumFractionDigits, setMinimumFractionDigits] = React.useState(2);
  const [maximumFractionDigits, setMaximumFractionDigits] = React.useState('');

  const numberFormatEnUS = makeNumberFormat(minimumFractionDigits, maximumFractionDigits, LOCALES.enUS);
  const numberFormatDeDE = makeNumberFormat(minimumFractionDigits, maximumFractionDigits, LOCALES.deDE);

  const handleSearch = (e) => {
    setSearchKey(e.target.value);
  }

  return <div>
    <Container inline>
      <FormLabel label='minimumFractionDigits:'>
        <input type='number' value={minimumFractionDigits} onChange={e => setMinimumFractionDigits(e.target.value)} />
      </FormLabel>
      <FormLabel label='maximumFractionDigits:'>
        <input type='number' value={maximumFractionDigits} onChange={e => setMaximumFractionDigits(e.target.value)} />
      </FormLabel>
    </Container>
    <hr />
    <FormLabel label='Input number:' >
      <input value={searchKey} onChange={handleSearch} />
    </FormLabel>

    <FormLabel label='makeNumberFormat by en-US' inline>
      {numberFormatEnUS(searchKey)}
    </FormLabel>
    <FormLabel label='makeNumberFormat by de-DE' inline>
      {numberFormatDeDE(searchKey)}
    </FormLabel>

    <FormLabel label='numberDecimal' inline>
      {numberDecimal(searchKey, minimumFractionDigits)}
    </FormLabel>
  </div>
}

export default NumberFormatExample;
