import React, { Component } from "react";
import Select from "react-select";
import ReactCopyButtonWrapper from "react-copy-button-wrapper";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import logo from "./res/logo.png";
import options from "./res/customHash.json";
import "./css/app.css";
import "./css/ReactToastify.min.css";

library.add(faCopy);

const initialState = {
  selectedHash: null,
  longUrl: '',
  shortUrl: '',
  resultUrl: ''
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  reset() {
    this.setState(initialState);
  }

  render() {
    const { selectedHash } = this.state;

    return (
      <div className="app">
      
        <header className="appHeader">
          <img src={logo} className="appLogo" alt="logo" />
          <h1 className="appTitle">URL Shortener Service</h1>
        </header>

        <div className="outerDiv">
          <div className="leftDiv">
            <h2>Shorten Me</h2>

            <div className="displayed">
              <input type="text" id="longUrlText" placeholder="Enter URL" value={this.state.longUrl} onChange={ this.handleLongUrlChange.bind(this) }/>
            </div>

            <div className="displayed">
              <Select value={selectedHash} onChange={this.handleHashChange} options={options} placeholder="Select Custom Identifier (Optional)"/>
            </div>
            
            <div className="displayed">
              <input type="submit" onClick={this.clickShorten} value="SHORTEN"></input>
              <ToastContainer />
            </div>

            <div className="displayed">
              <input type="texts" id="shortUrlBox" value={ this.state.resultUrl } onChange={ this.handleResultChange.bind(this) } />
              <ReactCopyButtonWrapper selector='#shortUrlBox'>
                <button className="copyUrl"><FontAwesomeIcon icon="copy"/></button>
              </ReactCopyButtonWrapper>
            </div>
          </div>

          <div className="rightDiv">
            <h2>Expand Me</h2>

            <div className="displayed">
              <input type="text" id="shortUrlText" placeholder="Enter Short URL" value={this.state.shortUrl} onChange={ this.handleShortUrlChange.bind(this) }/>
            </div>

            <div className="displayed">
              <input type="submit" onClick={this.clickExpand.bind(this, this.state)} value="EXPAND"></input>
            </div>
          </div>		

          <div className="clear"></div>
        </div>

        <footer>
          Copyright © 2018 | Developed by Debasis Kar
        </footer>
      </div>
    );
  }

  handleHashChange = (selectedHash) => {
    this.setState({ selectedHash });
    console.log(`Option selected:`, selectedHash);
  }

  handleLongUrlChange = (event) => {
    this.setState({ longUrl: event.target.value });
  }

  handleResultChange = (event) => {
    this.setState({ resultUrl: event.target.value });
  }

  handleShortUrlChange = (event) => {
    this.setState({ shortUrl: event.target.value });
  }

  clickShorten = () => {
    // console.log(`Shorten Clicked:`, this.state.longUrl);
    // console.log(`Hash Clicked (if any):`, this.state.selectedHash);
    let hostEndpoint = "http://localhost:8080/urls/shorten/";
    if(this.state.selectedHash !== null) {
      hostEndpoint = hostEndpoint + this.state.selectedHash.value;
    }

    fetch(hostEndpoint, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: this.state.longUrl
      })
    }).then((response) => {
      return response.json();
    }).then((json) => {
      this.notifySuccess(json.path);
      // this.reset();
      this.setState({ resultUrl: json.path });
    });
  }

  handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
  }

  clickExpand = () => {
    if(!this.isValidURL(this.state.shortUrl)){
      this.notifyError("Invalid URL... Check Again");
    } else {
      fetch("http://localhost:8080/urls/expand/", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path: this.state.shortUrl
        })
      }).then(this.handleErrors).then((response) => {
        return response.json();
      }).then((json) => {
        console.log(`Long Url:`, json.path);
      }).catch(error => console.log(error));
    }
  }

  notifyError = (message) => {
    toast.error(message);
  }

  notifySuccess = (message) => {
    toast.success(message);
  }

  isValidURL = (str) => {
    let regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str))
        {
          return true;
        }
        else
        {
          return false;
        }
  }

}

export default App;
