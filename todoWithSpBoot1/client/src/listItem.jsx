import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function ListItem({ todo, getTodos }) {
    const [editing, setEditing] = useState(false)
    const [title, settitle] = useState("");
    const [desc, setdesc] = useState("");

    const handleDelete = () => {
        let confirmation = window.confirm("Do you want to delete this todo?")

        if (confirmation) {
            axios.delete(`http://localhost:8080/todos/delete/${todo.id}`).then(() => {
                getTodos();
            }).catch(() => alert("Something went wrong!"))
        }
    }
    const handleChange = async () => {
        await axios.put(
            `http://localhost:8080/todos/edit/${todo.id}`,
            {
                title, description: desc
            }).then(
                () => {
                    getTodos();
                }).catch(
                    () => alert("Something went wrong!"))
        setEditing(false)
    }

    const getCompleted = async (id) => {
        console.log(todo.id)
        await axios.get(`http://localhost:8080/todos/completed/${id}`).then(
            () => {
                getTodos();
            }).catch(
                () => alert("Something went wrong!"))
        setEditing(false)
    }

    useEffect(() => {
        settitle(todo.title)
        setdesc(todo.description)
    }, [])


    return (
        <li className={todo.completed ? "completed_li" : ""}>
            {
                !editing ?
                    <>
                        <h4>{todo.title}</h4>
                        <p>{todo.description}</p>
                    </> :
                    <>
                        <input value={title} onChange={(e) => settitle(e.target.value)} type="text" /><br />
                        <input value={desc} onChange={(e) => setdesc(e.target.value)} type="text" /><br />
                    </>
            }
            {!editing && <button onClick={handleDelete} style={{ backgroundColor: "red", padding: "8px", color: "white", border: "none", margin: "20px 0 0 0", cursor: "pointer" }}>delete</button>}

            {!editing
                ?
                <button onClick={
                    () => { setEditing(true) }
                }
                    style={
                        {
                            backgroundColor: "green",
                            padding: "8px",
                            color: "white",
                            border: "none",
                            margin: "20px 0 0 0",
                            cursor: "pointer"
                        }}>
                    Edit
                </button>
                :
                <button onClick={handleChange} style={{
                    backgroundColor: "green",
                    padding: "8px",
                    color: "white",
                    border: "none",
                    margin: "20px 0 0 0",
                    cursor: "pointer"
                }}>
                    Done
                </button>
            }
            {/* <input onChange={(e)=>getCompleted(todo.id)} style={{ visibility: "hidden" }} type="checkbox" id='completed' /><br /> */}
            <button onClick={(e)=>getCompleted(todo.id)} htmlFor='completed' className='absoluteDiv'>
                {/* <label htmlFor="completed">Complete</label> */}
            </button>
        </li>
    )
}
