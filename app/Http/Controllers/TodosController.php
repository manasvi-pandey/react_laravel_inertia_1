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
        Task::create([
            'task' => $request->todo
        ]);

        return Redirect::route('todos');
    }
}
