import { Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";

const App = () => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const res = await fetch("http://localhost:5000/todos");
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    if (value.trim() === "") return;

    await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: value }),
    });

    setValue("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    });

    fetchTodos();
  };
  const Toggle = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
    });

    fetchTodos();
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-400">
        <div className="w-full bg-white max-w-md rounded-xl shadow-2xl p-6">
          <div className="w-full bg-blue-400 rounded-2xl flex items-center justify-center mb-6">
            <h1 className="font-bold uppercase text-2xl text-white">
              To-Do-List
            </h1>
          </div>

          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="Add Tasks.."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className=" w-40 h-10 pl-2 bg-blue-100 rounded-2xl outline-none"
            />
            <button
              onClick={addTodo}
              className="w-15 h-10  bg-blue-300 outline-none font-extrabold text-3xl text-white cursor-pointer"
            >
              +
            </button>
          </div>

          <h3 className="w-full flex items-center justify-center capitalize italic text-blue-500 text-2xl font-extrabold">
            Tasks
          </h3>
          <ul>
            {todos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                deleteTodo={deleteTodo}
                toggleTodo={Toggle}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;
