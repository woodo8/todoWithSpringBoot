import axios from "axios";
import React, { useEffect, useReducer, useState } from "react"
import './App.css';
import ListItem from "./listItem";

function App() {

  const [data, setData] = useState([]);
  const [title, settitle] = useState("")
  const [desc, setdesc] = useState("")

  useEffect(() => {
    getTodos();
  }, [])

  const getTodos = () => {
    axios.get("http://localhost:8080/todos").then(res => {
      console.log(res);
      setData(res.data);
    }).catch((err) => console.log(err))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      description: desc
    }
    if (title && desc) {
      await axios.post("http://localhost:8080/todos/create", payload).then((() => alert("Todo added successfully!"))).catch(() => alert("something went wrong!"));
      settitle("");
      setdesc("")
      getTodos();
    } else {
      alert("Please complete all the fields")
    }
  }

  return (
    <div className="App">
      <div className="todo">
        <div className="d-flex justify-around">

          <form >
            <h1>Form</h1>

            <input value={title} onChange={(e) => settitle(e.target.value)} type="text" placeholder="Title" />
            <br />
            <textarea value={desc} onChange={(e) => setdesc(e.target.value)} type="text" placeholder="Description" ></textarea>
            <br />
            <button onClick={handleSubmit} type="submit">Submit</button>
          </form>
          <div>
            <h1>My todos</h1>
            <ol>
              {data.map(todo => (
                <ListItem key={todo.id} todo={todo} getTodos={getTodos} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
