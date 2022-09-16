import React, { useState } from "react";
import { Head } from "@inertiajs/inertia-react";
import Heading from "@/Components/Heading";
import AddIcon from "@/Partials/AddIcon";
import ProcessingIcon from "@/Partials/ProcessingIcon";

export default function Todos({ todos }) {
    const [allData, setAllData] = useState(todos);
    const [task, setTask] = useState("");
    const [error, setError] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        if (task === "") {
            setError("Please enter a task title");
        } else {
            axios.post("/add-todo", { task })
                .then(res => {
                    if (res.data.status === "success") {
                        let data = res.data.data;
                        // console.log(data);
                        setAllData([ data, ...todos ]);
                    }
                })
                .catch(err => {
                    setError(err.response.data.message);
                })
        }
    }

    function handleNewTodo(e) {
        setTask(e.target.value)
        setError(null);
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
                    <div style={{ display: "flex" }}>
                        <input
                            type="text"
                            className="mr-1 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-400"
                            placeholder="Enter new task"
                            value={task}
                            onChange={(e) => handleNewTodo(e)}
                        />
                        <button
                            type="submit"
                            className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-75"
                        >
                            <AddIcon />
                            Add Task
                        </button>
                    </div>
                    <div className="text-red-600 font-bold mb-4">
                        {error ? error : ""}
                    </div>
                </form>

                <ul>
                    {allData.map((todo) => (
                        <li key={todo.id}>{todo.task}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}
