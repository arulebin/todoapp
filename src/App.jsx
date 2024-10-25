import { useState, useEffect } from "react";
import bg from "./assets/bg.jpg";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let todosInLS = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(todosInLS);
  }, []);

  const saveToLS=(newTodos)=>{
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  const handleChange = (e) => {
    let text = e.target.value;
    setTodo(text);
  };
  const handleAdd = () => {
    if (todo.trim() !== "") {
      const newTodos=[...todos, { id: uuidv4(), todo, isCompleted: false }];
      setTodos(newTodos);
      setTodo("");
      saveToLS(newTodos);
    }
  };
  const handleEdit = (id) => {
    const itemToEdit = todos.find((item) => item.id === id);
    setTodo(itemToEdit.todo);
    const newTodos = todos.filter((item) => item.id != id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };
  const handleDelete = (id) => {
    const newTodos = todos.filter((item) => item.id != id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };
  const handleCheckbox = (id) => {
    const newTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  return (
    <>
      <div className="bg-slate-900 min-h-screen">
        <div className="relative w-full flex justify-center items-center">
          <div
            className="absolute inset-0 bg-cover bg-center h-56 blur-sm"
            style={{ backgroundImage: `url(${bg})` }}
          ></div>

          <div className="relative z-10 flex flex-col h-full">
            <h1 className="text-3xl text-white tracking-widest mt-12 mb-8 font-bold">
              TODO
            </h1>
            <div className="flex space-x-4">
              <input
                type="text"
                name="text"
                className="px-4 py-2 rounded-md text-black w-10/12 focus:outline-none"
                placeholder="Add a new task"
                onChange={handleChange}
                value={todo}
              />
              <button
                onClick={handleAdd}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition"
              >
                Save
              </button>
            </div>
            <div className="text-white">
              <h2 className="text-2xl text-white tracking-widest mt-12 mb-8 font-bold">
                Your Tasks
              </h2>
              {todos.length === 0 && <div className="m-2">No Tasks added</div>}
              {todos.map((item) => {
                return (
                  <div key={item.id} className="todos flex items-center">
                    <input
                      type="checkbox"
                      className="mr-4 mt-1"
                      checked={item.isCompleted}
                      onChange={() => handleCheckbox(item.id)}
                    />
                    <div
                      className={
                        item.isCompleted ? "line-through w-96" : "w-96"
                      }
                    >
                      {item.todo}
                    </div>
                    <div className="h-full">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="bg-blue-600 text-white px-3 py-1 m-1 rounded-md hover:bg-blue-500 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-blue-600 text-white px-3 py-1 m-1 rounded-md hover:bg-blue-500 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
