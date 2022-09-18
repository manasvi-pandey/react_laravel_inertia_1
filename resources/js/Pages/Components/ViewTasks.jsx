import React from "react";

export default function ViewTasks({ allTasks, onChange, stageForEdit, onDelete, editMode }) {
    return (
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
                    {allTasks.length === 0 && (
                        <tr>
                            <td colSpan={3} className="text-center">
                                No tasks found
                            </td>
                        </tr>
                    )}
                    {allTasks.map((todo) => (
                        <tr key={todo.id}>
                            <td>
                                <div className="form-control">
                                    <label className="cursor-pointer label">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-secondary checkbox-xs"
                                            checked={todo.is_completed}
                                            onChange={() =>
                                                onChange(todo.id)
                                            }
                                            disabled={editMode}
                                        />
                                    </label>
                                </div>
                            </td>
                            <td>{todo.task}</td>
                            <td>
                                <div>
                                    <button
                                        className="btn btn-secondary btn-xs mr-2"
                                        onClick={() => stageForEdit(todo.id)}
                                        disabled={todo.is_completed || editMode}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-accent btn-xs"
                                        disabled={editMode}
                                        onClick={() => onDelete(todo.id)}
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
    );
}
