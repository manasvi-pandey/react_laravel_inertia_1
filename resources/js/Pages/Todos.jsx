import React, { useState } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Heading from "@/Components/Heading";

export default function Todos({ todos }) {
    const [todo, setTodo] = useState({
        todo: ""
    });

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post('/add-todo', todo);
        setTodo({
            todo: ""
        });
    }

    return (
        <>
            <Head title="Todos"></Head>
            <div className="p-10 max-w-2xl my-0 mx-auto">
                <Heading
                    className="text-3xl text-center"
                    style={{ fontFamily: "sans-serif" }}
                >
                    Task Sheet
                </Heading>
                <p className="text-center mt-1 mb-10 text-2xl font-extrabold text-indigo-700 ">
                    Add your daily tasks here
                </p>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: "flex", marginBottom: "20px" }}>
                        <input
                            type="text"
                            className="mr-1 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-400"
                            placeholder="Enter new task"
                            id="todo"
                            value={todo.todo}
                            onChange={(e) => setTodo({ todo: e.target.value })}
                        />
                        <button
                            type="submit"
                            className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-4 h-4 mr-1"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                            Add Task
                        </button>
                    </div>
                </form>

                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id}>{todo.task}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}
