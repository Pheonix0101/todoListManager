import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Navbar from "./components/Navbar";

function App() {
  const [todo, setTodo] = useState(""); // input text
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let localTodos = JSON.parse(localStorage.getItem("todos"));
    if (localTodos) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((item) => item.id === id);

    setTodo(t[0].todo);

    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLocalStorage();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLocalStorage();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLocalStorage();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
    // console.log(todo)
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;

    let index = todos.findIndex((item) => {
      return item.id === id;
    });

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLocalStorage();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-violet-200 rounded-md p-4 my-5 min-h-[80vh]">
        <div className="addtodo">
          <h2 className="text-lg font-bold ">Add Todo</h2>
          <input
            type="text"
            value={todo}
            name=""
            id=""
            className="w-1/2"
            onChange={handleChange}
          />
          <button
            onClick={handleAdd}
            className="bg-violet-500 text-white font-semibold text-sm hover:bg-violet-900 p-3 py-1 rounded-md m-6"
          >
            Save
          </button>
        </div>
        <h2 className="text-lg font-bold ">Your todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5"> No Todos to display</div>
          )}
          {todos.map((item) => {
            return (
              <div
                key={item.id}
                className="todo flex w-1/4 justify-between my-3"
              >
                <div className="flex gap-5">
                  <input
                    type="checkbox"
                    onChange={handleCheckBox}
                    value={todos.isCompleted}
                    name={item.id}
                    id=""
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="bg-violet-500 text-white font-semibold text-sm hover:bg-violet-900 p-3 py-1 rounded-md mx-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="bg-violet-500 text-white font-semibold text-sm hover:bg-violet-900 p-3 py-1 rounded-md mx-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
