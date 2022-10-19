// component to create rows in my board that contains each cell
import React from "react";
import Cell from "../Cell/index";
import '../../index.css';

const Row = props => {
    let cells = props.cells.map((data, index) => {
        return (
            <Cell 
                key={index}
                data={data}
                open={props.open}
            />
        )
    })
    return (
        <div className="row">
            {cells}
        </div>
    );
};

export default Row;