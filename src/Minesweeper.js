import React, { Component } from "react";
import Board from "./components/Board";
import BoardHead from "./components/BoardHead";

class Minesweeper extends Component {
  constructor() {
    super();
    this.intervals = [];
  }
  // passing down the following props to the rest of the components.
  // this will tell how many of each thing there are in the board
  state = {
    status: "waiting", //can also be running or ended to represent different status of the game
    rows: 10,
    columns: 10,
    flags: 10,
    mines: 10,
    time: 0,
    openCells: 0,
  };

  //creating a function to start the timer and keep ticking while the game is running
  tick = () => {
    if (this.state.openCells > 0 && this.state.status === "running") {
      let time = this.state.time + 1;
      this.setState({time})
    }
  }

  setInterval = (fn, t) => {
    this.intervals.push(setInterval(fn, t));
  }

  //creating a function to set the status of the game to running when we hope the first cell
  handleCellClick = () => {
    if (this.state.openCells === 0 && this.state.status !== "running") {
      this.setState({
        status: "running"
      }, () => {
        this.setInterval(this.tick, 1000);
      })
    }

    this.setState(prevState => {
      return { openCells: prevState.openCells +1};
    })
  }


  render() {
    return (
      <div className="minesweeper">
        <h1>Minesweeper</h1>
      <BoardHead 
      time={this.state.time}
      flagCount={this.state.flags}
      />
      <Board 
        //passing the props to the board.js component
        rows={this.state.rows}
        columns={this.state.columns}
        mines={this.state.mines}
        openCells={this.state.openCells}
        openCellClick={this.handleCellClick}
      />
      </div>
    )
    
  };
}

export default Minesweeper;
