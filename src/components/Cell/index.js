// our cell component is complicated
// we have to define all the ways the cell can look based on different data
import React from "react";
import '../../index.css';


const Cell = props => {

    //is the cell open or not
    let renderCell = () => {
        if (props.data.isOpen) {
            if (props.data.hasMine) {
                //if open do this
            return (
                <div className="cell open" onClick={ () => props.open(props.data)}>
                    m
                </div>
            )
            } else if (props.data.count === 0) {
                //if open do this
            return (
                <div className="cell open" onClick={ () => props.open(props.data)}>

                </div>
            )
            } else {
                //if open do this
            return (
                <div className="cell open" onClick={ () => props.open(props.data)}>
                    {props.data.count}
                </div>
            )
            }
            
        } else {
            //if not open do this 
            return (
                <div className="cell" onClick={ () => props.open(props.data)}>

                </div>
            );
        }
    }
    return renderCell();
};

export default Cell