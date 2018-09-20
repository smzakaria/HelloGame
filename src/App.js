import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'reactstrap';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="container">
          <Game />
        </div>
      </div>
    );
  }
}

const Stars = (props) =>{
  //const numberOfStars = 1 + Math.floor(Math.random()*9);

  let stars = [];
  for(let i =0; i< props.numberOfStars; i++){
     stars.push(<i key={i} className="fa fa-star"></i>) 
  }
  return(
    <div className="col-5">
      {stars}
    </div>
  );
}
const Answer = (props) =>{
  return(
    <div className="col-5">
    {props.selectedNumbers.map((number, i) =>
      <span key={i} onClick={() => props.unselectNumber(number)}>{number}</span>
    )}
    </div>
  );
}
const Buttons = (props) =>{
  let button;
  switch (props.answerIsCorrect) {
    case true:
      button =
      <button className="btn btn-success" onClick={props.acceptAnswer}>
      <i className="fa fa-check"></i>
      </button>;
      break;
  case false:
      button =
      <button className="btn btn-danger">
      <i className="fa fa-times"></i>
      </button>;
      break;
    default:
      button = 
      <Button className="btn" onClick={props.checkAnswer} disabled={props.selectedNumbers.length===0}>
        = 
      </Button>
      break;
  }
  return(
    <div className="col-2">
      {button}
      <br/><br/>
      <button 
        className="btn btn-warning" 
        disabled={props.redraws === 0}
        onClick={props.redraw}>
      <i className="fa fa-refresh"></i>
       +{props.redraws}
      </button>
    </div>
  );
}

const DoneFrame = (props) =>{
  return(
    <div>
      <h1>{props.doneStatus}</h1>
    </div>
  );
};
const Numbers = (props) => {
  let numbers = [];
  const numberClassName = (number) => {
    if(props.selectedNumbers.indexOf(number) >= 0){
      return 'selected';
    }
    if(props.usedNumbers.indexOf(number) >= 0){
      return 'used';
    }
  };

  for(let i =0; i< Numbers.list; i++){
    numbers.push(<span key={i} className={numberClassName(i)}
     onClick={() => props.selectNumber(i)} >{i}</span>) 
  }
  return(
    <div className="card text-center">
      <div>
        {numbers}
      </div>
    </div>
  );
};

Numbers.list = 10;

class Game extends Component{
  
  state = {
    selectedNumbers:[],
    randomNumberOfStars: 1 + Math.floor(Math.random()*9),
    answerIsCorrect:null,
    usedNumbers:[],
    doneStatus:'',
    redraws:5
  };
  selectNumber = (clickedNumber) =>{
    if(this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {return;}
    this.setState(prevState => ({
      selectedNumbers:prevState.selectedNumbers.concat(clickedNumber)
    }));
  };

  unselectNumber = (clickedNumber) => {
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers
        .filter(number => number !== clickedNumber)
    }));
  };

  checkAnswer = () =>{
    this.setState(prevState => ({
      answerIsCorrect: prevState.randomNumberOfStars ===
        prevState.selectedNumbers.reduce((acc,n) => acc+n,0)
    }));
  };
  acceptAnswer = () =>{
    this.setState(prevState => ({
      usedNumbers:prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers:[],
      answerIsCorrect:null,
      randomNumberOfStars:1 + Math.floor(Math.random()*9),
    }));

  };
  redraw = () => {
    if(this.state.redraws === 0) {return} ;
    this.setState(prevState => ({
      selectedNumbers:[],
      randomNumberOfStars:1 + Math.floor(Math.random()*9),
      answerIsCorrect:null,
      redraws:prevState.redraws-1
    }));
  };

  render(){
    const {
      selectedNumbers, 
      randomNumberOfStars,
      answerIsCorrect,
      usedNumbers,
      doneStatus,
      redraws
    } = this.state;
    return(
      <div>
        <h3>Play Nine</h3>
        <div className="row">
          <Stars numberOfStars={randomNumberOfStars} />
          <br/>
          <Buttons 
            selectedNumbers={selectedNumbers} 
            checkAnswer={this.checkAnswer}
            answerIsCorrect={answerIsCorrect} 
            redraw={this.redraw} 
            redraws={redraws}
            acceptAnswer={this.acceptAnswer} />
          <br/>
          <Answer selectedNumbers={selectedNumbers} unselectNumber={this.unselectNumber} />
        </div>
        <br />
        {doneStatus?
          <DoneFrame doneStatus={doneStatus} /> :
          <Numbers selectedNumbers={selectedNumbers} selectNumber={this.selectNumber} usedNumbers={usedNumbers}/>
        }
      </div>
    );
  }  
}
export default App;

