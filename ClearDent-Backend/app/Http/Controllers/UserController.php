<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $request->user()->isOwner() || abort(403);
        return response()->json(User::latest()->get(['id', 'name', 'email', 'phone', 'role', 'created_at']));
    }

    public function updateRole(Request $request, User $user)
    {
        $request->user()->isOwner() || abort(403);

        $request->validate([
            'role' => 'required|in:patient,staff,owner',
        ]);

        if ($user->id === $request->user()->id) {
            abort(403, 'Non puoi modificare il tuo stesso ruolo.');
        }

        $user->update(['role' => $request->role]);
        return response()->json($user->fresh(['id', 'name', 'email', 'role']));
    }
}
