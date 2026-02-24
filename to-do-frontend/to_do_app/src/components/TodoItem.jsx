import { Trash2Icon } from "lucide-react";

const TodoItem = ({ todo, deleteTodo, toggleTodo }) => {
  return (
    <li
      className="w-full h-20 bg-slate-200 rounded-2xl mb-4 
                 flex items-center justify-between px-4"
    >
      <span
        onClick={() => toggleTodo(todo._id)}
        className={`cursor-pointer font-bold text-xl ${
          todo.completed ? "line-through text-gray-400" : "text-blue-400"
        }`}
      >
        {todo.task}
      </span>

      <button onClick={() => deleteTodo(todo._id)}>
        <Trash2Icon className="text-red-500 w-6 h-6 hover:text-red-700" />
      </button>
    </li>
  );
};

export default TodoItem;
