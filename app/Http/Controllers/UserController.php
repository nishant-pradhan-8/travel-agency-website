<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return Inertia::render('admin/users/index', ['users' => $users]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {

        return Inertia::render('profile/show');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {

        try {
            $validated = $request->validated();
   
            // Check if user is trying to change account_status and is not an admin
            if ($request->filled('account_status') && Auth::user()->isAdmin === 0) {
                return redirect()->back()->withErrors([
                    'account_status' => 'You are not allowed to change account status.',
                ]);
            }

            if ($request->hasFile('profile_picture')) {
                unset($validated['profile_picture']);
            }
            $userCurrentProfile = $user->profile_picture;

            $user->update($validated);
            $user->profile_picture = $userCurrentProfile;
            $user->save();

            if ($request->hasFile('profile_picture')) {

                if ($user->profile_picture && Storage::disk('public')->exists($user->profile_picture)) {
                    Storage::disk('public')->delete($user->profile_picture);
                }

                $fileName = $user->id . '-profile_picture.' . $request->file('profile_picture')->getClientOriginalExtension();
                $path = $request->file('profile_picture')->storeAs('profile_picture', $fileName, 'public');
                $user->profile_picture = $path;
                $user->save();
            }

            // Success message
            return redirect()->back()->with('success', $user);
        } catch (Exception $e) {
            return redirect()->back()->withErrors([
                'server' => 'Something went wrong. Please try again.',
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            $user->delete();
            if ($user->profile_picture !== null && Storage::disk('public')->exists($user->profile_picture)) {
                Storage::disk('public')->delete($user->profile_picture);
            }
            return redirect()->back()->with('success', 'Account deleted successfully.');
        } catch (Exception $e) {
            return redirect()->back()->withErrors([
                'server' => 'Something went wrong. Please try again.',
            ]);
        }
    }
}
