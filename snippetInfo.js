var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UpdateButton = function (_React$Component) {
  _inherits(UpdateButton, _React$Component);

  function UpdateButton() {
    _classCallCheck(this, UpdateButton);

    return _possibleConstructorReturn(this, (UpdateButton.__proto__ || Object.getPrototypeOf(UpdateButton)).apply(this, arguments));
  }

  _createClass(UpdateButton, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'button',
        { className: 'Update' },
        'Update Info'
      );
    }
  }]);

  return UpdateButton;
}(React.Component);

var SnippetInfo = function (_React$Component2) {
  _inherits(SnippetInfo, _React$Component2);

  function SnippetInfo(props) {
    _classCallCheck(this, SnippetInfo);

    var _this2 = _possibleConstructorReturn(this, (SnippetInfo.__proto__ || Object.getPrototypeOf(SnippetInfo)).call(this, props));

    _this2.state = {
      value: 'Snippet Info Here...'
    };

    _this2.handleChange = _this2.handleChange.bind(_this2);
    _this2.handleSubmit = _this2.handleSubmit.bind(_this2);
    return _this2;
  }

  _createClass(SnippetInfo, [{
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({ value: event.target.value });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      alert('Snippet Info was updated');
      event.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      var status = 'Next player: Joe';

      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'status' },
          status
        ),
        React.createElement(
          'div',
          { className: 'form' },
          React.createElement(
            'form',
            { onSubmit: this.handleSubmit },
            React.createElement(
              'label',
              null,
              'Snippet Info:',
              React.createElement('textarea', { value: this.state.value, onChange: this.handleChange })
            ),
            React.createElement('input', { type: 'submit', value: 'Submit' })
          )
        )
      );
    }
  }]);

  return SnippetInfo;
}(React.Component);

ReactDOM.render(React.createElement(SnippetInfo, null), document.getElementById("snippetinfo"));