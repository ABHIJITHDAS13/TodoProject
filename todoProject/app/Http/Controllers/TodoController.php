<?php

namespace App\Http\Controllers;
use App\Models\Project;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function store(Request $request, Project $project)
    {
        $request->validate([
            'description' => 'required|string',
            'status' => 'in:pending,complete'
        ]);

        $todo = $project->todos()->create([
            'description' => $request->description,
            'status' => $request->status ?? 'pending'
        ]);

        return response()->json($todo, 201);
    }

    public function update(Request $request, Todo $todo)
    {
        $request->validate([
            'description' => 'sometimes|required|string',
            'status' => 'in:pending,complete'
        ]);

        $todo->update($request->only(['description', 'status']));
        return response()->json($todo);
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();
        return response()->json(['message' => 'Todo deleted']);
    }
}