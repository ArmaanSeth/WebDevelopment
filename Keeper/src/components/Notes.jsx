import React from "react";

function Notes(props){

    function handleClick(event){
        props.onDelete(props.id)
        event.preventDefault()
    }

    return(
        <div class="note">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button onClick={handleClick}>DELETE</button>
        </div>
    );
}

export default Notes;