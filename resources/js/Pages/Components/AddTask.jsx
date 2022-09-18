import React from "react";
import AddIcon from "@/Partials/AddIcon";
import UpdateIcon from "@/Partials/UpdateIcon";
import ProcessingIcon from "@/Partials/ProcessingIcon";

export default function AddTask({ onSubmit, task, onChange, processing, editMode, error }) {
    return (
        <form onSubmit={onSubmit}>
            <div style={{ display: "flex" }}>
                <input
                    type="text"
                    className="mr-1 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-400"
                    placeholder="Enter new task"
                    value={task}
                    onChange={(e) => onChange(e)}
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
                            {editMode ? <UpdateIcon /> : <AddIcon />}
                            {editMode ? "Update Task" : "Add Task"}
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
    );
}
