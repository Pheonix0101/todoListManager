import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Navbar from "./components/Navbar";

function App() {
  const [todo, setTodo] = useState(""); // input text
  const [todos, setTodos] = useState([]);
  const [showCompleted, setshowCompleted] = useState(true);

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
      console.log(item.id)
      return item.id !== id;
    });
    console.log(id);
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
  
  const toggleCompleted =()=>{
    setshowCompleted(!showCompleted)

  }

  return (
    <>
      <Navbar />
      <div className=" mx-3 md:container md:mx-auto bg-violet-200 rounded-md p-4 my-5 min-h-[80vh] md:w-1/2">
        <h1 className="flex justify-center text-red-700 text-2xl font-semibold">TaskManager - Manage your task at one place</h1>
        <div className="addtodo flex flex-col">
          <h2 className="text-lg font-bold ">Add Todo</h2>
          <input
            type="text"
            value={todo}
            name=""
            id=""
            className="w-full rounded-lg px-5 py-1"
            onChange={handleChange}
          />
          <button
            onClick={handleAdd} disabled={todo.length <3}
            className="bg-violet-500 text-white font-semibold text-sm hover:bg-violet-900 p-3 py-1 rounded-md my-4 disabled:bg-red-600"
          >
            Save
          </button>
        </div>
        <input onChange={toggleCompleted} type="checkbox" name="" checked={showCompleted} id=""  className="my-4"/> 
        <label className="mx-2" htmlFor="show">Show Completed task</label>
        
        <hr className="h-[3px] bg-black opacity-15 w-[80%] mx-auto my-2" />
        <h2 className="text-lg font-bold ">Your todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5"> No Todos to display</div>
          )}
          {todos.map((item) => {
            return (showCompleted || !item.isCompleted) &&
              <div
                key={item.id}
                className="todo flex md:w-1/2 justify-between my-3 "
              >
                <div className="flex gap-5">
                  <input
                    type="checkbox"
                    onChange={handleCheckBox}
                    checked={todos.isCompleted}
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
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="bg-violet-500 text-white font-semibold text-sm hover:bg-violet-900 p-3 py-1 rounded-md mx-2"
                  >
                    <MdDeleteForever/>
                  </button>
                </div>
              </div>
            
          })}
        </div>
      </div>
    </>
  );
}

export default App;
