"use client";

import { useState } from "react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  deadline?: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [deadlineValue, setDeadlineValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() === "") return;
    
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      completed: false,
      deadline: deadlineValue || undefined,
    };
    
    setTodos([...todos, newTodo]);
    setInputValue("");
    setDeadlineValue("");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            TODO App
          </h1>

          {/* Input Section */}
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800 placeholder-gray-400"
              />
              <button
                onClick={addTodo}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
              >
                Add
              </button>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="deadline" className="text-sm text-gray-600">
                Deadline:
              </label>
              <input
                type="date"
                id="deadline"
                value={deadlineValue}
                onChange={(e) => setDeadlineValue(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800"
              />
            </div>
          </div>

          {/* Todo List */}
          <ul className="space-y-3">
            {todos.length === 0 ? (
              <li className="text-center text-gray-500 py-8">
                No tasks yet. Add one above!
              </li>
            ) : (
              todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                  />
                  <div className="flex-1">
                    <span
                      className={`${
                        todo.completed
                          ? "line-through text-gray-400"
                          : "text-gray-700"
                      }`}
                    >
                      {todo.text}
                    </span>
                    {todo.deadline && (
                      <span className="ml-2 text-sm text-gray-500">
                        (Deadline: {todo.deadline})
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="px-3 py-1 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                  >
                    Delete
                  </button>
                </li>
              ))
            )}
          </ul>

          {/* Footer */}
          {todos.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                {todos.filter((t) => !t.completed).length} task(s) remaining
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
