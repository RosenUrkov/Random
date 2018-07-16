import React, { Component } from 'react';
import Stars from './Stars';
import Button from './Button';
import Answer from './Answer';
import Numbers from './Numbers';
import DoneFrame from './DoneFrame';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = Game.initialState();
  }

  static randomNumber() {
    return 1 + Math.floor(Math.random() * 9);
  }

  static initialState() {
    return {
      numberOfStars: Game.randomNumber(),
      numbersSelected: Array.from({ length: 9 }).map(_ => false),
      numbersUsed: Array.from({ length: 9 }).map(_ => false),
      isAnswerCorrect: null,
      redraws: 5,
      doneStatus: null
    };
  }

  onNumberInteraction(numbersProperty, numberPropertyValue) {
    return (numberIndex) => {
      this.setState((prevState) => {
        const newNumbersProperty = prevState[numbersProperty].slice();
        newNumbersProperty[numberIndex] = numberPropertyValue;
        return { 
                [numbersProperty]: newNumbersProperty,
                isAnswerCorrect: null
               };
      });
    }
  }

  updateDoneStatus() {
    this.setState(prevState => {
      if(prevState.numbersUsed.filter(x => x === true).length === 9) {
        return { doneStatus: 'You Win!', redraws: 0 };
      }
      if(prevState.redraws === 0 && this.isTherePossibleSolution(prevState) === false) {
        return { doneStatus: 'Game Over!' };
      }
    });
  }

  isTherePossibleSolution({ numbersUsed, numberOfStars }) {
    const possibleNumbers = numbersUsed
                .reduce((numbers, curr, index) => {
                  if(curr === false) {
                    numbers.push(index + 1);
                  }

                  return numbers;
                }, []);
    
    const possibleCombinationSum = (arr, n) => {
      if (arr.indexOf(n) >= 0) { return true; }
      if (arr[0] > n) { return false; }
      if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
      }
      const listSize = arr.length, combinationsCount = (1 << listSize)
      for (let i = 1; i < combinationsCount ; i++ ) {
        let combinationSum = 0;
        for (let j=0 ; j < listSize ; j++) {
          if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
      }
      return false;
    };

    return possibleCombinationSum(possibleNumbers, numberOfStars);
  }

  redraw() {
    if(this.state.redraws === 0) {
      return;
    }

    this.setState((prevState) => ({
      numbersSelected: Array.from({ length: 9 }).map(_ => false),
      numberOfStars: Game.randomNumber(),
      isAnswerCorrect: null,
      redraws: prevState.redraws - 1
    }));

    this.updateDoneStatus();
  }

  checkSelectedNumbersForMatch() {
    const selectedNumbersValue = this.state.numbersSelected
                                      .reduce((sum, curr, i) => curr ? sum + i + 1 : sum, 0);

    if(selectedNumbersValue === this.state.numberOfStars) {
        const numbersUsed = this.state.numbersUsed.slice();
        const numbersSelected = this.state.numbersSelected.slice();

        this.state.numbersSelected.forEach((x, i) => {
          if(x === true) {
            numbersUsed[i] = true;
            numbersSelected[i] = false;
          }
        });

        this.setState({
              numbersSelected, 
              numbersUsed,
              numberOfStars: Game.randomNumber(),
              isAnswerCorrect: true
          });

        this.updateDoneStatus();
    } else {
      this.setState({
          isAnswerCorrect: false
      });
    }
  }

  resetGame() {
    this.setState(Game.initialState());
  }

  render() {
    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
        <div className="row">
          <Stars numberOfStars={this.state.numberOfStars}/>
          <Button 
            isAnswerCorrect={this.state.isAnswerCorrect}
            disabled={!this.state.numbersSelected.filter(x => x === true).length}
            redraw={() => this.redraw()}
            redrawsLeft={this.state.redraws}
            checkSelectedNumbersForMatch={() => this.checkSelectedNumbersForMatch()}
          />
          <Answer 
            numbersSelected={this.state.numbersSelected}
            onNumberUnselected={(i) => this.onNumberInteraction("numbersSelected", false)(i)}
          />
        </div>
        <br />
        { this.state.doneStatus ? 
          <DoneFrame 
            doneStatus={this.state.doneStatus}
            resetGame={() => this.resetGame()}
          /> :
          <Numbers 
            numbersSelected={this.state.numbersSelected} 
            numbersUsed={this.state.numbersUsed}
            onNumberSelected={(i) => this.onNumberInteraction("numbersSelected", true)(i)}
          />
        }
      </div>
    );
  }
}
