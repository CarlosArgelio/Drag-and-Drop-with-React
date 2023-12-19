import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./App.css";

const initialTasks = {
  list: [
    {
      id: "1",
      text: "Saludar",
    },
    {
      id: "2",
      text: "Despedir",
    },
  ],
  edit: [
    {
      id: "3",
      text: "Editar",
    }
  ]
}

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  const onDragEnd = (result) => {
    console.log(result);
    
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      const newDragList = {
        list: [
          {
            id: "2",
            text: "Despedir",
          },
        ],
        edit: [
          {
            id: "1",
            text: "Saludar",
          },
          {
            id: "3",
            text: "Editar",
          }
        ]
      }
      const sourceList = tasks[source.droppableId];
      const destinationList = tasks[destination.droppableId];
      
      const [removed] = sourceList.splice(source.index, 1);
      
      const applyChange = {
        ...tasks,
        [source.droppableId]: [...sourceList ],
        [destination.droppableId]: [...destinationList, removed]
      };
      console.log('Cambios aplicados ', applyChange);

      setTasks(applyChange);
      return;
    
    }

    setTasks((prevTasks) =>
          reorder(prevTasks, source.index, destination.index)
        );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <h1>Estudiar</h1>

        <Droppable droppableId="list" direction="horizontal">
          {(droppableProvided) => (
            <ul
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
              className="task-container"
            >
              {tasks.list.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(draggableProvided) => (
                    <li
                      {...draggableProvided.draggableProps}
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.dragHandleProps}
                      className="task-item"
                    >
                      {task.text}
                    </li>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </ul>
          )}
        </Droppable>

        <Droppable droppableId="edit" direction="horizontal">
          {(droppableProvided) => (
            
            <ul
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
              className="task-container"
            >
              {tasks.edit.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(draggableProvided) => (
                    <li
                      {...draggableProvided.draggableProps}
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.dragHandleProps}
                      className="task-item"
                    >
                      {task.text}
                    </li>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </ul>
          )}
        </Droppable>

      </div>
    </DragDropContext>
  );
}

export default App;
