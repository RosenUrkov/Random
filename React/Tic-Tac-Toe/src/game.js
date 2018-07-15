import React from 'react';
import { Board } from './board';

export class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      history: [ Array(9).fill(null) ],
      turnNumber: 0
     };
  }

  checkForWinner(squares) {
    const winningScenarios = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningScenarios.length; i++) {
      const [a, b, c] = winningScenarios[i];

      if (squares[a] && 
          squares[a] === squares[b] && 
          squares[a] === squares[c]) {

        return squares[a];
      }
    }

    return null;
  }

  jumpToTurn(turnNumber) {
    this.setState({
       history: this.state.history.slice(0, turnNumber + 1),
       turnNumber
    });
  }

  handleClick(i) {
    const board = this.state.history[this.state.turnNumber].slice();

    if(board[i] !== null || this.checkForWinner(board)) {
      return;
    }

    board[i] = this.state.turnNumber % 2 === 0 ? 'X' : 'O';

    const history = this.state.history.slice();
    history.push(board);

    this.setState({ history, turnNumber: this.state.turnNumber + 1});
  }

  render() {
    const winner = this.checkForWinner(this.state.history[this.state.turnNumber]);

    let status;
    if(winner) {
      status = `Winner: ${winner}`;
    } else if(this.state.turnNumber === 9) {
      status = 'Draw!';
    } else {
      status = `Current player: ${this.state.turnNumber % 2 === 0 ? 'X' : 'O'}`;
    }

    let turns = this.state.history.map((board, turn) => {
      if(turn === 0) {
        return null;
      }

      const buttonText = turn === 1 ? 
        'Go to game start':
        `Go to turn #${turn - 1}`;

        return ( 
          <li key={buttonText}>
            <button onClick={ () => this.jumpToTurn(turn - 1) }>{buttonText}</button>
          </li>
        );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={ this.state.history[this.state.turnNumber] }
            onClick={ (i) => this.handleClick(i) }
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ turns }</ol>
        </div>
      </div>
    );
  }
}