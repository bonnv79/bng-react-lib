import React from 'react';
import { EllipsisTooltip } from 'bng-react-lib';
import { FormLabel } from '../common/Form';

const EllipsisTooltipExample = () => {
  const [value, setValue] = React.useState('Tooltip appears when a user hovers over ellipsis text');

  return <div>
    <FormLabel label='Value:'>
      <input style={{ width: 150 }} value={value} onChange={e => setValue(e.target.value)} />
    </FormLabel>

    <FormLabel label="Tooltip appears when a user hovers over ellipsis text: ">
      <div style={{ width: 150, borderBottom: '1px dotted black' }}>
        <EllipsisTooltip title={`Title: ${value}`}>
          {value}
        </EllipsisTooltip>
      </div>
    </FormLabel>

    <FormLabel label="Tooltip doesn't appear when the text doesn't have ellipsis: ">
      <div style={{ width: '100%', borderBottom: '1px dotted black' }}>
        <EllipsisTooltip>
          {value}
        </EllipsisTooltip>
      </div>
    </FormLabel>
  </div>
}

export default EllipsisTooltipExample;
