import React, { Component } from 'react';
import { invoke } from '@tauri-apps/api/tauri'

export class EntryForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      lastConversion: '',
      submittedBinaries: [],
      value: ''
      }

    this.convertBinary = this.convertBinary.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderConversion = this.renderConversion.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.state.submittedBinaries.push(this.state.value);
    this.renderConversion(this.state.value);
  }

  renderConversion(value) {
    this.convertBinary(value);
  }
  
  convertBinary(value) {
    invoke('convert_binary', { binaryString: value })
      .then((response) => {
        this.setState({lastConversion: response});
           });
  }

  render() {
    const conversionAttempted = this.state.lastConversion;
    let conversionHeader;
    if(conversionAttempted) {
      conversionHeader = <h2> Decimal Conversion: </h2>;
    }

    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <h2>
              Enter Binary:
            </h2>
            <input className="App-input" size="12" autoFocus type="text" name="binary" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input className="App-submit" type="submit" value="Submit" />
          { conversionHeader }
          <h2>{this.state.lastConversion}</h2>
        </form>
      </div>
    );
  };
}
