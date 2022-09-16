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
}
