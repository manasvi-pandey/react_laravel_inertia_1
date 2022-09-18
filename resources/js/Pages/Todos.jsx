import React, { useState } from "react";
import { Head } from "@inertiajs/inertia-react";
import Heading from "@/Components/Heading";
import AddIcon from "@/Partials/AddIcon";
import ProcessingIcon from "@/Partials/ProcessingIcon";
import UpdateIcon from "@/Partials/UpdateIcon";

export default function Todos({ todos }) {
    const [allData, setAllData] = useState(todos);
    const [task, setTask] = useState("");
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(0);
    const [editTodo, setEditTodo] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        if (task === "") {
            setError("Please enter a task title");
        } else {
            setProcessing(1);
            editTodo ? updateExistingTask() : addNewTask();
        }
    }

    function addNewTask() {
        axios
            .post("/add-todo", { task })
            .then((res) => {
                if (res.data.status === "success") {
                    let data = res.data.data;
                    setAllData([data, ...allData]);
                    setTask("");
                }
            })
            .catch((err) => {
                setError(err.response.data.message);
            })
            .finally(() => setProcessing(0));
    }

    function updateExistingTask() {
        axios
            .post("/update-todo", { editTodo, task })
            .then((res) => {
                if (res.data.status === "success") {
                    setAllData((prev) =>
                        prev.map((data) =>
                            data.id === editTodo ? { ...data, task } : data
                        )
                    );
                    setTask("");
                    setEditTodo(null);
                }
            })
            .catch((err) => {
                setError(err.response.data.message);
            })
            .finally(() => setProcessing(0));
    }

    function handleNewTodo(e) {
        setTask(e.target.value);
        setError(null);
    }

    function toggleCompletion(id) {
        setAllData((prev) =>
            prev.map((data) =>
                data.id === id
                    ? { ...data, is_completed: !data.is_completed }
                    : data
            )
        );
        axios.post("mark-as-complete", { id }).catch(() => {
            setAllData((prev) =>
                prev.map((data) =>
                    data.id === id
                        ? { ...data, is_completed: !data.is_completed }
                        : data
                )
            );
        });
    }

    function stageForEdit(id) {
        setEditTodo(id);
        let taskBeingEdited = allData.filter((data) => data.id === id)[0];
        setTask(taskBeingEdited.task);
    }

    function handleDelete(id) {
        axios
            .post("/delete-todo", { id })
            .then((res) => {
                if (res.data.status === "success") {
                    setAllData((prev) => prev.filter((data) => data.id !== id));
                }
            })
    }

    return (
        <>
            <Head title="Todos"></Head>
            <div className="p-10 max-w-3xl my-0 mx-auto">
                <Heading
                    className="text-3xl text-center text-amber-500"
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
                            disabled={processing}
                        >
                            {!processing ? (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    {editTodo ? <UpdateIcon /> : <AddIcon />}
                                    {editTodo ? "Update Task" : "Add Task"}
                                </div>
                            ) : (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <ProcessingIcon /> Adding Task
                                </div>
                            )}
                        </button>
                    </div>
                    <div className="text-red-600 font-bold mb-4">
                        {error ? error : ""}
                    </div>
                </form>
                <div className="overflow-x-auto">
                    <table className="table w-full table-compact">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Task</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {allData.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="text-center">
                                        No tasks found
                                    </td>
                                </tr>
                            )}
                            {allData.map((todo) => (
                                <tr key={todo.id}>
                                    <td>
                                        <div className="form-control">
                                            <label className="cursor-pointer label">
                                                <input
                                                    type="checkbox"
                                                    className="checkbox checkbox-secondary checkbox-xs"
                                                    checked={todo.is_completed}
                                                    onChange={() =>
                                                        toggleCompletion(
                                                            todo.id
                                                        )
                                                    }
                                                    disabled={editTodo}
                                                />
                                            </label>
                                        </div>
                                    </td>
                                    <td>{todo.task}</td>
                                    <td>
                                        <div>
                                            <button
                                                className="btn btn-secondary btn-xs mr-2"
                                                onClick={() =>
                                                    stageForEdit(todo.id)
                                                }
                                                disabled={
                                                    todo.is_completed ||
                                                    editTodo
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-accent btn-xs"
                                                disabled={editTodo}
                                                onClick={() =>
                                                    handleDelete(todo.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
