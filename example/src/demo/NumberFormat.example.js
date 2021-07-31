import React from 'react';
import { Utils } from 'bng-react-lib';
import { FormLabel, Container, Title } from '../common/Form';

let { makeNumberFormat, LOCALES, numberDecimal } = Utils; // LOCALES.enUS, LOCALES.deDE

const NumberFormatExample = () => {
  const [value, setValue] = React.useState('10');
  const [minimumFractionDigits, setMinimumFractionDigits] = React.useState(2);
  const [maximumFractionDigits, setMaximumFractionDigits] = React.useState('');

  const numberFormatEnUS = makeNumberFormat(minimumFractionDigits, maximumFractionDigits, LOCALES.enUS);
  const numberFormatDeDE = makeNumberFormat(minimumFractionDigits, maximumFractionDigits, LOCALES.deDE);

  return <div>
    <Title>Note: Use makeNumberFormat, LOCALES, numberDecimal in Utils</Title>

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
      <input type='number' value={value} onChange={e => setValue(e.target.value)} />
    </FormLabel>

    <FormLabel label='makeNumberFormat by en-US' inline>
      {numberFormatEnUS(value)}
    </FormLabel>
    <FormLabel label='makeNumberFormat by de-DE' inline>
      {numberFormatDeDE(value)}
    </FormLabel>

    <FormLabel label='numberDecimal' inline>
      {numberDecimal(value, minimumFractionDigits)}
    </FormLabel>
  </div>
}

export default NumberFormatExample;
