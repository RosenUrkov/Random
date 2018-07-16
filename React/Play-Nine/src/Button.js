import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    let button;
    
    if(this.props.isAnswerCorrect === null) {
        button = <button 
            type="button"
            className="btn" 
            disabled={this.props.disabled}
            onClick={() => this.props.checkSelectedNumbersForMatch()}
        >=</button>
    } else if(this.props.isAnswerCorrect === true) {
        button = <button 
              type="button"
              className="btn btn-success" 
              disabled={this.props.disabled}
              onClick={() => this.props.checkSelectedNumbersForMatch()}
        >
          <i className="fa fa-check"></i>
        </button>
    } else if(this.props.isAnswerCorrect === false) {
        button = <button 
            type="button"
            className="btn btn-danger" 
            disabled={this.props.disabled}
            onClick={() => this.props.checkSelectedNumbersForMatch()}
        >
          <i className="fa fa-times"></i>
        </button>
    }

    return (
      <div className="col-2 text-center">
        {button}

        <br />
        <br />

        <button disabled={this.props.redrawsLeft === 0} className="btn btn-warning btn-sm" onClick={() => this.props.redraw()}>
          <i className="fa fa-refresh"></i> {this.props.redrawsLeft}
        </button>
      </div>
    );
  }
}
