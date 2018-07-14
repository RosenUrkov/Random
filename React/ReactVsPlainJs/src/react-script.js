// Button example
class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }

  render() {
    if (this.state.clicked) {
      return `You clicked button number ${this.props.buttonId}`;
    }

    return (<button onClick = { () => this.setState({ clicked: true }) }> Click </button>);
  }
}

Array
  .from(document.getElementsByClassName('react-button-container'))
  .forEach(container => {
    const buttonId = parseInt(container.dataset.buttonid);
    ReactDOM.render(
      React.createElement(Button, { buttonId }),
      container
    );
});

// Clock example
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  tick() {
    this.setState((pervState, currProps) => ({date: new Date()}));
  }

  render() {
    return (
      <div>
        <h1>It is {this.state.date.toLocaleTimeString()}</h1>
        <Button buttonId="42" />
      </div>
      );
  }
}

ReactDOM.render(<Clock />, document.getElementById('clock'));