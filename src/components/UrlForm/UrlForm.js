import React, { Component } from 'react';

class UrlForm extends Component {
  constructor({props}) {
    super(props);
    this.state = {
      title: '',
      urlToShorten: '',
      formError: ''
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value, formError: '' });
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.title && this.state.urlToShorten) {
      const newUrl = {
        long_url: this.state.urlToShorten,
        title: this.state.title
      }
      this.props.submitNewUrl(newUrl)
      this.clearInputs();
    } else {
      this.setState({ formError: 'Please include a title and url to your submission'})
    }
  }

  clearInputs = () => {
    this.setState({title: '', urlToShorten: ''});
  }

  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='Title...'
          name='title'
          value={this.state.title}
          onChange={e => this.handleNameChange(e)}
        />

        <input
          type='text'
          placeholder='URL to Shorten...'
          name='urlToShorten'
          value={this.state.urlToShorten}
          onChange={e => this.handleNameChange(e)}
        />

        <button onClick={e => this.handleSubmit(e)}>
          Shorten Please!
        </button>
        {this.state.formError && <p>{this.state.formError}</p>}
      </form>
    )
  }
}

export default UrlForm;
