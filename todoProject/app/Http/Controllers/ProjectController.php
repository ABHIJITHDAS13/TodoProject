<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;

class ProjectController extends Controller
{
    public function index()
    {
        return Project::with('todos')->get();
    }

    public function store(Request $request)
    {
        $request->validate(['title' => 'required|string']);
        $project = Project::create(['title' => $request->title]);
        return response()->json($project, 201);
    }

    public function update(Request $request, Project $project)
    {
        $request->validate(['title' => 'required|string']);
        $project->update(['title' => $request->title]);
        return response()->json($project);
    }

    public function show(Project $project)
    {
        return $project->load('todos');
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(['message' => 'Project deleted']);
    }
}
