<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class TodosController extends Controller
{
    public function index()
    {
        $todos = Task::orderByDesc('id')->get();

        return Inertia::render('Todos', [
            'todos' => $todos
        ]);
    }

    public function add(Request $request)
    {
        $validate = $request->validate([
            'task' => ['unique:tasks'],
        ]);

        $new_task = Task::create([
            'task' => $request->task
        ]); 

        return response()->json(['status' => 'success', 'message' => 'Task added successfully', 'data' => $new_task]);
    }

    public function markAsComplete(Request $request)
    {
        $task = Task::find($request->id);

        $update = $task->update([
            'is_completed' => !$task->is_completed,
        ]);

        return $update ? response()->json(['status' => 'success', 'data' => 'Task marked as completed'], 200) : response()->json(['status' => 'error', 'data' => 'Unable to makr task as complete'], 400);
    }

    public function updateTodo(Request $request)
    {
        $task = Task::find($request->editTodo)->update([
           'task' => $request->task, 
        ]);

        return $task ? response()->json(['status' => 'success', 'data' => 'Task updated'], 200) : response()->json(['status' => 'error', 'data' => 'Unable to update task'], 400);
    }

    public function deleteTodo(Request $request)
    {
        $delete = Task::find($request->id)->delete();

        return $delete ? response()->json(['status' => 'success', 'data' => 'Task delete'], 200) : response()->json(['status' => 'error', 'data' => 'Unable to delete task'], 400);
    }
}
