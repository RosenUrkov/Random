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