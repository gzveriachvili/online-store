import React, { Component } from 'react';
import './style/dropdown.scss';

class Dropdown extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='currency-dropdown-wrapper'>
        <select id='currency-dropdown'>
          {/*
          <option value='' selected disabled hidden>
            {this.state.value}
          </option>
          */}

          {this.props.currencyList}
        </select>
      </div>
    );
  }
}

export default Dropdown;
