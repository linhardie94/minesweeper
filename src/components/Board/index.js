// this is my gameboard where I will display all of the cells
import React, { Component } from 'react'
import Row from '../Row';
import '../../index.css';


class Board extends Component {
    //need to pass in the props that the board will use
    constructor(props) {
        super(props);

        this.state= {
            rows: this.createBoard(props)
        }
    }


    //this will create a board that will take down all the props we will create for flags, bombs etc
    createBoard = props => {
        // creating an empty array for our board
        let board = [];
        
        //creating rows and columns
        for (let i = 0; i < props.rows; i++) {
            // for every row, we create a new array for it's column
            board.push([]);

            //looping through columns withing each row
            for(let j = 0; j < props.columns; j++) {
                //now you push an object into each cell, either a flag, mine, number, etc
                board[i].push({
                    //listing what the cell needs to know about itself. ie. what row and column is it in?
                    // how many mines does it have around it. is it open or closed. has it got a mine and
                    // does it have a flag?
                    x: j,
                    y: i,
                    count: 0,
                    isOpen: false,
                    hasMine: false,
                    hasFlag: false,
                });
            }
        }

        // after we create the board, we add our mines 
        for (let i = 0; i < props.mines; i++) {
            //how to choose a random row and random column
            let randomRow = Math.floor(Math.random() * props.rows)
            let randomCol = Math.floor(Math.random() * props.columns);

            let cell = board[randomRow][randomCol];

            // to make sure you don't assign more than one mine to the same cell
            // and to mark the hasMine props for that cell as truw now
            if (cell.hasMine) {
                i--;
            } else {
                cell.hasMine = true;
            }
        }
        return board;
    };

    // creating a function that let's us open a cell
    // if we click on cell and it has a mine, you lose.
    // if we click on cell and it has no mine, you open it. two things can happen then

    // if a square adjacent to it has a mine, the show number of Minesweeper
    //if no adjacent cells have a mine then we unhide it, and open all cells next to it and check for information

    //if we click on mine, on first turn, it should reset the board and try again
    open = cell => {

        let asyncCountMines = new Promise(resolve => {
            let mines = this.findMines(cell);
            resolve(mines);
        })

        asyncCountMines.then(numberOfMines => {

            let rows = this.state.rows;

            // finding the cell you're on
            let current = rows[cell.y][cell.x];

            //checking if cell has mine on first try
            if(current.hasMine && this.props.openCells === 0){
                alert("You lose. Cell already has mine. Restart!");
                let newRows = this.createBoard(this.props);
                this.setState({
                    rows: newRows
                }, 
                () => {
                    this.open(cell);
                }
                ); // if cell doesn't have a mine, then you have to check for all the other stuff
            } else {
                //states of cell can be flag on it, open, or it has a mine
                //if cel doesn't have a flag and is not open, we want to open it.
                if(!cell.hasFlag && !current.isOpen) {
                    // starting timer on first cell open
                    this.props.openCellClick();
                    // opening the cell on click
                    current.isOpen = true;
                    current.count = numberOfMines;

                    this.setState({rows});

                    if (!current.hasMine && numberOfMines === 0) {
                        this.findAroundCell(cell);
                    }
                }
            }

            if(current.hasMine){
                alert("You lose. Cell already has mine. Restart!");
            } else {
                
            } 

            if(this.props.openCells === 90){
                alert("Winner! Reset the game to play again");
            } else {
                
            }
        })

        
    };

    //this is complicated part
    //how to find mines and count how many there are around the button you click on
    findMines = cell => {
        let minesInProximity = 0;
         for(let row = -1; row <= 1; row++) {
            for(let col = -1; col <= 1; col++) {
                if (cell.y + row >= 0 && cell.x + col >= 0) {
                    if (
                        cell.y + row < this.state.rows.length &&
                        cell.x + col < this.state.rows[0].length
                    ) {
                        if (
                            this.state.rows[cell.y +row][cell.x +col].hasMine &&
                            !(row === 0 && col === 0)
                        ) {
                            minesInProximity++;
                        }
                    }
                }
            }
        }

        return minesInProximity;
    }

    // find other blank cells around the blank cell you just clicked and open it. 
    // then loop again if there are more mines
    findAroundCell = cell => {
        let rows = this.state.rows;

        //going through each cell and open one by one until we find one with mine and then stop
        for (let row = -1; row <= 1; row++) {
            for (let col = -1; col <= 1; col++) {
                if (cell.y + row >= 0 && cell.x + col >= 0) {
                    if (
                        cell.y + row < rows.length &&
                        cell.x + col < rows[0].length
                    ) {
                        if (
                            !rows[cell.y + row][cell.x + col].hasMine &&
                            !rows[cell.y + row][cell.x + col].isOpen
                        ) {
                            this.open(rows[cell.y +row][cell.x +col]);
                        }
                    }
                }
            }
        }
    }

    render() { 
        //creating a list of rows
        let rows = this.state.rows.map((row, index) => {
            return(
                <Row
                    cells={row}
                    key={index}
                    open={this.open }
                />
            )
        }) 

        return (
            <div className='board'>
                {rows}
            </div>
        )
    }
}

export default Board;