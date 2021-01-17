// import logo from './logo.svg';
// import './App.css';
import './css/style.css'

import { Component } from 'react';
import Button from './components/Button';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      current: '0',
      previous: [],
      nextReset: false
    }
  }

  reset = () =>{
    this.setState({current: '0', previous: [], nextReset: false});
  }

  addToCurrent = (symbol) =>{
    if(["+", "-", "*", "/"].indexOf(symbol) > -1){
      let {previous} = this.state;
      previous.push(this.state.current + symbol);
      this.setState({previous, nextReset: true});
    }else{
      if((this.state.current === "0" && symbol !== ".") || this.state.nextReset){
        this.setState({current: symbol, nextReset: false})
      }else{
        this.setState({current: this.state.current + symbol});
      }
    }
  }


  calculate = (symbol) => {
    let {current, previous} = this.state;
    if (previous.length > 0){
      current = eval(String(previous[previous.length-1] + current));
      this.setState({current, previous: [], nextReset: true})
    }
  }

  render(){
    const buttons = [
      {symbol: 'C', cols: 3, action: this.reset},
      {symbol: '/', cols: 1, action: this.addToCurrent},
      {symbol: '7', cols: 1, action: this.addToCurrent},
      {symbol: '8', cols: 1, action: this.addToCurrent},
      {symbol: '9', cols: 1, action: this.addToCurrent},
      {symbol: '*', cols: 1, action: this.addToCurrent},
      {symbol: '4', cols: 1, action: this.addToCurrent},
      {symbol: '5', cols: 1, action: this.addToCurrent},
      {symbol: '6', cols: 1, action: this.addToCurrent},
      {symbol: '-', cols: 1, action: this.addToCurrent},
      {symbol: '1', cols: 1, action: this.addToCurrent},
      {symbol: '2', cols: 1, action: this.addToCurrent},
      {symbol: '3', cols: 1, action: this.addToCurrent},
      {symbol: '+', cols: 1, action: this.addToCurrent},
      {symbol: '0', cols: 2, action: this.addToCurrent},
      {symbol: '.', cols: 1, action: this.addToCurrent},
      {symbol: '=', cols: 1, action: this.calculate},
    ];

    return (
      <div className="App">
        {this.state.previous.length > 0 ?
            <div className="floaty-last">
              {this.state.previous[this.state.previous.length-1]}
            </div>
        : null}
        <input className="result" type="rext" value={this.state.current}/>
        {buttons.map((btn, i) => {
          return <Button key={i} symbol={btn.symbol} cols={btn.cols} action={(symbol) => btn.action(symbol)} />
        })}
      </div>
    );
  }
}

export default App;
