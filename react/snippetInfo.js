

class UpdateButton extends React.Component {
  render() {
    return (
      <button className='Update'>Update Info</button>
    );
  }
}

class SnippetInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Snippet Info Here...',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

   
  handleSubmit(event) {
    alert('Snippet Info was updated');
    event.preventDefault();
  }
  

  render () {
    const status = 'Next player: Joe';
    
    return (
      <div>
        <div className='status'>{status}</div>
        <div className='form'>
          <form onSubmit={this.handleSubmit}>
            <label>
              Snippet Info:
              <textarea value={this.state.value} onChange={this.handleChange}/>
            </label>
            <input type='submit' value='Submit' />
          </form>
        </div>
      </div>
    );
  }
}

 ReactDOM.render(
  <SnippetInfo />,
  document.getElementById("snippetinfo")
);
