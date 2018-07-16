import React, { Component } from 'react';

export default class Stars extends Component {
  render() {
    const stars = Array
      .from({ length: this.props.numberOfStars })
      .map((_, i) => (<i key={i} className="fa fa-star"></i>));

    return (
      <div className="col-5">
        {stars}
      </div>
    );
  }
}
