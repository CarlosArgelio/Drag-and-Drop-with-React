import React, { useState } from "react"
import "./App.css"

const initialTask = [
  {
    id: "1",
    text: "JavaScript"
  },
  {
    id: "2",
    text: "Python"
  },
  {
    id: "2",
    text: "Rush"
  },
  {
    id: "2",
    text: "Older"
  }
]

function App() {

  const [task, setTask] = useState(initialTask);

  return (
    <React.Fragment>
      <h1>Estudiar</h1>
      <ul className="task-container">
        {task.map((task) => (
          <li className="task-item" key={task.id}>{task.text}</li>
        ))} 
      </ul>
    </React.Fragment>
  )
}

export default App
