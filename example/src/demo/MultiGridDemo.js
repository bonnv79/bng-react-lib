import React from 'react';
import { Components } from 'bng-react-lib';
import {
  ContentBox,
} from '../common/ContentBox';
import { LabeledInput, InputRow } from '../common/LabeledInput';

const { MultiGrid } = Components;

export default class MultiGridExample extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      fixedColumnCount: 1,
      fixedRowCount: 1,
      scrollToColumn: 0,
      scrollToRow: 0,
    };

    this._onFixedColumnCountChange = this._createEventHandler('fixedColumnCount');
    this._onFixedRowCountChange = this._createEventHandler('fixedRowCount');
    this._onScrollToColumnChange = this._createEventHandler('scrollToColumn');
    this._onScrollToRowChange = this._createEventHandler('scrollToRow');
  }

  _createEventHandler(property) {
    return event => {
      const value = parseInt(event.target.value, 10) || 0;

      this.setState({
        [property]: value,
      });
    };
  }

  _createLabeledInput(property, eventHandler) {
    const value = this.state[property];

    return (
      <LabeledInput
        label={property}
        name={property}
        onChange={eventHandler}
        value={value}
      />
    );
  }

  render() {
    return (
      <ContentBox>
        <InputRow>
          {this._createLabeledInput(
            'fixedColumnCount',
            this._onFixedColumnCountChange,
          )}
          {this._createLabeledInput(
            'fixedRowCount',
            this._onFixedRowCountChange,
          )}
          {this._createLabeledInput(
            'scrollToColumn',
            this._onScrollToColumnChange,
          )}
          {this._createLabeledInput('scrollToRow', this._onScrollToRowChange)}
        </InputRow>

        <br />

        <div style={{ width: '100%', height: 400 }}>
          <MultiGrid {...this.state} />
        </div>
      </ContentBox>
    );
  }
}