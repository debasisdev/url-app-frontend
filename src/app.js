import React, { Component } from "react";
import Select from "react-select";
import ReactCopyButtonWrapper from "react-copy-button-wrapper";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import logo from "./res/logo.png";
import options from "./res/customHash.json";
import "./css/app.css";

library.add(faCopy);

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedHash: null,
      longUrl: '',
      shortUrl: '',
      resultUrl: ''
    }
  }

  render() {
    const { selectedHash } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">URL Shortener Service</h1>
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
              <input type="texts" id="shortUrlBox" value={ this.state.resultUrl } readOnly="true"/>
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
          Copyright © 2018 Debasis Kar | All Rights Reserved | Developed by Debasis Kar
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
      console.log(`Short Url:`, json.path);
      // this.setState({ resultUrl: json.path });
    });
  }

  clickExpand = () => {
    console.log(`Expand Clicked:`, this.state.shortUrl);
    fetch("http://localhost:8080/urls/expand/", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: this.state.shortUrl
      })
    }).then((response) => {
      return response.json();
    }).then((json) => {
      console.log(`Long Url:`, json.path);
    });
  }
}

export default App;
