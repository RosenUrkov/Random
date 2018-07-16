import React, { Component } from 'react';

export default class Numbers extends Component {
  render() {
    return (
      <div className="card text-center">
        <div>
          {Array
            .from({ length: this.props.numbersSelected.length })
            .map((_, i) => {
              
              let numberClass;
              if(this.props.numbersUsed[i]) {
                numberClass = "used";
              } else if(this.props.numbersSelected[i]) {
                numberClass = "selected";
              }

              return <span 
                key={i+1} 
                className={numberClass} 
                onClick={() =>this.props.onNumberSelected(i)}
              >{i+1}</span>
          })}
        </div>
      </div>
    );
  }
}
