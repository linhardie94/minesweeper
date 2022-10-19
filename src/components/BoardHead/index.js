// this is where the timer and flag count sits
import React from "react";
import '../../index.css';

const BoardHead = props => {
    // how to set up the time
    let minutes = Math.floor(props.time / 60);
    let seconds = props.time - minutes * 60 || 0;

    let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    let time = `${minutes}:${formattedSeconds}`;

    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <div className="board-head">
            <div className="flag-count">
            <a href="https://www.youtube.com/watch?v=dvvrOeITzG8"><button className="reset help">Help</button></a>
            </div>
            <button className="reset" onClick={refreshPage}>Reset</button>
            <div className="timer">
                {time}
            </div>
        </div>
    );
};

export default BoardHead;