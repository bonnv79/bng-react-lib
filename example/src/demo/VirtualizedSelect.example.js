import React from 'react';
import { VirtualizedSelect } from 'bng-react-lib';
import styles from './VirtualizedSelect.module.css';
import {
  ContentBox,
} from '../common/ContentBox';
import { FormLabel } from '../common/Form';

const getRows = (rowCount = 0) => {
  const rows = [];

  for (let i = 0; i < rowCount; i += 1) {
    rows.push({
      value: `item-${i}`,
      label: `Item ${i}`,
    });
  }

  return rows;
}

export default class VirtualizedSelectExample extends React.Component {
  constructor(props) {
    super(props);

    const defaultRowCount = 1000;

    this.state = {
      clearable: true,
      disabled: false,
      multi: false,
      searchable: true,
      selectedCity: '',
      rowCount: defaultRowCount,
      rows: getRows(defaultRowCount)
    };
  }

  render() {
    const { clearable, disabled, multi, searchable, selectedCity, rows, rowCount } = this.state;

    return (
      <ContentBox>
        <FormLabel label="rowCount" inline style={{ margin: '5px 0 16px 0' }}>
          <input
            name="rowCount"
            value={rowCount}
            onChange={event => {
              const newRowCount = Number(event.target.value);
              this.setState({
                rowCount: newRowCount,
                rows: getRows(newRowCount),
              });
            }}
          />
        </FormLabel>

        <div style={{ width: 500 }}>
          <VirtualizedSelect
            isClearable={clearable}
            isDisabled={disabled}
            isSearchable={searchable}
            onChange={selectedCity => this.setState({ selectedCity })}
            options={rows}
            value={selectedCity}
            isMulti={multi}
            valueKey="value"
            labelKey="label"
          />
        </div>

        <ul className={styles.optionsList}>
          <li className={styles.optionListItem}>
            <label>
              <input
                defaultChecked={multi}
                name="multi"
                onChange={event => this.setState({ multi: event.target.checked })}
                type="checkbox"
              />
              Multi-select?
            </label>
          </li>
          <li className={styles.optionListItem}>
            <label>
              <input
                defaultChecked={searchable}
                name="searchable"
                onChange={event => {
                  this.setState({ searchable: event.target.checked });
                }}
                type="checkbox"
              />
              Searchable?
            </label>
          </li>
          <li className={styles.optionListItem}>
            <label>
              <input
                defaultChecked={clearable}
                name="clearable"
                onChange={event => {
                  this.setState({ clearable: event.target.checked });
                }}
                type="checkbox"
              />
              Clearable?
            </label>
          </li>
          <li className={styles.optionListItem}>
            <label>
              <input
                defaultChecked={disabled}
                name="disabled"
                onChange={event => {
                  this.setState({ disabled: event.target.checked });
                }}
                type="checkbox"
              />
              Disabled?
            </label>
          </li>
        </ul>
      </ContentBox>
    );
  }
}
