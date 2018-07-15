import React from 'react';
import { Square } from './square';

export class Board extends React.Component {

    renderSquare(i) {
      return <Square 
                key={ i }
                value = { this.props.squares[i] }
                onClick = { () => this.props.onClick(i) }
              />;
    }

    createBoardSquares(row) {
      const squares = [];

      for(let i = 0; i < 3; i++) {
        squares.push(this.renderSquare(i + row * 3));
      }

      return squares;
    }

    createBoardRows() {
      const rows = [];

      for(let i = 0; i < 3; i++) {
        rows.push(<div key={i} className="board-row">{this.createBoardSquares(i)}</div>);
      }

      return rows;
    }
  
    render() {

      return (
        <div>
          {this.createBoardRows()}
        </div>
      );
    }
  }