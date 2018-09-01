import React, { Component } from "react";
import Select from "react-select";
import ReactCopyButtonWrapper from "react-copy-button-wrapper";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import _ from "./GLOBALS";
import Utility from "./Utility";
import logo from "./res/logo.png";
import options from "./res/customHash.json";
import "./css/app.css";
import "./css/ReactToastify.min.css";

library.add(faCopy);

const initialState = {
  selectedHash: null,
  longUrl: "",
  shortUrl: "",
  resultUrl: ""
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
        <ToastContainer />
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
          Copyright © {(new Date().getFullYear())} | Developed by Debasis Kar
        </footer>
      </div>
    );
  }

  handleHashChange = (selectedHash) => {
    this.setState({ selectedHash });
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
    let hostEndpoint = _.ENDPOINT_FOR_SHORTENING;
    if(this.state.selectedHash !== null) {
      hostEndpoint = hostEndpoint + this.state.selectedHash.value;
    }

    fetch(hostEndpoint, {
      method: "POST",
      headers: {
        "Accept": _.JSON,
        "Content-Type": _.JSON,
      },
      body: JSON.stringify({
        path: this.state.longUrl
      })
    }).then(Utility.handleErrors).then((response) => {
      return response.json();
    }).then((json) => {
      Utility.notifySuccess(json.path);
      this.setState({ resultUrl: json.path });
    }).catch(error => Utility.notifyError(error.message));
  }

  clickExpand = () => {
    if(!Utility.isValidURL(this.state.shortUrl)){
      Utility.notifyError("Invalid URL... Check Again");
    } else {

      fetch(_.ENDPOINT_FOR_EXPANDING, {
        method: "POST",
        redirect: "follow",
        headers: {
          "Accept": _.JSON,
          "Content-Type": _.JSON
        },
        body: JSON.stringify({
          path: this.state.shortUrl
        })
      }).then(Utility.handleRedirect)
      .then((response) => {
        return response.json();
      }).then((json) => {
        this.reset();
        Utility.openInNewTab(json.path);
      }).catch(error => Utility.notifyError(error.message));

    }
  }

}

export default App;