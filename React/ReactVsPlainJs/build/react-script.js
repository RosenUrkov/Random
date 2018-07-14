var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Button example
var Button = function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button(props) {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

    _this.state = { clicked: false };
    return _this;
  }

  _createClass(Button, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.state.clicked) {
        return 'You clicked button number ' + this.props.buttonId;
      }

      return React.createElement(
        'button',
        { onClick: function onClick() {
            return _this2.setState({ clicked: true });
          } },
        ' Click '
      );
    }
  }]);

  return Button;
}(React.Component);

Array.from(document.getElementsByClassName('react-button-container')).forEach(function (container) {
  var buttonId = parseInt(container.dataset.buttonid);
  ReactDOM.render(React.createElement(Button, { buttonId: buttonId }), container);
});

// Clock example

var Clock = function (_React$Component2) {
  _inherits(Clock, _React$Component2);

  function Clock(props) {
    _classCallCheck(this, Clock);

    var _this3 = _possibleConstructorReturn(this, (Clock.__proto__ || Object.getPrototypeOf(Clock)).call(this, props));

    _this3.state = { date: new Date() };
    return _this3;
  }

  _createClass(Clock, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this4 = this;

      this.timerId = setInterval(function () {
        return _this4.tick();
      }, 1000);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.timerId);
    }
  }, {
    key: 'tick',
    value: function tick() {
      this.setState(function (pervState, currProps) {
        return { date: new Date() };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          'It is ',
          this.state.date.toLocaleTimeString()
        ),
        React.createElement(Button, { buttonId: '42' })
      );
    }
  }]);

  return Clock;
}(React.Component);

ReactDOM.render(React.createElement(Clock, null), document.getElementById('clock'));