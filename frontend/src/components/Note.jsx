import React, {useState} from 'react';
import '../styles/User.css'
import axios from "axios";
import MyModal from "./UI/MyModal/MyModal";
import YesNoBox from "./UI/YesNoBox/YesNoBox";

const Note = ({data, notes, setNotes}) => {
    const img = "data:image/png;base64," + data.picture;
    const [editId, setEditId] = useState(null)
    const [modal, setModal] = useState(false)
    const [currentNote, setCurrentNote] = useState({title: data.title, description: data.description})
    const [yesNo, setYesNo] = useState(true)

    function openEditForm(id) {
        setEditId(id)
        setModal(true)
    }

    async function deleteNote(id) {
        console.log("123123")
        // try {
        //     const response = await axios.delete('http://localhost:8000/user/notes?note_id=' + id)
        //     console.log(response.status===200 ? 'Success' : "smth went wrong")
        // } catch (e) {
        //     console.log(e)
        // }
    }

    function removeNote(id) {
        deleteNote(id)
        setNotes(notes.filter(note=> note.id!==id))
    }

    async function editNote(e) {
        const params = {note_id: editId, ...currentNote}
        e.preventDefault()
        try {
            await axios.put('http://localhost:8000/user/notes',
                null,
                {
                    params: params
                })
            setModal(false)
            setNotes(notes.map(note => note.id===editId ? {...note, ...currentNote} : note))
        } catch (e) {
            console.log(e)
        }
    }

    function deleteCheck(id) {
        setYesNo(true)
        // removeNote(id)
    }

    return (
        <div className='note'>
            <YesNoBox visible={yesNo} setVisible={setYesNo}/>
            <MyModal visible={modal} setVisible={setModal}>
                <form className='edit-note-form'>
                    <label>
                        Title:
                        <input type="text"
                        value={currentNote.title}
                        onChange={(e) => setCurrentNote({...currentNote, title: e.target.value})}/>
                    </label>
                    <label>
                        Description:
                        <input type="text"
                        value={currentNote.description}
                        onChange={(e)=> setCurrentNote({...currentNote, description: e.target.value})}/>
                </label>
                    <button onClick={e => editNote(e)}>Edit</button>
                </form>
            </MyModal>
            <h3>
                {data.id}. {data.title}
            </h3>
            <div className='edit-delete'>
                <button onClick={() => openEditForm(data.id)}>Edit</button>
                <button onClick={() => deleteCheck(data.id)}>Delete</button>
            </div>
            <h4>
                {data.description}
            </h4>
            <div className='image__container'>
                <img id='image' src={img}/>
            </div>
            <h4>{data.latex}</h4>
        </div>
    );
};

export default Note;