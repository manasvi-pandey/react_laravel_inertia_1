import React, { useState } from "react";
import { Head } from "@inertiajs/inertia-react";
import Heading from "@/Components/Heading";

import AddTask from "./Components/AddTask";
import ViewTasks from "./Components/ViewTasks";

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

                <AddTask onSubmit={handleSubmit} task={task} onChange={handleNewTodo} processing={processing} editMode={editTodo} error={error} />
                
                <ViewTasks allTasks={allData} onChange={toggleCompletion} stageForEdit={stageForEdit} onDelete={handleDelete} editMode={editTodo} />
            </div>
        </>
    );
}
