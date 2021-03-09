import React, { Component } from 'react';
import './App.css';
import { getUrls, addUrl, deleteUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      error: ''
    }
  }

  componentDidMount() {
    getUrls()
      .then(urls => this.setState({ 
        urls: urls.urls,
        error: ''
      }))
      .catch(error => this.setState({ error: "Cannot retrieve your shortened urls, please try again later." }))
  }

  submitNewUrl = (submission) => {
    addUrl(submission)
      .then(response => this.setState({ 
        urls: [...this.state.urls, response ],
        error: '' 
      }))
      .catch(error => this.setState({ error: "Url shortening unsuccessful, please try again." }))
  }

  removeUrl = (event) => {
    const idNum = event.target.id
    const remainingUrls = this.state.urls.filter(url => url.id !== idNum)
    deleteUrl(idNum)
    this.setState({ urls: remainingUrls })
  }
  
  render() {
    return (
        <main className="App">
          <header>
            <h1>URL Shortener</h1>
            <UrlForm submitNewUrl={this.submitNewUrl}/>
          </header>

          <UrlContainer
            urls={this.state.urls}
            error={this.state.error}
            removeUrl={this.removeUrl}
          />
        </main>
    );
  }
}

export default App;
