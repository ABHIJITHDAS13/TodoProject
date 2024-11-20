<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // Check if user exists with the provided username
        $user = User::where('username', $request->username)->first();

        if (!$user || ($request->password != $user->password)) {
            return response()->json(['message' => 'Invalid username or password'], 401);
        }

        // Generate a token for the user (optional, if you use API tokens)
        // $token = $user->createToken('YourAppName')->plainTextToken;

        // Return success response
        return response()->json(['message' => 'Login successful']);
    }
}
