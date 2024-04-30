import React,{useState} from "react";
import Footer from "./Footer";
import Header from "./Header";
import Notes from "./Notes";
import CreateArea from "./CreateArea";


function App(){

    const [notes,setNotes]=useState([])
    function addNote(note){
        setNotes((prev)=>{
            return [...prev,note]
        })
    }

    function deleteNote(id){
        setNotes(prev=>{
            return prev.filter((noteItem,idx)=>{
                return idx!==id
            })
        })
    }

    return(
    <div>
        <Header/>
        <CreateArea addNote={addNote}/>
        {notes.map( (note,idx) => <Notes key={idx} id={idx} onDelete={deleteNote} title={note.title} content={note.content}/>)}
        <Footer/>       
    </div>);
}

export default App;