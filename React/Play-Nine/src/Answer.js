import React, { Component } from 'react';

export default class Answer extends Component {
  render() {
    return (
      <div className="col-5">
        {this.props.numbersSelected.reduce((selected,current,index) => {
          if(current) {
            selected.push(<span 
              key={index+1} 
              onClick={() => this.props.onNumberUnselected(index)}
            >{index+1}</span>);
          }

          return selected;
      }, [])}
      </div>
    );
  }
}
