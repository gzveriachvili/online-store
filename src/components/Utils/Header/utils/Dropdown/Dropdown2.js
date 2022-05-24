import React, { Component } from 'react';

import './style/dropdown2.scss';

export class Dropdown2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      haveText: '',
    };
  }

  componentDidMount() {
    const dd = document.querySelector('.dropdown');
    window.addEventListener('click', (e) => {
      if (e.target.getAttribute('id') !== 'dd-text') {
        dd.classList.remove('active-dd');
      }
    });
  }

  render() {
    const { isOpen, haveText } = this.state;

    return (
      <div
        className={isOpen ? 'dropdown active-dd' : 'dropdown'}
        onClick={this.handleClick}
      >
        <div id='dd-text' className='dropdown-text'>
          {!haveText ? '$' : haveText}
        </div>
        {this.itemList(this.props.currencyList)}
      </div>
    );
  }

  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  handleText = (e) => {
    this.setState({
      haveText:
        e.currentTarget.textContent.charAt(0) +
        e.currentTarget.textContent.charAt(1),
    });
  };

  itemList = (props) => {
    const list = props.map((item, index) => (
      <div
        onClick={this.handleText}
        className='dropdown-item'
        key={item.toString()}
      >
        {item}
      </div>
    ));

    return <div className='dropdown-items'> {list} </div>;
  };
}

export default Dropdown2;
