import React from 'react';
import { VirtualizedSelect } from 'bng-react-lib';
import styles from './VirtualizedSelect.module.css';
import {
  ContentBox,
} from '../common/ContentBox';

const cityData = [];

for (let i = 0; i < 100000; i += 1) {
  cityData.push({
    value: `item-${i}`,
    label: `Item ${i}`,
  });
}

export default class VirtualizedSelectExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clearable: true,
      disabled: false,
      multi: false,
      searchable: true,
      selectedCity: '',
    };
  }

  render() {
    const { clearable, disabled, multi, searchable, selectedCity } = this.state;

    return (
      <ContentBox>
        <div style={{ width: 500 }}>
          <VirtualizedSelect
            isClearable={clearable}
            isDisabled={disabled}
            isSearchable={searchable}
            onChange={selectedCity => this.setState({ selectedCity })}
            options={cityData}
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
